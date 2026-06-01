export const modelMetadata = [
  {
    id: "m1",
    name: "Model 1",
    tagline: "Bestseller Model",
    subtitle: "All-season panoramic tiny house for couples or solo stays",
    description:
      "Our most popular and iconic cabin, designed for comfort and style. Featuring a giant floor-to-ceiling window with solar-coated glass, M1 blends into the landscape while framing nature as living art. Inside, a queen-size orthopedic bed and a dedicated workspace make it perfect for weekend escapes or remote work retreats.",
    features: [
      "Footprint: 13.2 m²",
      "Panoramic glazing with solar film: privacy + UV & heat protection",
      "Minimalist, warm interior with birch-ply finishes",
      "Dedicated desk for remote work",
      "Foundation-free setup; towable with SUV (<3.5 t)",
    ],
    specs: {
      footprint: "13.2 m²",
      sleeps: "2",
      bed: "Queen-size orthopedic",
    },
    coverImage: "7A3A3637.jpg",
    tourUrl: "https://tours.svitiny.com.ua/m2/",
  },
  {
    id: "m2",
    name: "Model 2",
    tagline: "Family Model",
    subtitle: "Smart storage and loft comfort for longer stays",
    description:
      "M2 is designed for families and groups, with an extra loft berth and expanded cabinetry that extend stay duration and guest comfort. Its thoughtful layout works equally well for glamping resorts, farm stays, or lakeside retreats.",
    features: [
      "Footprint: 13.2 m² + 4.06 m²",
      "Sleeps up to 4 (main bed + loft berth)",
      "Family-friendly finishes and blackout options",
      "Expanded storage: cabinets, drawers, under-bed solutions",
      "Optional deck/awning, thermo-treated pine cladding",
    ],
    specs: {
      footprint: "13.2 m² + 4.06 m²",
      sleeps: "4",
      bed: "Main bed + loft berth",
    },
    coverImage: "світанок01.png",
    tourUrl: "https://tours.svitiny.com.ua/m2/",
  },
  {
    id: "m1-stealth",
    name: "M1 STEALTH",
    tagline: "Design Icon",
    subtitle: "Mirror-glass exterior, two workstations, striking architecture",
    description:
      'M1 STEALTH is our boldest model: a tiny house that disappears into the landscape with its reflective façade while offering a modern, two-desk interior for creative stays. Perfect for boutique glamping or design-driven destinations, STEALTH combines wow-factor with full hotel-grade functionality.',
    features: [
      "Mirror-glass panoramic facade (privacy + solar control)",
      "Two dedicated workstations — ideal for remote professionals",
      "Sleeps 2 (queen-size bed)",
      "SUV-transportable, no foundation required",
      'A true "Instagram magnet" for resorts and retreats',
    ],
    specs: {
      footprint: "13.2 m²",
      sleeps: "2",
      bed: "Queen-size",
    },
    tourUrl: "http://tours.svitiny.com.ua/m1-stealth/",
  },
  {
    id: "m3",
    name: "Model 3",
    tagline: "Long-Stay Comfort",
    subtitle: "Family-first planning for week-long or seasonal stays",
    description:
      "M3 is optimized for longer guest visits, making it perfect for ski resorts, wellness camps, and lakeside hotels. With a larger refrigerator, washing machine, and abundant cabinetry, it supports week-long comfort while staying fully mobile.",
    features: [
      "Footprint: 13.2 m² + 4.06 m²",
      "Two sleeping zones (sleeps 4)",
      "Full-size refrigerator + washing machine",
      "Bathroom: 80×90 cm shower, porcelain WC, sink, mirror",
      "Functional, family-oriented design to extend stays",
      "Optional deck/awning; seasonal relocation without cranes",
    ],
    specs: {
      footprint: "13.2 m² + 4.06 m²",
      sleeps: "4",
      bed: "Two sleeping zones",
    },
    tourUrl: null,
  },
] as const

export type ModelMetadata = (typeof modelMetadata)[number]
