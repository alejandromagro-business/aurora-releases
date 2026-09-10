# aurora-media.shop — landing page

A single static page. No build step, no dependencies.

## Deploy to Vercel

1. Vercel → **Add New… → Project** → import the `aurora-releases` repository. Do not import the private application repository.
2. Set **Root Directory** to `landing`.
3. Framework preset: **Other**. Leave the build and output settings empty.
4. Deploy, then add the domain `aurora-media.shop` under **Settings → Domains**.

Namecheap: point the domain at Vercel either by switching the nameservers to
Cloudflare (and adding the records Vercel shows), or by adding Vercel's A/CNAME
records directly at Namecheap. Vercel issues the HTTPS certificate itself.

## Editing

The main page and styles live in `index.html`; interactions live in `main.js`.
Prices appear in the hero, the comparison table and the pricing cards; change
all three together.

## Cloudflare Workers

The repository root contains `wrangler.toml`. It publishes only `landing/` as
static assets, without the application source or a server build.

From the repository root, authenticate with `npx wrangler login`, then run
`npx wrangler deploy`. Add `aurora-media.shop` as a custom domain in the Worker
settings after verifying the deployment. Follow the DNS instructions shown for
that domain; do not change unrelated records.

## Before publishing

Verify that screenshots contain no account details, private paths or source URLs.
Never upload environment files, signing keys, `.wrangler/` or `.vercel/`.
Only advertise downloads that exist. Paid checkout and delivery must be configured
before enabling purchase buttons; legal drafts and placeholder fields must not be
presented as completed policies.
