# CalmKernel — calmkernel.tr

Corporate website for [CalmKernel](https://calmkernel.tr), a Turkish tech company building data infrastructure platforms and open source tools.

## Stack

- **HTML** — Static pages, no framework
- **Tailwind CSS v4** — Purged build (`src/input.css` → `assets/css/main.css`)
- **Font Awesome 6** — Self-hosted webfonts
- **Fonts** — Sora (headlines) + Inter (body), self-hosted WOFF2 (KVKK/GDPR compliant)
- **GitHub Pages** — Deployed via `actions/deploy-pages`

## Pages

| Path | Language | Description |
|------|----------|-------------|
| `/` | TR | Landing page |
| `/en/` | EN | English landing page |
| `/privacy-policy.html` | TR | Gizlilik Politikası (KVKK) |
| `/en/privacy-policy.html` | EN | Privacy Policy |
| `/404.html` | TR/EN | Custom error page |

## Development

```bash
# Local preview
python3 -m http.server 8000

# Rebuild Tailwind CSS (requires standalone CLI)
tailwindcss --input src/input.css --output assets/css/main.css --content "index.html,en/index.html,privacy-policy.html,en/privacy-policy.html,404.html" --minify
```

## Deploy

Push to `main` triggers automatic GitHub Pages deployment via `.github/workflows/deploy.yml`.

## Custom Domain

`calmkernel.tr` → CNAME pointing to `calmkerneltr.github.io`, HTTPS managed by GitHub.

## License

All Rights Reserved. See [LICENSE](LICENSE).

## Security

Report vulnerabilities to `meet@calmkernel.tr`. See [SECURITY.md](SECURITY.md).
