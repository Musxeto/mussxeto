export type Experience = {
  id: string
  role: string
  company: string
  companyUrl?: string
  logoAlt?: string
  start: string
  end: string
  location: string
  current?: boolean
  summary?: string
  bullets: string[]
  tech: string[]
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'smart-computing-junior-backend',
    role: 'Junior Backend Developer (Part-time)',
    company: 'Smart Computing SMC Pvt Ltd',
    companyUrl: '#',
    start: 'Sep 2025',
    end: 'Present',
    location: 'Lahore, Pakistan',
    current: true,
    summary: 'Currently part of the backend team at PRISM, a multi-database analytics platform.',
    bullets: [
      'Building APIs with FastAPI, SQLAlchemy, Celery, Redis.',
      'Improving database workflows with ERD viewer + multi-tab query editor.',
      'Adding features, fixing bugs, and optimizing backend performance.',
    ],
    tech: ['FastAPI', 'Python', 'SQLAlchemy', 'Celery', 'Redis', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'smart-computing-intern',
    role: 'Software Engineer Intern',
    company: 'Smart Computing SMC Pvt Ltd',
    companyUrl: '#',
    start: 'Jul 2025',
    end: 'Sep 2025',
    location: 'Lahore, Pakistan',
    bullets: [
      'Contributed to PRISM across backend (FastAPI) and frontend (React, ReactFlow).',
      'Implemented Database Connection Studio with MySQL, PostgreSQL, MongoDB, MS SQL support.',
      'Secured platform with JWT auth, email verification, password recovery.',
      'Integrated AWS S3 + optimized pipelines with preview execution.',
    ],
    tech: ['FastAPI', 'React', 'TypeScript', 'MySQL', 'PostgreSQL', 'MongoDB', 'Microsoft SQL Server', 'AWSS3'],
  },
  {
    id: 'chelan-react-native',
    role: 'React Native Intern (Remote)',
    company: 'Chelan Technologies',
    companyUrl: '#',
    start: 'Jul 2024',
    end: 'Present',
    location: 'Washington, USA',
    current: true,
    bullets: [
      'Developed mobile apps using React Native, TypeScript, Firebase.',
      'Focused on UI/UX improvements and scalable front-end logic.',
      'Worked in a fully remote international team setup.',
    ],
    tech: ['React', 'TypeScript', 'Firebase'],
  },
  {
    id: 'salvo-intern',
    role: 'Software Intern',
    company: 'Salvo Integrated Solutions',
    companyUrl: '#',
    start: 'Jul 2024',
    end: 'Oct 2024',
    location: 'Lahore, Pakistan',
    bullets: [
      'Full-stack development with Django + React.',
      'Built a facial recognition attendance system (computer vision, OpenCV).',
      'Gained practical ML exposure in computer vision applications.',
    ],
    tech: ['Django', 'React', 'OpenCV', 'Python'],
  },
  {
    id: 'gcs-intern',
    role: 'Web Development Intern',
    company: 'GCS Pvt Ltd',
    companyUrl: '#',
    start: 'Aug 2023',
    end: 'Oct 2023',
    location: 'Lahore, Pakistan',
    bullets: [
      'Worked with Flask, MySQL, JavaScript.',
      'Optimized the company’s attendance portal for performance & usability.',
    ],
    tech: ['Flask', 'MySQL', 'JavaScript'],
  },
]
