import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getModelHeroImage, type Model } from "@/lib/models"

interface ModelCardProps {
  model: Model
  index: number
}

export function ModelCard({ model, index }: ModelCardProps) {
  const heroImage = getModelHeroImage(model)

  return (
    <Link 
      href={`/models/${model.id}`}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {heroImage && (
          <Image
            src={heroImage}
            alt={model.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 2}
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>
      
      <div className="mt-6 flex items-start justify-between">
        <div>
          <p className="text-xs tracking-widest text-muted-foreground uppercase mb-2">
            {model.tagline}
          </p>
          <h3 className="font-serif text-2xl font-light tracking-wide">
            {model.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            {model.subtitle}
          </p>
        </div>
        <div className="mt-1 p-2 rounded-full border border-border group-hover:border-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-300">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}
