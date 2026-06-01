"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl tracking-[0.2em] font-light">
          AOS SPACES
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <Link 
            href="/#models" 
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            Models
          </Link>
          <Link 
            href="/#about" 
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link 
            href="/#contact" 
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link 
              href="/#models" 
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Models
            </Link>
            <Link 
              href="/#about" 
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/#contact" 
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
