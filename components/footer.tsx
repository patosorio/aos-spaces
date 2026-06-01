import Link from "next/link"

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl tracking-[0.2em] font-light mb-4">AOS SPACES</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Architectural tiny houses designed for modern living. Comfort meets nature.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm tracking-wide uppercase mb-4 opacity-70">Explore</h4>
            <div className="flex flex-col gap-3">
              <Link href="/#models" className="text-sm hover:opacity-70 transition-opacity">
                Our Models
              </Link>
              <Link href="/#about" className="text-sm hover:opacity-70 transition-opacity">
                About Us
              </Link>
              <Link href="/#contact" className="text-sm hover:opacity-70 transition-opacity">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-wide uppercase mb-4 opacity-70">Get in Touch</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:hello@aosspaces.com" className="hover:opacity-70 transition-opacity">
                hello@aosspaces.com
              </a>
              <p className="text-primary-foreground/70">
                Available for inquiries and custom orders
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/50">
            {new Date().getFullYear()} AOS SPACES. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
