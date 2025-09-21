type Project = {
  id: string
  title: string
  tagline: string
  description: string
  long: string
  tech: string[]
  links?: { demo?: string; github?: string; video?: string; post?: string; postLabel?: string }
  image?: string
  images?: string[]
}


const PROJECTS: Project[] = [
  {
    id: 'aalim-ai',
    title: 'Aalim AI',
    tagline: 'AI-powered assistant answering Islamic questions',
    description: 'Answers questions, references tafseer/hadith, and gives structured guidance.',
    long:
      "Aalim AI is my attempt at blending modern NLP with traditional knowledge. It answers Islamic queries, fetches tafseer/hadith references, and delivers structured responses — like a digital scholar’s assistant. I built it to explore how AI can help Muslims navigate authentic resources without noise.",
    tech: ['React', 'Python', 'FastAPI','LangChain','ChromaDB', 'Tailwind', 'MongoDB'],
    links: { github: 'https://github.com/Musxeto/aalim-ai', video: 'https://lnkd.in/p/djRJyQET' },
    image: '/projects/aalim-ai/aalim-ai-home.png',
    images: [
      '/projects/aalim-ai/aalim-ai-home.png',
      '/projects/aalim-ai/aalim-ai-light.png',
      '/projects/aalim-ai/aalim-ai-signup.png',
    ],
  },
  {
    id: 'facial-attendance',
    title: 'Facial Attendance System',
    tagline: 'AI-driven attendance tracker using facial recognition',
    description: 'Recognizes faces in real-time and logs attendance with clean exports.',
    long:
      'This project replaces boring manual attendance with computer vision. Built with OpenCV and deep learning models, it recognizes students/employees in real-time, logs their presence, and exports clean attendance sheets. It was a mix of ML and practical software engineering — a step toward smarter classrooms/offices.',
    tech: ['Python', 'OpenCV', 'FastApi'],
    links: { github: 'https://github.com/Musxeto/salvo-facial-attendance', post: 'https://lnkd.in/p/dYprkvni', postLabel: '500+ likes' },
    image: '/projects/fras/me-side.jpeg',
    images: [
      '/projects/fras/me-side.jpeg',
      '/projects/fras/me-behind.jpeg',
      '/projects/fras/hassan-side.jpeg',
    ],
  },
  {
    id: 'arcadeos',
    title: 'ArcadeOS',
    tagline: 'A custom lightweight OS for retro gaming and fun CLI tools',
    description: 'Bootable OS environment for retro-style games and utilities.',
    long:
      'ArcadeOS started as a fun side quest: a custom os environment for retro-style games and utilities. Think of it as a nerdy playground — a mini OS where you can run games, play around with commands, and experience old-school computing vibes. It taught me a lot about system-level coding and custom builds.',
    tech: ['Assembly', 'Bash', 'Linux'],
    links: { github: 'https://github.com/Musxeto/ArcadeOS' },
    image: '/projects/arcadeos/arcadeos-home.png',
    images: [
      '/projects/arcadeos/arcadeos-logo.jpg',
    ],
  },
  {
    id: 'gym-store',
    title: 'Berserk Gym Store',
    tagline: 'E-commerce app with cart and checkout',
    description: 'A sleek store for gym equipment with real-world UX touches.',
    long:
      'Berserk Gym Store is an online platform to browse, filter, and order gym equipment. Built with React, Firebase, and Tailwind, it has a sleek UI and smooth cart/checkout system. I made it production-ready with real-world UX details and scalable design.',
    tech: ['React', 'Firebase', 'TailwindCSS'],
    links: { github: 'https://github.com/Musxeto/berserk-gym-store', demo: 'https://berserkfit.netlify.app/' },
    image: '/projects/berserkfitstore/berserk-fit-home.png',
    images: [
      '/projects/berserkfitstore/berserk-fit-home.png',
      '/projects/berserkfitstore/featured-prod.png',
      '/projects/berserkfitstore/admin-prod.png',
      '/projects/berserkfitstore/admin-berserk.png',
    ],
  },
  {
    id: 'moseeqify',
    title: 'Moseeqify',
    tagline: 'A Spotify-inspired music streaming app',
    description: 'Personal Spotify-like app with playlists, browsing, and playback.',
    long:
      'Moseeqify is my take on a personal Spotify clone. It handles playlists, track browsing, and playback, with a clean UI inspired by real-world apps. This project was about mastering APIs, React state management, and responsive design — plus it was just plain fun to hack music into a working app.',
    tech: ['React', 'Tailwind','Flask', 'Firebase', 'REST APIs'],
    links: { github: 'https://github.com/Musxeto/Moseeqify' },
    image: '/projects/moseeqify/home.png',
    images: [
      '/projects/moseeqify/home.png',
      '/projects/moseeqify/album.png',
    ],
  },
  {
    id: 'berserk-website',
    title: 'Berserk Gym (Website)',
    tagline: 'Modern landing page for a fitness brand',
    description: 'Responsive site showcasing services, trainers, and plans.',
    long:
      'Berserk Gym is a responsive website for a local gym — showcasing services, trainers, and membership plans. It’s simple but polished: a place where design, branding, and clean code come together. Built fast, shipped fast, and designed to look professional without over-engineering.',
    tech: ['React', 'TailwindCSS'],
    links: { github: 'https://github.com/Musxeto/berserk-gym', demo: 'https://berserkgym.vercel.app/' },
    image: '/projects/berserk-gym/gym-home.png',
    images: [
      '/projects/berserk-gym/gym-home.png',
      '/projects/berserk-gym/services.png',
    ],
  },
  {
    id: 'mauqah',
    title: 'Mauqah',
    tagline: 'Responsive Islamic landing page for a startup idea',
    description: 'Smooth scrolls, CTAs, and mobile-first design.',
    long:
      'Mauqah was about speed and clean execution. It’s a modern Islamic landing page with smooth scrolls, call-to-action buttons, and mobile-first design. Even though it’s lightweight, it packs a professional look and strong messaging — perfect for startups.',
    tech: ['React', 'TailwindCSS'],
    links: { github: 'https://github.com/Musxeto/mauqah', demo: 'https://mauqah.netlify.app/' },
    image: '/projects/mauqah/home-mauqah.png',
    images: [
      '/projects/mauqah/home-mauqah.png',
    ],
  },
  {
    id: 'amica',
    title: 'Amica Foundation',
    tagline: 'Charity/nonprofit website with a clean modern UI',
    description: 'Modern NGO platform for mission, programs, and donations.',
    long:
      'Amica Foundation’s site is a modern, responsive NGO platform that shares their mission, programs, and donation options. It balances functionality with a soft, inviting design. It taught me how to make design decisions that align with real-world organizations.',
    tech: ['React', 'TailwindCSS'],
    links: { github: 'https://github.com/Musxeto/amica-foundation', demo: 'https://amicafoundation.netlify.app/' },
    image: '/projects/amicafoundation/amica.png',
    images: [
      '/projects/amicafoundation/amica.png',
      '/projects/amicafoundation/amica-projects.png',
    ],
  },
]

export default PROJECTS