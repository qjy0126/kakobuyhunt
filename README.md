# Kakobuy Hunt

Static site for [kakobuyhunt.com](https://kakobuyhunt.com) — repo: [qjy0126/kakobuyhunt](https://github.com/qjy0126/kakobuyhunt).

## Cloudflare Pages (recommended)

1. Workers & Pages → Create → Pages → connect **qjy0126/kakobuyhunt**
2. Build settings:
   - Framework preset: **None**
   - Build command: **leave empty** (do not use `npx wrangler deploy`)
   - Build output directory: `/` or `.`
3. Custom domains → add `kakobuyhunt.com`

If you use a Wrangler/Workers assets deploy instead, `.assetsignore` excludes `.git` so pack files are not uploaded (Cloudflare max asset size is 25 MiB).
