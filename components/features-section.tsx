import { Truck, TreePine } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* Mobility */}
          <div>
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-6">
              <Truck className="w-5 h-5 text-foreground" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide mb-6">
              Mobility
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              These houses can be transported anywhere, anytime. Designed for regular movement, every house can be equipped with a wheeled chassis.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                <span className="text-muted-foreground leading-relaxed">
                  No special truck required: the house and trailer weigh 3,500 kg, allowing transportation with a Category B vehicle
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                <span className="text-muted-foreground leading-relaxed">
                  Summer by the sea, winter in the forest: test different locations and stay flexible to seasonal demand
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                <span className="text-muted-foreground leading-relaxed">
                  Relocate your investment as opportunities arise
                </span>
              </li>
            </ul>
          </div>

          {/* Off-Grid Capability */}
          <div>
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-6">
              <TreePine className="w-5 h-5 text-foreground" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide mb-6">
              Off-Grid Capability
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Enables installation in remote locations where a construction crane can&apos;t reach. Bring comfort to the wildest destinations.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                <span className="text-muted-foreground leading-relaxed">
                  No need to connect to centralized utilities
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                <span className="text-muted-foreground leading-relaxed">
                  Minimal impact on the environment
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                <span className="text-muted-foreground leading-relaxed">
                  Minimal special permits needed for construction
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                <span className="text-muted-foreground leading-relaxed">
                  Comfort for guests, even in the most remote locations
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
