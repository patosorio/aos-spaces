import "server-only"
import { cache } from "react"
import { modelMetadata, type ModelMetadata } from "@/lib/data"
import { getModelImages, type ModelImages } from "@/lib/storage"

export type Model = ModelMetadata & { images: ModelImages }

function applyCoverImage(
  images: ModelImages,
  coverImage?: string,
): ModelImages {
  if (!coverImage) return images

  const exterior = [...images.exterior]
  const coverIndex = exterior.findIndex((url) =>
    decodeURIComponent(url).includes(coverImage),
  )
  if (coverIndex <= 0) return images

  const [cover] = exterior.splice(coverIndex, 1)
  return { ...images, exterior: [cover, ...exterior] }
}

async function loadModelImages(metadata: ModelMetadata): Promise<ModelImages> {
  const images = await getModelImages(metadata.id)
  const coverImage =
    "coverImage" in metadata ? metadata.coverImage : undefined
  return applyCoverImage(images, coverImage)
}

export function getModelHeroImage(model: Model): string | undefined {
  return (
    model.images.exterior[0] ||
    model.images.interior[0] ||
    model.images.appliances[0]
  )
}

export const getModels = cache(async (): Promise<Model[]> => {
  return Promise.all(
    modelMetadata.map(async (metadata) => ({
      ...metadata,
      images: await loadModelImages(metadata),
    })),
  )
})

export const getModel = cache(async (id: string): Promise<Model | undefined> => {
  const metadata = modelMetadata.find((model) => model.id === id)
  if (!metadata) return undefined

  return {
    ...metadata,
    images: await loadModelImages(metadata),
  }
})
