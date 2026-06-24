export type ExportPriority = "high" | "medium" | "low";

export type ProductCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  exportPriority: ExportPriority;
  products: string[];
};

export type HomepageProductGroup = {
  title: string;
  description: string;
  categorySlugs: string[];
};

export type PriorityExportProduct = {
  name: string;
  categorySlug: string;
  geoPageSlug?: string;
};

export type RfqProductPattern = {
  pattern: RegExp;
  product: string;
  category: string;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "structural-civil-works",
    title: "Structural / Civil Works Materials",
    shortTitle: "Structural & civil",
    description:
      "Cement, steel, aggregates, formwork, precast concrete, and foundation materials sourced from verified Turkish manufacturers.",
    exportPriority: "high",
    products: [
      "Cement", "Portland cement", "White cement", "Ready-mix concrete", "Concrete additives",
      "Concrete admixtures", "Aggregates", "Sand", "Gravel", "Crushed stone", "Reinforcing steel bars",
      "Rebar", "Steel mesh", "Welded wire mesh", "Steel profiles", "Structural steel beams",
      "Steel columns", "Hollow sections", "Metal decking", "Anchor bolts", "Chemical anchors",
      "Expansion anchors", "Formwork systems", "Plywood formwork", "Scaffolding systems",
      "Shoring systems", "Precast concrete elements", "Concrete slabs", "Concrete pipes",
      "Concrete manholes", "Concrete barriers", "Foundation waterproofing materials", "Geotextiles",
      "Geomembranes", "Drainage boards", "Expansion joints", "Construction joints", "Grouts",
      "Non-shrink grout", "Repair mortars",
    ],
  },
  {
    slug: "masonry-wall-construction",
    title: "Masonry / Wall Construction Materials",
    shortTitle: "Masonry & walls",
    description:
      "Bricks, blocks, mortars, drywall, and partition systems for wall construction projects.",
    exportPriority: "medium",
    products: [
      "Clay bricks", "Concrete blocks", "Hollow blocks", "AAC blocks",
      "Autoclaved aerated concrete blocks", "Lightweight blocks", "Limestone blocks", "Masonry mortar",
      "Cement mortar", "Ready-mix plaster", "Gypsum plaster", "Lime plaster", "Wall ties", "Lintels",
      "Partition wall systems", "Drywall systems", "Gypsum boards", "Moisture resistant gypsum boards",
      "Fire resistant gypsum boards", "Cement boards", "Fiber cement boards", "Metal studs", "Metal tracks",
      "Corner beads", "Joint tapes", "Joint compounds",
    ],
  },
  {
    slug: "roofing-materials",
    title: "Roofing Materials",
    shortTitle: "Roofing",
    description:
      "Roof tiles, metal sheets, membranes, insulation, and drainage systems for commercial and residential projects.",
    exportPriority: "high",
    products: [
      "Roof tiles", "Clay roof tiles", "Concrete roof tiles", "Metal roofing sheets",
      "Corrugated roofing sheets", "Standing seam roofing", "Sandwich roof panels",
      "Bitumen roofing membranes", "EPDM roofing membranes", "TPO roofing membranes",
      "PVC roofing membranes", "Roof insulation boards", "Roof underlay membranes",
      "Roof waterproofing membranes", "Roof drainage systems", "Rain gutters", "Downpipes",
      "Roof flashings", "Skylights", "Roof windows", "Roof vents", "Roof access hatches",
    ],
  },
  {
    slug: "facade-exterior-cladding",
    title: "Facade / Exterior Cladding Materials",
    shortTitle: "Facade & cladding",
    description:
      "Ventilated facade systems, ACP panels, natural stone cladding, and exterior insulation systems.",
    exportPriority: "high",
    products: [
      "Facade cladding systems", "Ventilated facade systems", "Ceramic facade panels",
      "Terracotta facade panels", "Porcelain facade panels", "Natural stone cladding", "Marble cladding",
      "Granite cladding", "Travertine cladding", "Limestone cladding", "Aluminum composite panels",
      "ACP panels", "HPL facade panels", "Compact laminate panels", "Fiber cement facade boards",
      "Glass fiber reinforced concrete panels", "GRC panels", "Metal facade panels",
      "Aluminum facade panels", "Zinc facade panels", "Copper facade panels", "Stainless steel cladding",
      "Expanded metal mesh", "Perforated metal panels", "Wooden facade cladding", "WPC wall cladding",
      "External wall insulation systems", "EIFS systems", "ETICS systems", "Facade substructure systems",
      "Aluminum profiles", "Galvanized steel profiles", "Facade brackets", "Facade clips",
      "Ceramic fixing clips", "Stone fixing anchors", "Facade screws", "Facade membranes",
      "Wind barriers", "Vapor barriers", "Louvers", "Sun shading systems", "Aluminum sun breakers",
      "Brise soleil systems",
    ],
  },
  {
    slug: "windows-glazing-curtain-wall",
    title: "Windows / Glazing / Curtain Wall Systems",
    shortTitle: "Windows & glazing",
    description:
      "Aluminum and PVC windows, insulated glass units, curtain wall systems, and glazing hardware.",
    exportPriority: "high",
    products: [
      "Aluminum windows", "PVC windows", "Wooden windows", "Thermal break aluminum windows",
      "Sliding windows", "Casement windows", "Tilt and turn windows", "Double glazed units",
      "Triple glazed units", "Insulated glass units", "Low-E glass", "Tempered glass", "Laminated glass",
      "Reflective glass", "Solar control glass", "Fire rated glass", "Acoustic glass", "Curtain wall systems",
      "Stick curtain wall systems", "Unitized curtain wall systems", "Structural glazing systems",
      "Spider glazing systems", "Glass railings", "Glass canopies", "Window hardware", "Window handles",
      "Window hinges", "EPDM gaskets", "Silicone sealants",
    ],
  },
  {
    slug: "exterior-doors-entrance",
    title: "Exterior Doors / Entrance Systems",
    shortTitle: "Exterior doors",
    description:
      "Steel, fire-rated, and automatic entrance doors for commercial, industrial, and residential projects.",
    exportPriority: "high",
    products: [
      "Steel doors", "Security doors", "Fire rated doors", "Aluminum doors", "Glass doors",
      "Automatic sliding doors", "Revolving doors", "Garage doors", "Sectional doors", "Industrial doors",
      "Roller shutter doors", "Hangar doors", "Door frames", "Door handles", "Door locks", "Door closers",
      "Panic bars", "Access control door hardware",
    ],
  },
  {
    slug: "waterproofing-materials",
    title: "Waterproofing Materials",
    shortTitle: "Waterproofing",
    description:
      "Bituminous, liquid, and cementitious waterproofing systems for basements, terraces, and pools.",
    exportPriority: "high",
    products: [
      "Bituminous membranes", "APP membranes", "SBS membranes", "Liquid waterproofing membranes",
      "Polyurethane waterproofing", "Cementitious waterproofing", "Acrylic waterproofing",
      "EPDM membranes", "PVC membranes", "TPO membranes", "Bentonite waterproofing membranes",
      "Crystalline waterproofing", "Basement waterproofing systems", "Terrace waterproofing systems",
      "Bathroom waterproofing systems", "Roof waterproofing systems", "Pool waterproofing materials",
      "Waterstops", "PVC waterstops", "Swellable waterstops", "Drainage membranes", "Protective boards",
      "Waterproofing primers", "Sealants", "Joint sealants",
    ],
  },
  {
    slug: "thermal-acoustic-fire-insulation",
    title: "Thermal / Acoustic / Fire Insulation Materials",
    shortTitle: "Insulation",
    description:
      "EPS, XPS, rock wool, and firestop materials for energy efficiency and fire safety compliance.",
    exportPriority: "high",
    products: [
      "Thermal insulation boards", "EPS insulation boards", "XPS insulation boards", "Rock wool insulation",
      "Glass wool insulation", "Mineral wool insulation", "Polyurethane insulation boards",
      "PIR insulation boards", "Phenolic insulation boards", "Acoustic insulation panels",
      "Soundproofing membranes", "Acoustic foam panels", "Fire insulation boards", "Firestop materials",
      "Firestop sealants", "Firestop collars", "Fire blankets", "Intumescent sealants",
      "Intumescent coatings", "Pipe insulation", "HVAC duct insulation",
    ],
  },
  {
    slug: "flooring-materials",
    title: "Flooring Materials",
    shortTitle: "Flooring",
    description:
      "Ceramic, porcelain, natural stone, vinyl, epoxy, and outdoor paving materials.",
    exportPriority: "high",
    products: [
      "Ceramic floor tiles", "Porcelain floor tiles", "Marble flooring", "Granite flooring",
      "Travertine flooring", "Natural stone flooring", "Terrazzo tiles", "Mosaic tiles", "Vinyl flooring",
      "LVT flooring", "SPC flooring", "Laminate flooring", "Engineered wood flooring",
      "Solid wood flooring", "Parquet flooring", "Carpet tiles", "Broadloom carpets", "Rubber flooring",
      "Epoxy flooring", "Polyurethane flooring", "Self-leveling flooring", "Raised access flooring",
      "Outdoor decking", "WPC decking", "Composite decking", "Paving stones", "Concrete pavers",
      "Tactile paving tiles", "Skirting boards", "Floor profiles", "Tile trims", "Expansion joint profiles",
    ],
  },
  {
    slug: "wall-finishing-interior-cladding",
    title: "Wall Finishing / Interior Cladding Materials",
    shortTitle: "Wall finishes",
    description:
      "Wall tiles, decorative panels, wallpaper, and interior stone veneer for fit-out projects.",
    exportPriority: "high",
    products: [
      "Ceramic wall tiles", "Porcelain wall tiles", "Marble wall cladding", "Granite wall cladding",
      "Travertine wall cladding", "Mosaic tiles", "Decorative wall panels", "MDF wall panels",
      "Wooden wall panels", "WPC wall panels", "PVC wall panels", "Acoustic wall panels",
      "Fabric wall panels", "3D wall panels", "Wallpaper", "Vinyl wallpaper", "Wall coverings",
      "Decorative plaster", "Microcement", "Interior stone veneer", "Brick slips", "Tile adhesive",
      "Tile grout", "Silicone sealants",
    ],
  },
  {
    slug: "ceiling-systems",
    title: "Ceiling Systems",
    shortTitle: "Ceilings",
    description:
      "Suspended, acoustic, and metal ceiling systems for offices, hotels, and commercial buildings.",
    exportPriority: "medium",
    products: [
      "Gypsum board ceilings", "Suspended ceiling systems", "Acoustic ceilings", "Mineral fiber ceiling tiles",
      "Metal ceiling systems", "Aluminum ceiling panels", "Clip-in ceiling tiles", "Lay-in ceiling tiles",
      "Open cell ceilings", "Baffle ceilings", "Stretch ceilings", "Wooden ceilings",
      "Ceiling suspension profiles", "Ceiling grids", "Access panels", "Ceiling insulation",
      "Ceiling light panels",
    ],
  },
  {
    slug: "paints-coatings-finishes",
    title: "Paints / Coatings / Surface Finishes",
    shortTitle: "Paints & coatings",
    description:
      "Interior and exterior paints, epoxy coatings, and decorative plasters for project finishing.",
    exportPriority: "high",
    products: [
      "Interior paints", "Exterior paints", "Acrylic paints", "Silicone-based paints", "Elastomeric paints",
      "Textured paints", "Decorative paints", "Primer paints", "Anti-mold paints", "Fire retardant paints",
      "Epoxy coatings", "Polyurethane coatings", "Industrial floor coatings", "Anti-corrosion coatings",
      "Waterproof coatings", "Concrete sealers", "Wood stains", "Wood varnishes", "Metal primers",
      "Facade coatings", "Decorative plasters", "Cement-based plasters", "Ready-mix plasters",
    ],
  },
  {
    slug: "doors-interior-joinery-hardware",
    title: "Doors / Interior Joinery / Hardware",
    shortTitle: "Interior joinery",
    description:
      "Interior doors, wardrobes, cabinet hardware, and architectural joinery for residential and hotel projects.",
    exportPriority: "medium",
    products: [
      "Interior doors", "Wooden doors", "MDF doors", "Laminated doors", "Veneer doors", "Flush doors",
      "Panel doors", "Sliding doors", "Pocket doors", "Fire rated interior doors", "Acoustic doors",
      "Door frames", "Door architraves", "Door handles", "Door locks", "Hinges", "Door stoppers",
      "Door closers", "Panic exit devices", "Cabinet hardware", "Furniture fittings", "Wardrobe systems",
      "Built-in cabinets", "Skirting boards", "Wall base profiles",
    ],
  },
  {
    slug: "stairs-railings-balustrades",
    title: "Stairs / Railings / Balustrades",
    shortTitle: "Stairs & railings",
    description:
      "Steel, aluminum, glass railings and stair systems for commercial and residential projects.",
    exportPriority: "medium",
    products: [
      "Stair systems", "Steel stairs", "Wooden stairs", "Concrete stair finishes", "Marble stair treads",
      "Granite stair treads", "Stair nosing profiles", "Handrails", "Aluminum railings",
      "Stainless steel railings", "Glass railings", "Balcony railings", "Balustrade systems", "Guardrails",
      "Metal railings", "Wrought iron railings",
    ],
  },
  {
    slug: "bathroom-sanitaryware",
    title: "Bathroom / Sanitaryware Materials",
    shortTitle: "Bathroom & sanitary",
    description:
      "Sanitaryware, faucets, shower enclosures, and bathroom accessories for hotel and residential fit-out.",
    exportPriority: "high",
    products: [
      "Sanitaryware", "Toilets", "Wall-hung toilets", "Washbasins", "Countertop basins", "Pedestal basins",
      "Urinals", "Bidets", "Shower trays", "Shower enclosures", "Bathtubs", "Bathroom cabinets",
      "Bathroom vanities", "Mirrors", "Faucets", "Basin mixers", "Shower mixers", "Thermostatic mixers",
      "Shower heads", "Hand showers", "Concealed cisterns", "Flush plates", "Floor drains", "Linear drains",
      "Bathroom accessories", "Towel radiators", "Toilet partitions", "Compact laminate toilet cubicles",
    ],
  },
  {
    slug: "kitchen-materials",
    title: "Kitchen Materials",
    shortTitle: "Kitchen",
    description:
      "Modular kitchen systems, countertops, sinks, and cabinet hardware for project procurement.",
    exportPriority: "high",
    products: [
      "Kitchen cabinets", "Modular kitchen systems", "Kitchen countertops", "Quartz countertops",
      "Granite countertops", "Marble countertops", "Solid surface countertops", "Ceramic countertops",
      "Kitchen sinks", "Stainless steel sinks", "Kitchen faucets", "Backsplash tiles", "Kitchen wall tiles",
      "Cabinet doors", "Cabinet handles", "Drawer systems", "Hinges", "Soft-close mechanisms",
      "Kitchen accessories", "Built-in appliance panels",
    ],
  },
  {
    slug: "plumbing-water-drainage",
    title: "Plumbing / Water Supply / Drainage Materials",
    shortTitle: "Plumbing",
    description:
      "PPR, PVC, HDPE pipes, valves, pumps, and drainage systems for MEP project supply.",
    exportPriority: "high",
    products: [
      "PPR pipes", "PVC pipes", "CPVC pipes", "HDPE pipes", "PEX pipes", "Multilayer pipes", "Steel pipes",
      "Galvanized pipes", "Copper pipes", "Pipe fittings", "Elbows", "Tees", "Couplings", "Flanges",
      "Valves", "Ball valves", "Gate valves", "Check valves", "Pressure reducing valves", "Flexible hoses",
      "Water meters", "Pumps", "Booster pumps", "Expansion tanks", "Water tanks", "Drainage pipes",
      "Sewer pipes", "Manhole covers", "Floor drains", "Roof drains", "Rainwater drainage systems",
    ],
  },
  {
    slug: "hvac-mechanical",
    title: "HVAC / Mechanical Materials",
    shortTitle: "HVAC",
    description:
      "Air conditioning, ventilation, ductwork, and mechanical systems for commercial building projects.",
    exportPriority: "medium",
    products: [
      "HVAC systems", "Air conditioning units", "VRF systems", "Split air conditioners", "Fan coil units",
      "Air handling units", "Ventilation fans", "Exhaust fans", "Ductwork", "Galvanized air ducts",
      "Flexible ducts", "Duct fittings", "Air diffusers", "Grilles", "Louvers", "Dampers", "Fire dampers",
      "Volume control dampers", "Chillers", "Boilers", "Heat pumps", "Radiators", "Underfloor heating systems",
      "Thermostats", "Pipe insulation", "Duct insulation", "Mechanical valves", "Balancing valves",
    ],
  },
  {
    slug: "fire-protection",
    title: "Fire Protection Materials",
    shortTitle: "Fire protection",
    description:
      "Sprinkler systems, fire alarms, extinguishers, and fire-rated components for code compliance.",
    exportPriority: "medium",
    products: [
      "Fire sprinkler systems", "Sprinkler heads", "Fire hoses", "Fire hose cabinets", "Fire extinguishers",
      "Fire hydrants", "Fire pumps", "Fire alarm systems", "Smoke detectors", "Heat detectors",
      "Manual call points", "Fire rated doors", "Fire dampers", "Firestop sealants", "Firestop collars",
      "Intumescent materials", "Emergency lighting", "Exit signs",
    ],
  },
  {
    slug: "electrical-materials",
    title: "Electrical Materials",
    shortTitle: "Electrical",
    description:
      "Cables, panels, conduits, and earthing materials for building electrical installations.",
    exportPriority: "high",
    products: [
      "Electrical cables", "Power cables", "Low voltage cables", "Medium voltage cables",
      "Fire resistant cables", "Data cables", "Cable trays", "Cable ladders", "Cable trunking", "Conduits",
      "PVC conduits", "Steel conduits", "Junction boxes", "Switches", "Sockets", "Circuit breakers",
      "Distribution boards", "Electrical panels", "Busbar systems", "Earthing materials",
      "Lightning protection systems", "Transformers", "Generators", "UPS systems", "Solar cables",
      "Cable glands", "Cable lugs",
    ],
  },
  {
    slug: "lighting-materials",
    title: "Lighting Materials",
    shortTitle: "Lighting",
    description:
      "LED fixtures, outdoor lighting, and control systems for commercial and infrastructure projects.",
    exportPriority: "high",
    products: [
      "LED lighting fixtures", "Indoor lighting", "Outdoor lighting", "Downlights", "Spotlights",
      "Linear lights", "Track lights", "Pendant lights", "Wall lights", "Ceiling lights", "Floodlights",
      "Street lighting poles", "Garden lights", "Facade lighting", "Emergency lighting", "Exit signs",
      "LED strips", "Lighting control systems", "Motion sensors", "Dimmers",
    ],
  },
  {
    slug: "smart-building-security",
    title: "Smart Building / Low Current / Security Systems",
    shortTitle: "Smart building",
    description:
      "CCTV, access control, BMS, and low-current systems for commercial and hospitality projects.",
    exportPriority: "medium",
    products: [
      "CCTV systems", "Security cameras", "IP cameras", "Access control systems", "Card readers",
      "Turnstiles", "Intercom systems", "Video intercom systems", "Building management systems",
      "BMS systems", "KNX systems", "Smart home systems", "Data racks", "Server cabinets", "Patch panels",
      "Fiber optic cables", "Network cables", "Wi-Fi access points", "Public address systems",
      "Audio systems", "Parking management systems", "Barrier systems",
    ],
  },
  {
    slug: "exterior-landscaping",
    title: "Exterior Works / Landscaping Materials",
    shortTitle: "Landscaping",
    description:
      "Pavers, decking, fencing, and landscape materials for outdoor and public realm projects.",
    exportPriority: "medium",
    products: [
      "Paving stones", "Concrete pavers", "Granite pavers", "Basalt pavers", "Curbstones", "Kerbstones",
      "Outdoor tiles", "Porcelain outdoor tiles", "Decking materials", "WPC decking", "Garden edging",
      "Landscape stones", "Decorative gravel", "Artificial grass", "Natural grass systems",
      "Irrigation systems", "Drainage channels", "Linear drainage systems", "Manhole covers", "Tree grates",
      "Bollards", "Outdoor benches", "Pergolas", "Canopies", "Fencing systems", "Wire mesh fences",
      "Metal fences", "Garden gates", "Playground flooring", "Rubber flooring", "Sports flooring",
    ],
  },
  {
    slug: "road-parking-infrastructure",
    title: "Road / Parking / Infrastructure Materials",
    shortTitle: "Infrastructure",
    description:
      "Road marking, drainage, geotextiles, and infrastructure materials for civil works projects.",
    exportPriority: "medium",
    products: [
      "Asphalt materials", "Road marking paints", "Traffic signs", "Speed bumps", "Wheel stops",
      "Parking barriers", "Guardrails", "Drainage channels", "Gratings", "Manhole covers", "Trench covers",
      "Geotextiles", "Geogrids", "Retaining wall blocks", "Gabion baskets", "Stormwater pipes",
      "Sewer pipes", "HDPE drainage pipes", "Culverts",
    ],
  },
  {
    slug: "adhesives-sealants-fixing",
    title: "Adhesives / Sealants / Fixing Materials",
    shortTitle: "Adhesives & fixing",
    description:
      "Tile adhesives, sealants, anchors, and fasteners for construction installation works.",
    exportPriority: "high",
    products: [
      "Tile adhesives", "Ceramic adhesives", "Porcelain tile adhesives", "Stone adhesives", "Marble adhesives",
      "Epoxy adhesives", "Polyurethane adhesives", "Construction adhesives", "Silicone sealants",
      "Acrylic sealants", "Polyurethane sealants", "Fire rated sealants", "Expansion joint sealants",
      "Chemical anchors", "Mechanical anchors", "Screws", "Bolts", "Nuts", "Washers", "Wall plugs",
      "Fasteners", "Clamps", "Brackets", "Fixing clips", "Mounting systems",
    ],
  },
  {
    slug: "construction-chemicals",
    title: "Construction Chemicals",
    shortTitle: "Construction chemicals",
    description:
      "Admixtures, grouts, repair mortars, and surface treatments for concrete and finishing works.",
    exportPriority: "high",
    products: [
      "Concrete admixtures", "Plasticizers", "Superplasticizers", "Accelerators", "Retarders",
      "Air entraining agents", "Curing compounds", "Concrete hardeners", "Surface hardeners",
      "Floor hardeners", "Repair mortars", "Grouts", "Epoxy grouts", "Tile grouts",
      "Waterproofing chemicals", "Primers", "Bonding agents", "Rust removers", "Anti-corrosion products",
      "Mold release agents", "Self-leveling compounds", "Screed additives",
    ],
  },
  {
    slug: "prefabricated-modular",
    title: "Prefabricated / Modular Building Materials",
    shortTitle: "Prefabricated",
    description:
      "Modular buildings, sandwich panels, and prefab units for fast-track construction projects.",
    exportPriority: "high",
    products: [
      "Prefabricated buildings", "Modular buildings", "Container houses", "Steel structure buildings",
      "Light gauge steel framing", "Sandwich panels", "Prefab wall panels", "Prefab roof panels",
      "Modular bathroom units", "Modular kitchen units", "Portable cabins", "Site office containers",
      "Worker accommodation units", "Cold room panels", "Clean room panels",
    ],
  },
  {
    slug: "industrial-warehouse",
    title: "Industrial / Warehouse Project Materials",
    shortTitle: "Industrial",
    description:
      "Sandwich panels, industrial doors, dock equipment, and warehouse systems for logistics facilities.",
    exportPriority: "medium",
    products: [
      "Sandwich wall panels", "Sandwich roof panels", "Steel structure systems", "Industrial doors",
      "Sectional doors", "Loading dock systems", "Dock levelers", "Dock shelters", "Epoxy flooring",
      "Floor hardeners", "Fire doors", "Smoke ventilation systems", "Roof skylights",
      "Industrial ventilation systems", "Cable trays", "High bay lighting", "Warehouse racking systems",
      "Safety barriers",
    ],
  },
  {
    slug: "hotel-residential-commercial",
    title: "Hotel / Residential / Commercial Project Materials",
    shortTitle: "Fit-out projects",
    description:
      "Bundled fit-out materials for hotel, residential, and commercial development procurement.",
    exportPriority: "high",
    products: [
      "Hotel room doors", "Acoustic doors", "Bathroom accessories", "Vanity units", "Ceramic tiles",
      "Porcelain tiles", "Marble flooring", "Carpet tiles", "Wall coverings", "Decorative panels",
      "Suspended ceilings", "Lighting fixtures", "Wardrobes", "Kitchen cabinets", "Balcony railings",
      "Shower enclosures", "Sanitaryware", "Faucets", "Door hardware", "Smart locks", "Access control systems",
    ],
  },
];

export const PROCUREMENT_KEYWORDS = [
  "Construction materials supplier",
  "Building materials supplier",
  "Construction materials exporter",
  "Building materials manufacturer",
  "Project materials supplier",
  "Construction procurement",
  "Building materials for projects",
  "Turnkey construction material supply",
  "BOQ supply",
  "Bill of Quantities supply",
  "RFQ construction materials",
  "Tender construction materials",
  "Project-based material supply",
  "Wholesale building materials",
  "Bulk construction materials",
  "Construction materials from Turkey",
  "Turkish building materials supplier",
  "Facade materials supplier",
  "Interior finishing materials supplier",
  "Exterior cladding supplier",
  "MEP materials supplier",
  "Hotel project materials supplier",
  "Residential project materials supplier",
  "Commercial project materials supplier",
  "Infrastructure materials supplier",
];

export const PRIORITY_EXPORT_PRODUCTS: PriorityExportProduct[] = [
  { name: "Ceramic tiles", categorySlug: "flooring-materials", geoPageSlug: "ceramic-tiles-turkiye" },
  { name: "Porcelain tiles", categorySlug: "flooring-materials" },
  { name: "Marble and natural stone", categorySlug: "flooring-materials", geoPageSlug: "marble-natural-stone-turkiye" },
  { name: "Sanitaryware", categorySlug: "bathroom-sanitaryware" },
  { name: "Faucets and bathroom accessories", categorySlug: "bathroom-sanitaryware" },
  { name: "Aluminum windows and doors", categorySlug: "windows-glazing-curtain-wall", geoPageSlug: "aluminum-windows-doors-turkiye" },
  { name: "Curtain wall systems", categorySlug: "windows-glazing-curtain-wall" },
  { name: "Facade cladding systems", categorySlug: "facade-exterior-cladding", geoPageSlug: "facade-cladding-turkiye" },
  { name: "Ventilated facade systems", categorySlug: "facade-exterior-cladding" },
  { name: "Fiber cement boards", categorySlug: "masonry-wall-construction" },
  { name: "Aluminum composite panels", categorySlug: "facade-exterior-cladding" },
  { name: "Steel doors", categorySlug: "exterior-doors-entrance" },
  { name: "Fire rated doors", categorySlug: "exterior-doors-entrance" },
  { name: "Interior doors", categorySlug: "doors-interior-joinery-hardware" },
  { name: "Kitchen cabinets", categorySlug: "kitchen-materials" },
  { name: "Bathroom vanities", categorySlug: "bathroom-sanitaryware" },
  { name: "Lighting fixtures", categorySlug: "lighting-materials" },
  { name: "Electrical cables", categorySlug: "electrical-materials" },
  { name: "Cable trays", categorySlug: "electrical-materials" },
  { name: "PPR / PVC / HDPE pipes", categorySlug: "plumbing-water-drainage" },
  { name: "Valves and fittings", categorySlug: "plumbing-water-drainage" },
  { name: "Sandwich panels", categorySlug: "prefabricated-modular" },
  { name: "Roofing membranes", categorySlug: "roofing-materials" },
  { name: "Waterproofing materials", categorySlug: "waterproofing-materials" },
  { name: "Insulation materials", categorySlug: "thermal-acoustic-fire-insulation", geoPageSlug: "insulation-materials-turkiye" },
  { name: "Paints and coatings", categorySlug: "paints-coatings-finishes" },
  { name: "Construction chemicals", categorySlug: "construction-chemicals" },
  { name: "Paving stones", categorySlug: "exterior-landscaping" },
  { name: "WPC decking", categorySlug: "exterior-landscaping" },
  { name: "Railings and balustrades", categorySlug: "stairs-railings-balustrades" },
];

export const HOMEPAGE_PRODUCT_GROUPS: HomepageProductGroup[] = [
  {
    title: "Structure & civil works",
    description: "Cement, steel, aggregates, precast concrete, and foundation materials.",
    categorySlugs: ["structural-civil-works", "masonry-wall-construction", "prefabricated-modular"],
  },
  {
    title: "Roofing & facade",
    description: "Roof membranes, cladding, ACP panels, and ventilated facade systems.",
    categorySlugs: ["roofing-materials", "facade-exterior-cladding"],
  },
  {
    title: "Windows, doors & glass",
    description: "Aluminum windows, curtain walls, entrance doors, and glazing systems.",
    categorySlugs: ["windows-glazing-curtain-wall", "exterior-doors-entrance"],
  },
  {
    title: "Floors, walls & ceilings",
    description: "Tiles, stone, wall panels, suspended ceilings, and interior finishes.",
    categorySlugs: ["flooring-materials", "wall-finishing-interior-cladding", "ceiling-systems"],
  },
  {
    title: "Insulation & waterproofing",
    description: "Thermal, acoustic, fire insulation, and waterproofing membranes.",
    categorySlugs: ["waterproofing-materials", "thermal-acoustic-fire-insulation"],
  },
  {
    title: "Paints & coatings",
    description: "Interior and exterior paints, epoxy coatings, and decorative plasters.",
    categorySlugs: ["paints-coatings-finishes"],
  },
  {
    title: "Bathrooms & kitchens",
    description: "Sanitaryware, faucets, vanities, and modular kitchen systems.",
    categorySlugs: ["bathroom-sanitaryware", "kitchen-materials"],
  },
  {
    title: "MEP systems",
    description: "Plumbing, HVAC, electrical, lighting, and fire protection materials.",
    categorySlugs: [
      "plumbing-water-drainage",
      "hvac-mechanical",
      "electrical-materials",
      "lighting-materials",
      "fire-protection",
    ],
  },
  {
    title: "Adhesives & chemicals",
    description: "Tile adhesives, sealants, anchors, admixtures, and grouts.",
    categorySlugs: ["adhesives-sealants-fixing", "construction-chemicals"],
  },
  {
    title: "Infrastructure & fit-out",
    description: "Landscaping, road works, industrial warehouses, and hotel fit-out packages.",
    categorySlugs: [
      "exterior-landscaping",
      "road-parking-infrastructure",
      "industrial-warehouse",
      "hotel-residential-commercial",
      "smart-building-security",
      "doors-interior-joinery-hardware",
      "stairs-railings-balustrades",
    ],
  },
];

/** RFQ parser patterns — most specific first */
export const RFQ_PRODUCT_PATTERNS: RfqProductPattern[] = [
  { pattern: /\bcem\s*i?\s*42\.?5\s*r\b/i, product: "Portland Cement CEM I 42.5R", category: "Structure & civil works" },
  { pattern: /\b(portland\s+)?cement|çimento\b/i, product: "Portland Cement", category: "Structure & civil works" },
  { pattern: /\bready[\s-]?mix|beton\b/i, product: "Ready-Mix Concrete", category: "Structure & civil works" },
  { pattern: /\brebar|reinforcing\s+bar|inşaat\s+demiri|nervürlü\s+demir|deformed\s+bar\b/i, product: "Reinforcing Steel (Rebar)", category: "Structure & civil works" },
  { pattern: /\bstructural\s+steel|çelik\s+konstrüksiyon\b/i, product: "Structural Steel", category: "Structure & civil works" },
  { pattern: /\bsandwich\s+panel/i, product: "Sandwich Panels", category: "Prefabricated" },
  { pattern: /\bppr\s+pipe|ppr\s+boru/i, product: "PPR Pipes", category: "MEP systems" },
  { pattern: /\b(hdpe|pvc)\s+pipe|hdpe\s+boru|pvc\s+boru/i, product: "HDPE / PVC Pipes", category: "MEP systems" },
  { pattern: /\bcable\s+tray/i, product: "Cable Trays", category: "MEP systems" },
  { pattern: /\belectrical\s+cable|power\s+cable|enerji\s+kablosu/i, product: "Electrical Cables", category: "MEP systems" },
  { pattern: /\bled\s+(light|fixture|armatur)|lighting\s+fixture/i, product: "LED Lighting Fixtures", category: "MEP systems" },
  { pattern: /\bsanitaryware|vitrifiye|toilet\s+bowl|lavabo\b/i, product: "Sanitaryware", category: "Bathrooms & kitchens" },
  { pattern: /\bfaucet|mixer\s+tap|armatür|musluk\b/i, product: "Faucets & Bathroom Accessories", category: "Bathrooms & kitchens" },
  { pattern: /\bbathroom\s+vanity|vanity\s+unit/i, product: "Bathroom Vanities", category: "Bathrooms & kitchens" },
  { pattern: /\bkitchen\s+cabinet|modular\s+kitchen|mutfak\s+dolab/i, product: "Kitchen Cabinets", category: "Bathrooms & kitchens" },
  { pattern: /\bporcelain\s+tile|porselen\s+kar[oö]/i, product: "Porcelain Tiles", category: "Floors, walls & ceilings" },
  { pattern: /\bmarble|mermer|granite|granit|travertine|traverten|limestone|kireçtaşı|natural\s+stone|doğal\s+taş\b/i, product: "Marble & Natural Stone", category: "Floors, walls & ceilings" },
  { pattern: /\bceramic\s+tile|ceramic\s+floor|fayans|seramik\b/i, product: "Ceramic Tiles", category: "Floors, walls & ceilings" },
  { pattern: /\bporcelain\b/i, product: "Porcelain Tiles", category: "Floors, walls & ceilings" },
  { pattern: /\b(aluminum|aluminium|alüminyum)\s*composite|acp\s+panel|kompozit\s+panel\b/i, product: "Aluminum Composite Panels (ACP)", category: "Roofing & facade" },
  { pattern: /\bventilated\s+facade|rainscreen\b/i, product: "Ventilated Facade Systems", category: "Roofing & facade" },
  { pattern: /\bfiber\s+cement|fibre\s+cement\b/i, product: "Fiber Cement Boards", category: "Roofing & facade" },
  { pattern: /\b(aluminum|aluminium|alüminyum)\s*(window|door|pencere|kapı)s?|window\s+system|door\s+system|sürme\s+kapı\b/i, product: "Aluminum Windows & Doors", category: "Windows, doors & glass" },
  { pattern: /\bcurtain\s*wall|structural\s+glazing|cam\s+cephe\b/i, product: "Curtain Wall Systems", category: "Windows, doors & glass" },
  { pattern: /\bsteel\s+door|security\s+door|çelik\s+kapı\b/i, product: "Steel Doors", category: "Windows, doors & glass" },
  { pattern: /\bfire\s+rated\s+door|fire\s+door|yangın\s+kapısı\b/i, product: "Fire Rated Doors", category: "Windows, doors & glass" },
  { pattern: /\binterior\s+door|iç\s+kapı|mdf\s+door\b/i, product: "Interior Doors", category: "Infrastructure & fit-out" },
  { pattern: /\bfloat\s+glass|laminated\s+glass|tempered\s+glass|insulated\s+glass|double\s+glazing\b/i, product: "Glass & Glazing", category: "Windows, doors & glass" },
  { pattern: /\bfacade|façade|cladding|cephe\s*kaplama|metal\s+facade\b/i, product: "Facade Cladding Systems", category: "Roofing & facade" },
  { pattern: /\b(epdm|tpo|pvc)\s+membrane|roofing\s+membrane|çatı\s+membran/i, product: "Roofing Membranes", category: "Roofing & facade" },
  { pattern: /\binsulation|yalıtım|mineral\s+wool|cam\s+yünü|eps|xps|rockwool|pir\s+board\b/i, product: "Insulation Materials", category: "Insulation & waterproofing" },
  { pattern: /\bwaterproof|su\s+yalıtım|bitumen\s+membrane|sbs\s+membrane|app\s+membrane\b/i, product: "Waterproofing Materials", category: "Insulation & waterproofing" },
  { pattern: /\b(epoxy|polyurethane)\s+(floor\s+)?coat|industrial\s+paint|exterior\s+paint|iç\s+cephe\s+boya|dış\s+cephe\s+boya\b/i, product: "Paints & Coatings", category: "Paints & coatings" },
  { pattern: /\bpaving\s+stone|concrete\s+paver|kilit\s+taş|bordür\b/i, product: "Paving Stones", category: "Infrastructure & fit-out" },
  { pattern: /\bwpc\s+deck|composite\s+deck/i, product: "WPC Decking", category: "Infrastructure & fit-out" },
  { pattern: /\b(glass|stainless\s+steel|aluminum)\s+railing|balustrade|korkuluk\b/i, product: "Railings & Balustrades", category: "Infrastructure & fit-out" },
  { pattern: /\bvalve|fitting|vana|fitting\b/i, product: "Valves & Fittings", category: "MEP systems" },
  { pattern: /\btile\s+adhesive|ceramic\s+adhesive|yapıştırıcı\b/i, product: "Tile Adhesives", category: "Adhesives & chemicals" },
  { pattern: /\badhesive|sealant|silikon|construction\s+chemical|katkı\s+maddesi|admixture\b/i, product: "Construction Chemicals", category: "Adhesives & chemicals" },
  { pattern: /\bgypsum|drywall|alcı\s*pan|plasterboard\b/i, product: "Gypsum & Drywall", category: "Floors, walls & ceilings" },
  { pattern: /\b(aluminum|aluminium|alüminyum)\s*profile|alüminyum\s*profil\b/i, product: "Aluminum Profiles", category: "Roofing & facade" },
  { pattern: /\bsteel|demir|çelik|iron\b/i, product: "Steel", category: "Structure & civil works" },
  { pattern: /\bconstruction\s+material|inşaat\s+malzemesi|building\s+material|yapı\s+malzemesi\b/i, product: "Construction Materials", category: "General" },
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return PRODUCT_CATEGORIES.map((c) => c.slug);
}

export function getCategoryUrl(slug: string): string {
  return `/products/category/${slug}`;
}

export function getHighPriorityCategories(): ProductCategory[] {
  return PRODUCT_CATEGORIES.filter((c) => c.exportPriority === "high");
}
