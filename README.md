# AOS Spaces — Website

Marketing site for AOS Spaces: model pages, gallery images from Firebase Storage, and a contact form saved to Firestore.

## Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Admin](https://firebase.google.com/docs/admin/setup) (Firestore + Storage on the server)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Create **`.env.local`** in the project root with your Firebase settings (see the Firebase console for project id, bucket, and database id). Do not commit `.env.local`.

For local Admin SDK auth you can use **`FIREBASE_SERVICE_ACCOUNT_JSON`** (single-line JSON) or a **`GOOGLE_APPLICATION_CREDENTIALS`** path to a service account file that stays **gitignored**.

## Build

```bash
npm run build
npm start
```

## Deploy (Firebase App Hosting)

This app uses server features (API route, Admin SDK). Use [App Hosting](https://firebase.google.com/docs/app-hosting) (not static-only Hosting).

**Why builds fail on first deploy:** Cloud Build runs `next build`, which loads model data via Firebase Admin. Your service account JSON is **not** in Git — you must give App Hosting a **secret** so `FIREBASE_SERVICE_ACCOUNT_JSON` exists at **BUILD** and **RUNTIME**.

1. From the repo root (with `firebase use` pointing at this project), create the secret once (path is your local gitignored key):

   ```bash
   firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_JSON --data-file ./lib/firebase-private-key.json --force
   ```

2. Let the backend read that secret during Cloud Build and at runtime (replace `aos-backend` if yours differs):

   ```bash
   firebase apphosting:secrets:grantaccess FIREBASE_SERVICE_ACCOUNT_JSON --backend aos-backend
   ```

3. **`apphosting.yaml`** in this repo already wires that secret plus `FIREBASE_PROJECT_ID`, `FIRESTORE_DATABASE_ID`, and `FIREBASE_STORAGE_BUCKET`. Edit the file if your values differ.

4. **`firebase.json`** must use `"rootDir": "."` (not `"/"`), so Cloud Build runs `npm ci` in the folder that contains `package.json`.

5. Deploy:

   ```bash
   firebase deploy
   ```

### If the rollout still fails

Open the **Cloud Build** log URL from the CLI. Typical cases:

| Log hint | What to do |
|----------|------------|
| `ENOENT` … `firebase-private-key.json` / “Firebase Admin has no credentials” | Secret missing or not granted: redo steps 1–2; confirm `apphosting.yaml` has `availability: [BUILD, RUNTIME]` for that secret. |
| `npm ci` / lockfile | Commit **`package-lock.json`**; run `npm install` locally and commit if lock was out of date. |
| Next / adapter errors | See [App Hosting Next support](https://firebase.google.com/docs/app-hosting/frameworks-tooling); you may need a supported Next minor if the adapter lags. |

Also check **Firebase console → App Hosting → your backend → Deployment settings**: **App root directory** should match the repo root (e.g. `.` or empty), not a lone `/`, or GitHub rollouts can disagree with `firebase.json`.

## Scripts

| Command        | Description           |
|----------------|-----------------------|
| `npm run dev`  | Development server    |
| `npm run build`| Production build       |
| `npm run start`| Run production build   |
| `npm run lint` | ESLint                 |
| `npm run audit`| `npm audit`            |
