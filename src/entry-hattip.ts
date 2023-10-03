import { createRouter } from "@hattip/router";
import { html } from "@hattip/response";
import type { Manifest } from "vite";

// Hattip makes the Vite dev server available during dev
import devServer from "virtual:vite-dev-server";

const router = createRouter();

router.get("/", async () => {
  let clientScript: string;
  if (devServer) {
    // In dev, Vite serves assets from their location relative to the root of the project
    clientScript = "/src/entry-client.ts";
  } else {
    // In production, Vite generates a manifest file which we need to read to get the correct asset path
    const manifest: { default: Manifest } = await import(
      // @ts-expect-error: manifest.json is only available at build time
      "../dist/client/manifest.json"
    );
    clientScript = manifest.default["src/entry-client.ts"].file;
  }

  return html(`<!DOCTYPE html>
    <html>
      <head>
        <title>Playground</title>
      </head>
      <body>
        <h1>Playground</h1>
        <button>Clicked 0 time(s)</button>
        <script type="module" src="${clientScript}"></script>
      </body>
    </html>
  `);
});

export default router.buildHandler();
