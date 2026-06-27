# Road to the 1000 Club — 2026 Strength Tracker

A single-page React app for the June 29 → December 31, 2026 strength block:
date-driven 5/3/1 with bench-priority FSL, OHP reset, squat/deadlift peak, a
December test week, daily elliptical, accessory + "feeling bold" tracking, and
one-tap sync of your whole log into a Google Sheet.

It's a static site — no server, no database. Your logs live in your browser
(localStorage) and are pushed to your own Google Sheet on demand and once a day.

---

## 1. Deploy to GitHub Pages

You need a free GitHub account. You do **not** need to install anything locally —
GitHub builds and hosts the site for you.

### A. Create the repository

1. On GitHub, click **New repository**. Name it whatever you like (e.g.
   `strength-2026`). Public is fine. Create it **empty** (no README).
2. Upload these files. Two easy options:
   - **Web UI:** on the empty repo page, click **uploading an existing file**,
     then drag in everything from this folder (keep the folder structure —
     `src/`, `.github/workflows/`, etc.). Commit to `main`.
   - **Command line:**
     ```bash
     cd strength-2026
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/<you>/<repo>.git
     git push -u origin main
     ```

### B. Turn on Pages

1. In the repo: **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
   (That's it — no branch to pick. The included workflow does the rest.)

### C. Let it build

- Open the **Actions** tab. The **Deploy to GitHub Pages** workflow runs on every
  push to `main`. First run takes ~1–2 minutes.
- When it's green, your site is live at:
  ```
  https://<you>.github.io/<repo>/
  ```
  (Settings → Pages shows the exact URL.)

That's the whole deploy. Every future `git push` to `main` re-deploys automatically.

> **Asset paths / base URL.** The workflow sets the Vite `base` to `/<repo>/`
> for you, so a project site just works. If you ever rename the repo, the next
> push fixes the paths automatically. (If you instead use a user/org site — a repo
> literally named `<you>.github.io` — change `BASE_PATH` in
> `.github/workflows/deploy.yml` to `/`.)

### Run it locally (optional)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built site locally
```

---

## 2. Connect the Google Sheet

The app writes to a Sheet through a tiny Google Apps Script bound to that Sheet.
No API keys, nothing secret in your repo.

1. Open (or create) the Google Sheet you want.
2. **Extensions → Apps Script.** Delete the starter code and paste the contents of
   **`google-apps-script.gs`** (in this folder). **Save.**
3. **Deploy → New deployment → Web app.**
   - **Execute as:** Me
   - **Who has access:** Anyone
   - **Deploy**, then **Authorize access** (approve the Google permission prompt).
4. Copy the **Web app URL** — it ends in `/exec`.
5. In the app, go to the **Progress** tab → **Sync to Google Sheets**, paste the
   URL into the box, and tap **Sync now**. Your data appears on a tab called **Log**.

After that it syncs **automatically once per day** and **after every completed
workout**, plus the manual **Sync now** button. Each sync rewrites the `Log` tab
with your full current data, so there are never duplicate rows.

### Pre-filling the URL on deploy (optional)

By default you paste the URL in-app and it's saved in that browser. If you'd
rather bake it into the deployed site so every device picks it up automatically:

1. Repo **Settings → Secrets and variables → Actions → New repository secret**.
2. Name: `VITE_SHEET_URL`. Value: your `/exec` URL. Save.
3. Re-run the deploy (push any commit, or Actions → Deploy → **Run workflow**).

> **Privacy:** "Who has access: Anyone" means anyone holding that unguessable
> `/exec` URL can write to your Sheet. That's normal and fine for a personal
> tracker — just don't share the URL, and **only** use the `VITE_SHEET_URL`
> secret if your repo is **private**, since a public build embeds the URL in
> the site's JavaScript.

### Notes / troubleshooting

- The browser sends the sync in "no-cors" mode (the only way it can post to an
  Apps Script web app), so the app can't read the reply — it reports "sent"
  optimistically. The source of truth for "did it land" is the Sheet itself.
- If a sync doesn't show up: re-check that the Web app URL ends in `/exec`, that
  access is **Anyone**, and that you re-deployed after editing the script.
- Prefer a file? The Progress tab also has **CSV download** (your results, or the
  full plan) as a fallback.

---

## Project layout

```
strength-2026/
├─ index.html                  # page shell
├─ package.json                # deps + scripts
├─ vite.config.js              # base-path config for GitHub Pages
├─ google-apps-script.gs       # paste into your Sheet (Apps Script)
├─ .github/workflows/deploy.yml# CI: build + deploy to Pages
└─ src/
   ├─ main.jsx                 # mounts the app
   └─ StrengthApp.jsx          # the whole tracker
```

*Not medical advice. Calorie/training figures follow standard principles; consult
the appropriate professional for individualized guidance.*
