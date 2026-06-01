import Link from "next/link"
import Image from "next/image"
import { ArrowDown } from "lucide-react"

interface HeroProps {
  imageUrl: string
}

export function Hero({ imageUrl }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt="Tiny house in nature"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p className="text-sm tracking-[0.3em] uppercase mb-6 opacity-80">
          Architectural Tiny Houses
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide text-balance">
          Where design meets
          <br />
          <span className="italic">nature</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
          Panoramic, all-season cabins crafted for comfort, style, and connection with the landscape.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#models"
            className="px-8 py-4 bg-white text-black text-sm tracking-wide hover:bg-white/90 transition-colors"
          >
            Explore Models
          </Link>
          <Link
            href="/#about"
            className="px-8 py-4 border border-white text-white text-sm tracking-wide hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white/70" />
      </div>
    </section>
  )
}
