import { modelMetadata } from "@/lib/data"
import { IMAGE_CATEGORIES } from "@/lib/storage"
import { getModel, getModelHeroImage } from "@/lib/models"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageGallery } from "@/components/image-gallery"
import { ArrowLeft, ExternalLink, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const GALLERY_SECTIONS: {
  key: (typeof IMAGE_CATEGORIES)[number]["key"]
  title: string
  background: "secondary" | "background"
}[] = [
  { key: "exterior", title: "Exterior", background: "secondary" },
  { key: "interior", title: "Interior", background: "background" },
  {
    key: "appliances",
    title: "Appliances & Details",
    background: "secondary",
  },
  { key: "mobility", title: "Mobility", background: "background" },
  { key: "planning", title: "Planning", background: "secondary" },
]

export function generateStaticParams() {
  return modelMetadata.map((model) => ({
    slug: model.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const model = await getModel(slug)
  if (!model) return { title: "Model Not Found" }

  return {
    title: `${model.name} | AOS SPACES`,
    description: model.description,
  }
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const model = await getModel(slug)

  if (!model) {
    notFound()
  }

  const heroImage = getModelHeroImage(model)

  return (
    <main>
      <Header />

      <section className="relative min-h-[70vh] flex items-end pt-20">
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={model.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
        )}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16">
          <Link
            href="/#models"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Models
          </Link>

          <p className="text-white/70 text-sm tracking-[0.2em] uppercase mb-3">
            {model.tagline}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide">
            {model.name}
          </h1>
          <p className="mt-4 text-xl text-white/80 font-light max-w-2xl">
            {model.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h2 className="text-2xl font-light tracking-wide mb-6">Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {model.description}
              </p>

              {model.tourUrl && (
                <a
                  href={model.tourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:opacity-90 transition-opacity"
                >
                  Take a 3D Tour
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-light tracking-wide mb-6">
                Key Features
              </h2>
              <ul className="space-y-4">
                {model.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-6">
                  Specifications
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-2xl font-light">{model.specs.footprint}</p>
                    <p className="text-sm text-muted-foreground mt-1">Footprint</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light">{model.specs.sleeps}</p>
                    <p className="text-sm text-muted-foreground mt-1">Sleeps</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light">{model.specs.bed}</p>
                    <p className="text-sm text-muted-foreground mt-1">Bed Type</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {GALLERY_SECTIONS.map(({ key, title, background }) => {
        const images = model.images[key]
        if (images.length === 0) return null

        return (
          <section
            key={key}
            className={`py-16 md:py-24 ${background === "secondary" ? "bg-secondary" : "bg-background"}`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl font-light tracking-wide mb-8">{title}</h2>
              <ImageGallery images={images} title={`${model.name} ${title}`} />
            </div>
          </section>
        )
      })}

      <section className="py-16 md:py-24 bg-muted">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide">
            Interested in {model.name}?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get in touch to discuss your project, request specifications, or
            schedule a viewing.
          </p>
          <a
            href="mailto:hello@theartofasimplelife.com"
            className="inline-block mt-8 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
