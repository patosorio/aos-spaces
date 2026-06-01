import "server-only"
import { readFileSync } from "fs"
import { resolve } from "path"
import admin from "firebase-admin"
import { getFirestore as getFirestoreForApp } from "firebase-admin/firestore"

/**
 * Loads the Firebase service account without `require("./…json")`, so bundlers
 * do not embed the private key inside `.next` output.
 */
function loadServiceAccountFromDisk(): admin.ServiceAccount {
  const fromEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim()
  const absolutePath = fromEnv
    ? resolve(/* turbopackIgnore: true */ process.cwd(), fromEnv)
    : resolve(
        /* turbopackIgnore: true */ process.cwd(),
        "lib",
        "firebase-private-key.json",
      )

  const raw = readFileSync(absolutePath, "utf8")
  return JSON.parse(raw) as admin.ServiceAccount
}

function missingCredentialsMessage(): string {
  return [
    "Firebase Admin has no credentials.",
    "Local: set FIREBASE_SERVICE_ACCOUNT_JSON or add lib/firebase-private-key.json (gitignored).",
    "App Hosting: store minified service account JSON as secret FIREBASE_SERVICE_ACCOUNT_JSON, then:",
    "  firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_JSON --data-file ./lib/firebase-private-key.json --force",
    "  firebase apphosting:secrets:grantaccess FIREBASE_SERVICE_ACCOUNT_JSON --backend aos-backend",
  ].join(" ")
}

function loadServiceAccount(): admin.ServiceAccount {
  const inline = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim()
  if (inline) {
    try {
      return JSON.parse(inline) as admin.ServiceAccount
    } catch {
      throw new Error(
        "FIREBASE_SERVICE_ACCOUNT_JSON is set but is not valid JSON. Use one minified line (no trailing junk) for App Hosting secrets.",
      )
    }
  }

  try {
    return loadServiceAccountFromDisk()
  } catch (e: unknown) {
    const err = e as { code?: string }
    if (err?.code === "ENOENT") {
      throw new Error(missingCredentialsMessage())
    }
    throw e
  }
}

function getFirebaseApp(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.app()
  }

  const credentialJson = loadServiceAccount()
  const projectId =
    process.env.FIREBASE_PROJECT_ID?.trim() ||
    (credentialJson as admin.ServiceAccount & { project_id?: string })
      .project_id ||
    credentialJson.projectId

  if (!projectId) {
    throw new Error(
      "Firebase service account JSON is missing project_id. Set FIREBASE_PROJECT_ID in .env.local or in apphosting.yaml / App Hosting env.",
    )
  }

  return admin.initializeApp({
    credential: admin.credential.cert(credentialJson),
    projectId,
    storageBucket:
      process.env.FIREBASE_STORAGE_BUCKET ??
      `${projectId}.firebasestorage.app`,
  })
}

export function getStorageBucket() {
  return getFirebaseApp().storage().bucket()
}

/**
 * Firestore for this project. Uses the default database unless
 * FIRESTORE_DATABASE_ID is set (non-default named databases).
 */
export function getFirestore() {
  const app = getFirebaseApp()
  const databaseId = process.env.FIRESTORE_DATABASE_ID?.trim()
  if (databaseId && databaseId !== "(default)") {
    return getFirestoreForApp(app, databaseId)
  }
  return getFirestoreForApp(app)
}
