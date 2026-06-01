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

2. Adjust **`apphosting.yaml`** if your project id, Firestore database id, or storage bucket differ from the values there.

3. Deploy:

   ```bash
   firebase deploy
   ```

If a rollout still fails, open the **Cloud Build** link from the CLI output and read the first red error line.

## Scripts

| Command        | Description           |
|----------------|-----------------------|
| `npm run dev`  | Development server    |
| `npm run build`| Production build       |
| `npm run start`| Run production build   |
| `npm run lint` | ESLint                 |
| `npm run audit`| `npm audit`            |
