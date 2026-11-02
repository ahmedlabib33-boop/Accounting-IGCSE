# Free deployment

This is a Next.js 16 app with four server routes (`/api/coach`, `/api/content`,
`/api/grade`, `/api/structured`), so it needs a host that runs Node.js functions,
not a static-only host such as GitHub Pages. Every option below has a free tier
that covers this app with no credit card.

| Host | Free tier | Fit for this app | Notes |
|---|---|---|---|
| **Vercel (Hobby)** | Free | Best | Zero config for Next.js; `vercel.json` is already in the repo. |
| Netlify | Free | Good | Needs the Next.js runtime plugin, which Netlify installs automatically. |
| Cloudflare Pages | Free | OK | Requires the OpenNext adapter; more setup. |
| Render (web service) | Free | OK | Spins down when idle, so the first request after a pause is slow. |

The app works without any secret. Only the AI Coach needs `GROQ_API_KEY`; without
it the coach returns a clear "not configured" message and everything else runs.

## Option 1: Vercel (recommended)

### One-time setup through the dashboard

1. Sign in at https://vercel.com with the GitHub account that owns this repo.
2. Click **Add New → Project** and pick `ahmedlabib33-boop/deployment-site`.
   If the repo is not listed, click **Adjust GitHub App Permissions** and grant
   the Vercel GitHub app access to `deployment-site`. This is the only step that
   currently blocks automatic deployments for this repository.
3. Leave the detected settings as they are (Framework: Next.js, Install: `npm ci`,
   Build: `npm run build`). They come from `vercel.json`.
4. Optional: under **Environment Variables** add `GROQ_API_KEY` for Production
   (and Preview if you want the coach on preview URLs).
5. Click **Deploy**. Vercel assigns `https://<project-name>.vercel.app`.

After that, every push to `main` deploys to production, and every other branch or
pull request gets its own preview URL. Nothing else is required.

### Setup from the command line

```bash
npm i -g vercel
```

```bash
vercel login
```

```bash
vercel link
```

```bash
vercel env add GROQ_API_KEY production
```

```bash
vercel --prod
```

`.vercelignore` keeps the Python, PowerShell, spreadsheet and generated-slide files
out of CLI uploads. The Git integration clones the whole repo and ignores that file.

### Custom domain (optional, still free)

Project → **Settings → Domains → Add**. Vercel shows the DNS record to create at
your registrar and issues the TLS certificate automatically.

## Option 2: Netlify

1. https://app.netlify.com → **Add new site → Import an existing project** → GitHub
   → `deployment-site`.
2. Build command `npm run build`, publish directory `.next`. Netlify detects Next.js
   and enables its runtime automatically.
3. Add `GROQ_API_KEY` under **Site configuration → Environment variables** if needed.

## Option 3: Render

1. https://dashboard.render.com → **New → Web Service** → connect the repo.
2. Runtime Node, build command `npm ci && npm run build`, start command `npm start`.
3. Choose the **Free** instance type. Add `GROQ_API_KEY` under Environment if needed.

## Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request using GitHub's free
Actions minutes: it compiles the curriculum content, runs the unit tests, lints, and
performs a production build. A red check means the deploy would fail too, so fix it
before merging.

## Before you deploy: remove the committed ngrok token

`ngrok.yml` contains a live ngrok auth token. Anything committed to a public or
shared repository should be treated as leaked. Revoke it at
https://dashboard.ngrok.com/get-started/your-authtoken, generate a new one, and keep
the new value out of git (for example in `.env.local`, which is already ignored).
This does not affect the hosted deployment, which never uses ngrok.
