export const portfolioCategories = [
  "All",
  "Web",
  "Mobile",
  "Desktop",
  "SaaS",
  "AI",
  "E-commerce"
];

export const portfolioProjects = [
  {
    slug: "enterprise-workflow-saas",
    name: "OmniFlow SaaS Platform",
    category: "SaaS",
    shortDescription: "A multi-tenant workflow automation and team management platform built with Next.js and PostgreSQL.",
    image: "/portfolio/omniflow.svg",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker"],
    overview: "OmniFlow is a cloud-based workflow platform built to help medium-sized teams automate business processes, manage task approvals, and track cross-department project timelines in real time.",
    challenge: "The client needed to replace fragmented manual email approvals and spreadsheet trackers with a unified SaaS platform featuring role-based authorization, custom workflow builders, and automated email notifications.",
    solution: "RB-Tech designed and developed a secure multi-tenant architecture using Next.js for the responsive frontend and Node.js with PostgreSQL for data management. We implemented Stripe subscription billing and role-based permissions.",
    features: [
      "Custom drag-and-drop workflow builder",
      "Role-based access control (Admin, Manager, Member)",
      "Automated email & webhook triggers",
      "Real-time team activity feed",
      "Stripe subscription tiers & usage tracking"
    ],
    architecture: "Next.js App Router frontend communicating with Node.js REST APIs and a partitioned PostgreSQL database running on containerized Docker instances on AWS.",
    development: "Developed across 12 two-week sprint cycles, including automated unit testing, end-to-end integration tests, and staging review environments for client feedback.",
    results: [
      "Sub-second page loading speeds across web dashboard routes",
      "Centralized task tracking replacing 3 separate legacy tools",
      "100% automated subscription billing and invoice generation",
      "Multi-tenant data isolation ensuring enterprise compliance"
    ]
  },
  {
    slug: "ai-document-analyzer",
    name: "DocuMind AI Assistant",
    category: "AI",
    shortDescription: "An AI-powered document processing application using Retrieval-Augmented Generation (RAG) and FastAPI.",
    image: "/portfolio/documind.svg",
    technologies: ["Python", "FastAPI", "React", "OpenAI API", "PostgreSQL", "Tailwind CSS"],
    overview: "DocuMind is an intelligent document analysis product designed to digest large volumes of PDF manuals, reports, and contracts, enabling users to query internal documentation in natural language.",
    challenge: "Analyzing long-form technical PDF documentation manually required hours of employee research. The goal was to build a secure internal AI search tool without leaking sensitive corporate data.",
    solution: "RB-Tech built a custom RAG (Retrieval-Augmented Generation) pipeline using Python and FastAPI. The frontend allows users to upload documents, generate instant summaries, and ask vector-indexed questions.",
    features: [
      "Instant PDF and DOCX text extraction pipeline",
      "Vector embeddings & semantic vector search",
      "Natural language Q&A with citation highlights",
      "Custom prompt controls and export options",
      "Encrypted document storage with user permissions"
    ],
    architecture: "React single-page application communicating with a Python FastAPI backend. Text embeddings are processed asynchronously and queried via vector indexing.",
    development: "Built with a focus on data privacy, embedding encryption, and optimized vector retrieval latency.",
    results: [
      "Drastically reduced time required to extract key contract terms",
      "Instant search responses with accurate source section citations",
      "Secure cloud deployment with restricted internal API access"
    ]
  },
  {
    slug: "crossplatform-mobile-inventory",
    name: "FieldSync Mobile App",
    category: "Mobile",
    shortDescription: "An offline-first cross-platform mobile application for field inventory management built with React Native.",
    image: "/portfolio/fieldsync.svg",
    technologies: ["React Native", "TypeScript", "SQLite", "Node.js", "AWS S3"],
    overview: "FieldSync is an iOS and Android mobile app designed for field service technicians to log equipment inspections, scan barcodes, and sync inventory counts in low-connectivity environments.",
    challenge: "Field personnel frequently operate in areas without reliable cellular connectivity, resulting in lost inspection reports and sync conflicts when re-entering network coverage.",
    solution: "RB-Tech engineered an offline-first mobile app using React Native and an embedded SQLite database. Data changes are queued locally and automatically reconciled with the backend when connection is restored.",
    features: [
      "Offline-first data sync engine with conflict resolution",
      "Camera barcode scanning and photo upload",
      "GPS geotagging for inspection locations",
      "Push notification alerts for urgent field assignments",
      "Biometric login (TouchID / FaceID)"
    ],
    architecture: "React Native cross-platform application utilizing SQLite local storage, paired with a Node.js sync server hosted on AWS EC2.",
    development: "Iterative app store build process with continuous testing across Android and iOS devices.",
    results: [
      "Zero data loss during offline field operations",
      "Seamless background synchronization upon network reconnection",
      "Published and available on Apple App Store and Google Play"
    ]
  },
  {
    slug: "desktop-pos-system",
    name: "RetailPOS Desktop Application",
    category: "Desktop",
    shortDescription: "A fast offline-capable POS desktop application for Windows and macOS built using Electron and React.",
    image: "/portfolio/retailpos.svg",
    technologies: ["Electron", "React", "TypeScript", "SQLite", "Node.js"],
    overview: "RetailPOS is a desktop point-of-sale management tool designed for retail operations requiring hardware integration (receipt printers, barcode scanners, card terminals) and instant checkout performance.",
    challenge: "Cloud-only point-of-sale systems caused delays during internet outages. The retail business needed desktop software that ran locally without internet dependency while syncing store data periodically.",
    solution: "RB-Tech developed a desktop application using Electron and React. The app communicates directly with local receipt hardware over USB and serial ports while maintaining an embedded SQLite database.",
    features: [
      "Offline checkout processing and receipt printing",
      "Hardware scanner & thermal printer integration",
      "Local inventory management and barcode generation",
      "Multi-register synchronization over local LAN",
      "Cross-platform execution on Windows, macOS, and Linux"
    ],
    architecture: "Electron desktop wrapper enclosing a React SPA with an IPC channel communicating with native Node.js hardware drivers and SQLite database.",
    development: "Extensively tested with physical hardware controllers, USB receipt printers, and cash drawer triggers.",
    results: [
      "100% transaction continuity during internet service interruptions",
      "Sub-100ms checkout barcode processing speed",
      "Clean automated desktop updates deployed via GitHub Releases"
    ]
  },
  {
    slug: "modern-ecommerce-storefront",
    name: "Apex Storefront & Checkout",
    category: "E-commerce",
    shortDescription: "A headless e-commerce website with custom catalog search, shopping cart, and Stripe checkout integration.",
    image: "/portfolio/apexstore.svg",
    technologies: ["Next.js", "React", "Tailwind CSS", "Stripe", "PostgreSQL", "Node.js"],
    overview: "Apex Storefront is a high-performance e-commerce platform built for a direct-to-consumer catalog requiring dynamic product filters, fast image loading, and instant cart updates.",
    challenge: "The client's previous monolithic e-commerce store suffered from slow mobile page speeds, complex checkout steps, and low search conversion rates.",
    solution: "RB-Tech built a custom headless e-commerce store with Next.js, optimized images, instantaneous instant search, and a streamlined multi-step checkout powered by Stripe.",
    features: [
      "Lightning-fast product search & filter sidebar",
      "Responsive interactive image zoom & gallery",
      "Streamlined single-page checkout flow",
      "Customer account dashboard with order history",
      "Admin catalog & inventory manager"
    ],
    architecture: "Next.js frontend hosted on Vercel/AWS, utilizing Next/Image optimization and server-side rendering for catalog SEO, connected to Node.js e-commerce APIs.",
    development: "Built with mobile-first UI patterns, strict accessibility compliance, and optimized Core Web Vitals.",
    results: [
      "Achieved high performance lighthouse score on mobile catalog pages",
      "Instant page transitions and zero layout shifts during browsing",
      "Seamless multi-currency checkout handling via Stripe API"
    ]
  },
  {
    slug: "corporate-custom-web-platform",
    name: "GlobalLogistics Corporate Portal",
    category: "Web",
    shortDescription: "A modern corporate website and client portal for a freight and supply chain business built with Next.js.",
    image: "/portfolio/globallogistics.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    overview: "GlobalLogistics is a corporate web platform featuring a public marketing website paired with a client tracking portal for monitoring shipment statuses and requesting freight quotes.",
    challenge: "The existing company website was outdated, unoptimized for mobile devices, and lacked self-service shipment tracking tools for clients.",
    solution: "RB-Tech created a website and interactive tracking portal using Next.js and Tailwind CSS. Prospective clients can request custom quotes while existing customers log in to view shipment status.",
    features: [
      "SEO-optimized corporate service pages",
      "Real-time shipment status lookup tool",
      "Interactive freight quote calculator",
      "Multilingual UI support setup",
      "Accessible inquiry forms with instant email notifications"
    ],
    architecture: "Next.js App Router application with static generation for core service pages and server rendering for real-time shipment queries.",
    development: "Executed in collaboration with internal stakeholders to align content design with corporate branding.",
    results: [
      "Search visibility improvement across target logistics keyphrases",
      "Streamlined client inquiry processing with real-time web form leads",
      "Accessible design adhering strictly to WCAG 2.1 AA standards"
    ]
  }
];
