#!/usr/bin/env python3
import json
import os
import re
import subprocess
import sys
import time
import urllib.request

API_URL = os.environ.get("WIFI_COUNT_API", "").rstrip("/")
PUSH_TOKEN = os.environ.get("WIFI_PUSH_TOKEN", "")
INTERVAL = int(os.environ.get("WIFI_COUNT_INTERVAL", "10"))


def sh(*args):
    return subprocess.check_output(args, text=True, stderr=subprocess.DEVNULL).strip()


def default_interface():
    route = sh("ip", "route", "show", "default")
    m = re.search(r"\bdev\s+(\S+)", route)
    if not m:
        raise RuntimeError("Could not determine default network interface")
    return m.group(1)


def default_gateway():
    route = sh("ip", "route", "show", "default")
    m = re.search(r"\bvia\s+(\S+)", route)
    return m.group(1) if m else None


def local_ip(interface):
    output = sh("ip", "-4", "addr", "show", "dev", interface)
    m = re.search(r"\binet\s+(\d+\.\d+\.\d+\.\d+)/", output)
    return m.group(1) if m else None


def scan_active_ips(interface):
    """Return active IPv4 addresses found by arp-scan. Raw addresses never leave this process."""
    try:
        output = sh("arp-scan", "--localnet", "--interface", interface, "--numeric", "--plain")
    except (subprocess.CalledProcessError, FileNotFoundError):
        raise RuntimeError("arp-scan is required. On Fedora: sudo dnf install arp-scan")

    ips = set()
    for line in output.splitlines():
        m = re.match(r"^(\d+\.\d+\.\d+\.\d+)\s+([0-9a-fA-F:]{17})\b", line)
        if m:
            ips.add(m.group(1))
    return ips


def get_count():
    interface = default_interface()
    gateway = default_gateway()
    mine = local_ip(interface)
    ips = scan_active_ips(interface)
    if gateway:
        ips.discard(gateway)
    if mine:
        ips.discard(mine)
    return len(ips), interface


def push_count(count):
    payload = json.dumps({"count": count}).encode("utf-8")
    req = urllib.request.Request(
        API_URL + "/count",
        data=payload,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer " + PUSH_TOKEN,
            "User-Agent": "djtpcd-wifi-count/1.0",
        },
    )
    with urllib.request.urlopen(req, timeout=10) as response:
        response.read()


def main():
    if not API_URL or "REPLACE-ME" in API_URL:
        sys.exit("Set WIFI_COUNT_API to your deployed Worker URL")
    if not PUSH_TOKEN:
        sys.exit("Set WIFI_PUSH_TOKEN to the same secret configured in Cloudflare")

    print("DJ The PC Dude Wi-Fi/LAN live counter started.")
    print("Privacy mode: only the integer device count is transmitted.")

    while True:
        try:
            count, interface = get_count()
            push_count(count)
            print(f"[{time.strftime('%H:%M:%S')}] {count} active device(s) via {interface}")
        except Exception as exc:
            print(f"[{time.strftime('%H:%M:%S')}] error: {exc}", file=sys.stderr)
        time.sleep(max(INTERVAL, 5))


if __name__ == "__main__":
    main()
