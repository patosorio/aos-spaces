import { NextResponse } from "next/server"
import {
  checkContactRateLimit,
  getClientIp,
} from "@/lib/contact-rate-limit"
import { contactFormSchema, saveContactRequest } from "@/lib/contact"

function isFirestoreNotConfigured(error: unknown): boolean {
  if (!error || typeof error !== "object") return false
  const err = error as { code?: number; message?: string }
  if (err.code === 5) return true
  const msg = err.message ?? ""
  return msg.includes("NOT_FOUND") || msg.includes("5 NOT_FOUND")
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const limited = checkContactRateLimit(ip)
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limited.retryAfterSec) },
        },
      )
    }

    const body = await request.json()
    const parsed = contactFormSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    if (parsed.data.company?.trim()) {
      return NextResponse.json({ ok: true })
    }

    const requestId = await saveContactRequest(parsed.data)

    return NextResponse.json({ ok: true, id: requestId })
  } catch (error) {
    console.error("Contact form error:", error)

    if (isFirestoreNotConfigured(error)) {
      return NextResponse.json(
        {
          error:
            "Firestore is not set up for this Firebase project yet. In the Firebase console, open Firestore Database and click Create database (Native mode). Then deploy again or retry locally.",
          code: "FIRESTORE_NOT_FOUND",
        },
        { status: 503 },
      )
    }

    const devMessage =
      process.env.NODE_ENV === "development" && error instanceof Error
        ? error.message
        : "Unable to submit your message. Please try again later."

    return NextResponse.json({ error: devMessage }, { status: 500 })
  }
}
