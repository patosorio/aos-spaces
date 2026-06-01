import "server-only"
import { FieldValue } from "firebase-admin/firestore"
import { z } from "zod"
import { getFirestore } from "@/lib/firebase-admin"

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Valid email is required").max(254),
  interest: z.enum([
    "personal",
    "hospitality",
    "rental",
    "custom",
    "other",
  ]),
  message: z.string().trim().min(1, "Message is required").max(5000),
  company: z.string().optional(),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>

const INTEREST_LABELS: Record<ContactFormInput["interest"], string> = {
  personal: "A personal tiny house",
  hospitality: "Hospitality / hotel project",
  rental: "Rental or investment property",
  custom: "Custom or bulk order",
  other: "Other",
}

export async function saveContactRequest(data: ContactFormInput) {
  const collection =
    process.env.FIRESTORE_CONTACT_COLLECTION ?? "contact-requests"

  const docRef = await getFirestore()
    .collection(collection)
    .add({
      name: data.name,
      email: data.email,
      interest: data.interest,
      interestLabel: INTEREST_LABELS[data.interest],
      message: data.message,
      status: "new",
      source: "website",
      createdAt: FieldValue.serverTimestamp(),
    })

  return docRef.id
}
