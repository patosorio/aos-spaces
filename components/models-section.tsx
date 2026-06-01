import { getModels } from "@/lib/models"
import { ModelCard } from "./model-card"

export async function ModelsSection() {
  const models = await getModels()

  return (
    <section id="models" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Our Collection
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
            Four unique models
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Each designed with purpose, from compact solo retreats to family-friendly spaces for extended stays.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {models.map((model, index) => (
            <ModelCard key={model.id} model={model} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
