# DJ The PC Dude — Live Wi-Fi/LAN Device Count

This feature displays only a live integer count on `pages/wifi.html`.

## Privacy design

The Fedora collector discovers active devices locally, removes the local PC and default gateway, then sends only:

```json
{"count": 3}
```

No device names, IP addresses, MAC addresses, hostnames, vendor names, or scan results are transmitted to the public endpoint.

> Note: this generic version counts active LAN devices visible from the collector. A normal Fedora client cannot reliably distinguish Wi-Fi associations from wired clients without router-specific access. An exact Wi-Fi-only count can be added later for the specific router model.

## 1. Install the local scanner on Fedora

```bash
sudo dnf install arp-scan python3
```

## 2. Deploy the free Cloudflare Worker

```bash
cd tools/wifi-live-count
npx wrangler login
npx wrangler kv namespace create WIFI_STATE
```

Copy the returned namespace ID into `wrangler.toml` in place of `REPLACE_WITH_KV_NAMESPACE_ID`.

Create a long random push token and store it as a Worker secret:

```bash
openssl rand -hex 32
npx wrangler secret put PUSH_TOKEN
```

Paste the generated token when Wrangler asks for the secret value.

Deploy:

```bash
npx wrangler deploy
```

Wrangler will print an HTTPS URL such as:

```text
https://djtpcd-wifi-count.<account>.workers.dev
```

Put that URL into `/assets/wifi-count-config.js`:

```js
window.WIFI_COUNT_API = "https://djtpcd-wifi-count.<account>.workers.dev";
```

## 3. Run the Fedora collector

Use the same token you stored as the Worker `PUSH_TOKEN` secret:

```bash
cd tools/wifi-live-count
sudo env \
  WIFI_COUNT_API="https://djtpcd-wifi-count.<account>.workers.dev" \
  WIFI_PUSH_TOKEN="YOUR_SECRET_TOKEN" \
  python3 collector.py
```

The collector refreshes every 10 seconds by default. Change it with `WIFI_COUNT_INTERVAL`, minimum 5 seconds.

## What visitors see

The Wi-Fi page displays only:

```text
LIVE COUNT
3
3 active devices
```

No identifying device information is exposed.
