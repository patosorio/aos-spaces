"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FormStatus = "idle" | "submitting" | "success" | "error"

const INTEREST_OPTIONS = [
  { value: "personal", label: "A personal tiny house" },
  { value: "hospitality", label: "Hospitality / hotel project" },
  { value: "rental", label: "Rental or investment property" },
  { value: "custom", label: "Custom or bulk order" },
  { value: "other", label: "Other" },
] as const

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [interest, setInterest] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage("")

    if (!interest) {
      setErrorMessage("Please select what you are interested in.")
      setStatus("error")
      return
    }

    const form = e.currentTarget
    const formData = new FormData(form)

    setStatus("submitting")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          interest,
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string
          code?: string
        } | null
        const serverError = payload?.error?.trim()
        throw new Error(
          serverError && serverError.length > 0
            ? serverError
            : "Something went wrong.",
        )
      }

      setStatus("success")
      form.reset()
      setInterest("")
    } catch (error) {
      setStatus("error")
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again.",
      )
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Contact
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide leading-tight">
              Let&apos;s start a conversation
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Whether you&apos;re looking for a personal retreat, a guest house
              for your property, or a fleet of units for a hospitality project
              &mdash; we&apos;d love to hear from you.
            </p>
            <div className="mt-10 flex flex-col gap-6">
              <div>
                <p className="text-sm font-medium mb-1">Email</p>
                <a
                  href="mailto:hello@aosspaces.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  hello@aosspaces.com
                </a>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Based in</p>
                <p className="text-muted-foreground">Europe</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Response time</p>
                <p className="text-muted-foreground">Within 48 hours</p>
              </div>
            </div>
          </div>

          <div>
            {status === "success" ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-light tracking-wide mb-3">
                    Thank you
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We&apos;ve received your message and will get back to you
                    soon.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden
                />

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-sm">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      disabled={status === "submitting"}
                      placeholder="Your name"
                      className="bg-transparent border-border"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      disabled={status === "submitting"}
                      placeholder="your@email.com"
                      className="bg-transparent border-border"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="interest" className="text-sm">
                    I&apos;m interested in
                  </Label>
                  <Select
                    value={interest}
                    onValueChange={setInterest}
                    disabled={status === "submitting"}
                    required
                  >
                    <SelectTrigger
                      id="interest"
                      className="bg-transparent border-border"
                    >
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {INTEREST_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message" className="text-sm">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    disabled={status === "submitting"}
                    rows={5}
                    placeholder="Tell us about your project or what you have in mind..."
                    className="bg-transparent border-border resize-none"
                  />
                </div>

                {status === "error" && errorMessage && (
                  <p className="text-sm text-destructive" role="alert">
                    {errorMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto self-start mt-2"
                >
                  {status === "submitting" ? "Sending..." : "Send message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
