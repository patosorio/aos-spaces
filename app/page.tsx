import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ModelsSection } from "@/components/models-section"
import { FeaturesSection } from "@/components/features-section"
import { AboutSection } from "@/components/about-section"
import { BusinessCta } from "@/components/business-cta"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { getFirstImage } from "@/lib/storage"

export default async function Home() {
  const [heroImage, aboutImage] = await Promise.all([
    getFirstImage("m1", "exterior", "interior"),
    getFirstImage("m2", "interior", "exterior"),
  ])

  if (!heroImage || !aboutImage) {
    throw new Error(
      "Could not load homepage images from Firebase Storage. Check credentials and storage rules.",
    )
  }

  return (
    <main>
      <Header />
      <Hero imageUrl={heroImage} />
      <ModelsSection />
      <FeaturesSection />
      <AboutSection imageUrl={aboutImage} />
      <BusinessCta />
      <ContactSection />
      <Footer />
    </main>
  )
}
