import Image from "next/image"

interface AboutSectionProps {
  imageUrl: string
}

export function AboutSection({ imageUrl }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageUrl}
              alt="Interior of AOS Spaces tiny house"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              About AOS Spaces
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide">
              Crafted for connection
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              We design and build architectural tiny houses that blend into their surroundings while offering hotel-grade comfort. Each model is engineered for mobility, durability, and year-round use — whether for private retreats, glamping resorts, or hospitality projects.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From panoramic glazing to thoughtful storage and premium finishes, every detail is considered to create spaces where design meets nature.
            </p>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Curated by SVITANOK.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
