# Kakobuy Hunt

Static Kakobuy Spreadsheet site for [kakobuyhunt.com](https://kakobuyhunt.com).

## Deploy on Cloudflare Pages

1. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → connect this GitHub repo.
2. Build settings: Framework preset **None**, Build command empty, Output directory `/` (or leave blank for root).
3. Add custom domain `kakobuyhunt.com` (and `www` if you want) under the Pages project → **Custom domains**.
4. Point the domain’s DNS to Cloudflare (orange-cloud) so SSL and CDN apply.

No Node build step — HTML/CSS/JS are served as static assets.
