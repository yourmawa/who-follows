import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test, { after, before } from "node:test";
import { Miniflare } from "miniflare";

let worker;

before(async () => {
  const serverDirectory = new URL("../dist/server/", import.meta.url);
  const config = JSON.parse(
    await readFile(new URL("wrangler.json", serverDirectory), "utf8"),
  );
  const files = await readdir(serverDirectory, { recursive: true });
  // Vite emits computed dynamic imports, so provide the complete module graph.
  const modulePaths = [
    "index.js",
    ...files.filter((file) => file.endsWith(".js") && file !== "index.js").sort(),
  ];
  worker = new Miniflare({
    modulesRoot: fileURLToPath(serverDirectory),
    modules: modulePaths.map((path) => ({
      type: "ESModule",
      path: fileURLToPath(new URL(path, serverDirectory)),
    })),
    compatibilityDate: config.compatibility_date,
    compatibilityFlags: config.compatibility_flags,
    cf: false,
    serviceBindings: {
      ASSETS: () => new Response("Not found", { status: 404 }),
    },
  });
});

after(async () => {
  await worker?.dispose();
});

async function renderedHtml(path) {
  const response = await worker.dispatchFetch(`http://localhost${path}`, {
    headers: { accept: "text/html" },
  });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("renders WhoFollows landing page and metadata", async () => {
  const html = await renderedHtml("/");
  assert.match(html, /<title>Who Follows\? — See what changed<\/title>/);
  assert.match(
    html,
    /<meta(?=[^>]*\bname=["']description["'])(?=[^>]*\bcontent=["']Compare Instagram Followers and Following snapshots without sharing your Instagram password\.["'])[^>]*>/i,
  );
  assert.match(html, /Who appeared\?/);
  assert.match(html, /Who disappeared\?/);
});

test("renders WebMCP demo with deterministic comparison and home link", async () => {
  const html = await renderedHtml("/webmcp-demo");
  assert.match(html, /href="\/"/);
  assert.match(html, /@demo\.profile/);
  assert.match(html, /@(?:<!-- -->)?new\.account/);
  assert.match(html, /@(?:<!-- -->)?older\.account/);
  assert.match(html, /get_latest_changes/);
  assert.match(html, /Waiting for an agent request/);
});
