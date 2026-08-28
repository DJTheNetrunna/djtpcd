export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": "https://djthepcdude.com",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Cache-Control": "no-store"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname !== "/count") {
      return Response.json({ error: "not_found" }, { status: 404, headers: cors });
    }

    if (request.method === "GET") {
      const state = await env.WIFI_STATE.get("live", "json");
      return Response.json(state || { count: null, updated: null }, { headers: cors });
    }

    if (request.method === "POST") {
      const auth = request.headers.get("Authorization") || "";
      if (!env.PUSH_TOKEN || auth !== `Bearer ${env.PUSH_TOKEN}`) {
        return Response.json({ error: "unauthorized" }, { status: 401, headers: cors });
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return Response.json({ error: "bad_json" }, { status: 400, headers: cors });
      }

      const count = Number.parseInt(body.count, 10);
      if (!Number.isInteger(count) || count < 0 || count > 512) {
        return Response.json({ error: "bad_count" }, { status: 400, headers: cors });
      }

      const state = {
        count,
        updated: new Date().toISOString()
      };

      await env.WIFI_STATE.put("live", JSON.stringify(state));
      return Response.json({ ok: true }, { headers: cors });
    }

    return Response.json({ error: "method_not_allowed" }, { status: 405, headers: cors });
  }
};
