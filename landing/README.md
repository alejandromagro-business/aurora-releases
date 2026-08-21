# aurora-media.shop — landing page

A single static page. No build step, no dependencies.

## Deploy to Vercel

1. Vercel → **Add New… → Project** → import the `aurora` repository.
2. Set **Root Directory** to `landing`.
3. Framework preset: **Other**. Leave the build and output settings empty.
4. Deploy, then add the domain `aurora-media.shop` under **Settings → Domains**.

Namecheap: point the domain at Vercel either by switching the nameservers to
Cloudflare (and adding the records Vercel shows), or by adding Vercel's A/CNAME
records directly at Namecheap. Vercel issues the HTTPS certificate itself.

## Editing

Everything lives in `index.html` — markup, styles and the two small scripts.
Prices appear in the hero, the comparison table and the pricing cards; change
all three together.
