import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BusinessCta() {
  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-background/60 mb-4">
          For Hospitality Partners
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-tight text-balance">
          Building a hotel in nature?
        </h2>
        <p className="mt-6 text-background/80 leading-relaxed max-w-2xl mx-auto">
          Whether you&apos;re launching a glamping resort, expanding an eco-lodge, or creating a unique hospitality experience, our tiny houses offer the perfect solution. Scalable, mobile, and designed to blend seamlessly with natural surroundings.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-background text-foreground hover:bg-background/90"
          >
            <Link href="#contact">
              Get in touch
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-transparent text-background border border-background hover:bg-background/10"
          >
            <Link href="#models">
              View models
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
