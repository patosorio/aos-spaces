import "server-only"
import { getStorageBucket } from "@/lib/firebase-admin"

const COLLECTION_PREFIX = "collection-models"

const STORAGE_FOLDER_BY_MODEL_ID: Record<string, string> = {
  m1: "M1",
  m2: "M2",
  "m1-stealth": "M1-stealth",
  m3: "M3",
}

export const IMAGE_CATEGORIES = [
  { key: "exterior", folder: "Exterior" },
  { key: "interior", folder: "Interior" },
  { key: "appliances", folder: "Appliances" },
  { key: "mobility", folder: "Mobility" },
  { key: "planning", folder: "Planning" },
] as const

export type ImageCategoryKey = (typeof IMAGE_CATEGORIES)[number]["key"]

export type ModelImages = Record<ImageCategoryKey, string[]>

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".avif",
])

function isImageFile(name: string): boolean {
  const lower = name.toLowerCase()
  return [...IMAGE_EXTENSIONS].some((ext) => lower.endsWith(ext))
}

export function buildStorageMediaUrl(objectPath: string): string {
  const bucket =
    process.env.FIREBASE_STORAGE_BUCKET ?? "aos-spaces.firebasestorage.app"
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(objectPath)}?alt=media`
}

async function listCategoryImages(
  modelFolder: string,
  categoryFolder: string,
): Promise<string[]> {
  const prefix = `${COLLECTION_PREFIX}/${modelFolder}/${categoryFolder}/`
  const bucket = getStorageBucket()
  const [files] = await bucket.getFiles({ prefix })

  const urls = files
    .filter((file) => isImageFile(file.name))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((file) => buildStorageMediaUrl(file.name))

  return urls
}

export async function getModelImages(modelId: string): Promise<ModelImages> {
  const modelFolder = STORAGE_FOLDER_BY_MODEL_ID[modelId]
  if (!modelFolder) {
    throw new Error(`No storage folder mapped for model id "${modelId}"`)
  }

  const entries = await Promise.all(
    IMAGE_CATEGORIES.map(async ({ key, folder }) => [
      key,
      await listCategoryImages(modelFolder, folder),
    ] as const),
  )

  return Object.fromEntries(entries) as ModelImages
}

export async function getFirstImage(
  modelId: string,
  ...categories: ImageCategoryKey[]
): Promise<string | undefined> {
  const images = await getModelImages(modelId)
  for (const category of categories) {
    const url = images[category][0]
    if (url) return url
  }
  return undefined
}
