# Hattip Simple Starter

This is a simple full-stack starter project for Hattip, using the Hattip Vite plugin. The following commands are available:

- `pnpm dev` to run the dev server
- `pnpm build` to build the project
- `pnpm start` to run the built project

This same code can be built for and deployed to many different platforms and runtimes. For example, to deploy to Cloudflare Workers, follow these steps:

```sh
# Install Hattip's Cloudflare Workers adapter
pnpm install -S @hattip/adapter-cloudflare-workers
# Install Wrangler (Cloudflare Workers CLI)
pnpm install -D wrangler`
```

Then create a `src/entry-cfw.js` file with the following contents as detailed in the adapter's readme:

```js
import cloudflareWorkersAdapter from "@hattip/adapter-cloudflare-workers";
import handler from "../dist/server/entry-hattip.js";

export default {
  fetch: cloudflareWorkersAdapter(handler),
};
```

Finally, add a `wrangler.toml` configuration file:

```toml
name = "my-hattip-project"
compatibility_date = "2023-08-01"
main = "src/entry-cfw.js"

[site]
bucket = "./dist/client"
```

After building your project, you can test it locally with `wrangler dev`. To deploy it to Cloudflare Workers, run `wrangler deploy`.

Currently, Hattip comes with the following adapters:

- `adapter-node`: Node.js, either as a standalone server or as a middleware function that can be used with Express and similar frameworks. Also works for Vercel Serverless Functions and Google Cloud Functions. It's also compatible with Deno and Bun when they're using the Node-compatible `node:http` module (but they have native adapters too).
- `adapter-cloudflare-workers`: Cloudflare Workers
- `adapter-vercel-edge`: Vercel Edge Functions
- `adapter-netlify-functions`: Netlify Functions
- `adapter-netlify-edge`: Netlify Edge Functions
- `adapter-deno`: Deno
- `adapter-bun`: Bun
- `adapter-fastly`: Fastly
- `adapter-lagon`: Lagon
- `adapter-uwebsockets`: uWebSockets.js
