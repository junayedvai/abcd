# GlobalDock Admin Demo

A Vercel-ready Next.js demo for a Bangladesh-focused digital goods storefront with:
- premium public storefront
- typo-aware search
- protected admin panel
- product + seller management
- homepage content editing
- optional GitHub auto-commit after admin save

## Important
This project uses local JSON files as a simple CMS. On Vercel, local file writes are ephemeral.
For production, use the built-in GitHub sync route or replace the storage layer with a database.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Admin login
Visit `/admin/login`

Default local password in `.env.example`:
- `ADMIN_PASSWORD=change-this-password`

## Environment variables

See `.env.example`.

## GitHub auto-commit
If you set the GitHub env vars, saving in admin can also commit the updated JSON content into your repository.
That allows Vercel to redeploy automatically from GitHub.

Required for auto-commit:
- `GITHUB_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_BRANCH`
- `GITHUB_CONTENT_BASE_PATH` (optional)
- `ENABLE_GITHUB_SYNC=true`

## Search fix included
The search engine now treats `chatgpt` as `ChatGPT`, not generic `AI`.
