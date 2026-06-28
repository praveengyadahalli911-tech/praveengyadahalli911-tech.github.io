# Praveen G Y Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium dark-themed portfolio website for Praveen G Y showcasing Full Stack Development, AI Automation, and Digital Solutions with React, TypeScript, Tailwind CSS, and Framer Motion.

**Architecture:** Single-page application with component-based architecture. Each section is a reusable component. Theme toggle via React context. Firebase for contact form storage. Vercel for deployment.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Firebase

## Global Constraints

- Mobile-first responsive design
- Dark theme default, light theme toggle
- All animations via Framer Motion
- Firebase for contact form submissions
- Deploy to Vercel
- No external UI libraries (pure Tailwind)
- Brand colors: Deep navy #050B1F, Purple #6D28D9, Blue #2563EB

---

### Task 1: Project Scaffolding

**Covers:** [S1]

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`

- [ ] **Step 1: Initialize project with Vite**

```bash
npm create vite@latest . -- --template react-ts
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install framer-motion lucide-react
npm install firebase
```

- [ ] **Step 3: Configure Tailwind**

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#050B1F',
        secondary: '#6D28D9',
        accent: '#2563EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Add base styles**

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-primary text-white font-sans;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-primary;
}

::-webkit-scrollbar-thumb {
  @apply bg-secondary rounded;
}
```

- [ ] **Step 5: Create App shell**

```tsx
// src/App.tsx
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Social from './sections/Social'
import Contact from './sections/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-primary dark:bg-gray-100">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Experience />
        <Social />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
```

- [ ] **Step 6: Run dev server**

```bash
npm run dev
```

Expected: Vite dev server starts, page loads with empty sections

---

### Task 2: Theme Context

**Covers:** [S1]

**Files:**
- Create: `src/context/ThemeContext.tsx`

- [ ] **Step 1: Create ThemeContext**

```tsx
// src/context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

- [ ] **Step 2: Test theme toggle**

Run dev server, verify dark class toggles on html element

---

### Task 3: Navbar Component

**Covers:** [S2]

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create Navbar**

```tsx
// src/components/Navbar.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 dark:bg-white/80 backdrop-blur-lg border-b border-white/10 dark:border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Praveen G Y
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 dark:bg-gray-200 hover:bg-white/20 dark:hover:bg-gray-300 transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary dark:bg-white border-b border-white/10 dark:border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-gray-300 dark:text-gray-600"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
```

---

### Task 4: Hero Section

**Covers:** [S3]

**Files:**
- Create: `src/sections/Hero.tsx`

- [ ] **Step 1: Create Hero section**

```tsx
// src/sections/Hero.tsx
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-secondary dark:text-accent font-medium mb-4"
          >
            Full Stack Developer | AI Automation Engineer | Digital Solution Builder
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
          >
            Transforming Ideas Into{' '}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Digital Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-400 dark:text-gray-600 max-w-2xl mx-auto mb-8"
          >
            I build websites, applications, AI agents, automation systems, and educational platforms for businesses, startups, and students.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-secondary to-accent rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View Projects
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/20 dark:border-gray-300 rounded-lg font-medium hover:bg-white/10 dark:hover:bg-gray-100 transition-colors"
            >
              Contact Me
              <Mail size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

### Task 5: About Section

**Covers:** [S4]

**Files:**
- Create: `src/sections/About.tsx`

- [ ] **Step 1: Create About section**

```tsx
// src/sections/About.tsx
import { motion } from 'framer-motion'
import { Code, Bot, GraduationCap, Briefcase } from 'lucide-react'

const highlights = [
  { icon: Code, label: 'Full Stack Development' },
  { icon: Bot, label: 'AI Agents & Automation' },
  { icon: GraduationCap, label: 'Education Technology' },
  { icon: Briefcase, label: 'Business Solutions' },
]

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-300 dark:text-gray-600 mb-6">
              Computer Science Engineer focused on building real-world products using modern web technologies, AI integrations, and automation workflows.
            </p>
            <p className="text-lg text-gray-300 dark:text-gray-600 mb-6">
              Experienced in developing communication platforms, learning management systems, business automation tools, and AI agents.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 dark:bg-gray-100"
                >
                  <item.icon className="text-secondary dark:text-accent" size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-2">9.1</div>
                <div className="text-gray-400 dark:text-gray-600">CGPA in Computer Science</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

---

### Task 6: Services Section

**Covers:** [S5]

**Files:**
- Create: `src/sections/Services.tsx`
- Create: `src/components/ServiceCard.tsx`

- [ ] **Step 1: Create ServiceCard component**

```tsx
// src/components/ServiceCard.tsx
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  items: string[]
  index: number
}

export default function ServiceCard({ icon: Icon, title, items, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-2xl bg-white/5 dark:bg-white border border-white/10 dark:border-gray-200 hover:border-secondary/50 dark:hover:border-accent/50 transition-all group"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-gray-400 dark:text-gray-600 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
```

- [ ] **Step 2: Create Services section**

```tsx
// src/sections/Services.tsx
import { motion } from 'framer-motion'
import { Code, Bot, Palette, Video, GraduationCap } from 'lucide-react'
import ServiceCard from '../components/ServiceCard'

const services = [
  {
    icon: Code,
    title: 'Development Solutions',
    items: ['Custom Software Development', 'Website Development', 'Web Applications', 'Mobile Applications', 'API Development', 'Database Solutions'],
  },
  {
    icon: Bot,
    title: 'AI & Automation Solutions',
    items: ['AI Agents', 'Chatbots', 'Web Scraping Automation', 'AI Calling Agents', 'Voice Assistants', 'Workflow Automation'],
  },
  {
    icon: Palette,
    title: 'Design & Branding',
    items: ['Logo Design', 'Brand Identity', 'Social Media Creatives', 'Posters', 'Marketing Graphics'],
  },
  {
    icon: Video,
    title: 'Media & Video Solutions',
    items: ['Video Editing', 'Reels Editing', 'Promotional Videos', 'Motion Graphics', 'AI Product Videos'],
  },
  {
    icon: GraduationCap,
    title: 'Academic Solutions',
    items: ['Student Projects', 'Major Projects', 'Research Projects', 'Documentation', 'Portfolio Development'],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-gray-400 dark:text-gray-600 max-w-2xl mx-auto">
            Complete digital solutions for businesses, startups, students, and organizations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### Task 7: Projects Section

**Covers:** [S6]

**Files:**
- Create: `src/sections/Projects.tsx`
- Create: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Create ProjectCard component**

```tsx
// src/components/ProjectCard.tsx
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  features: string[]
  link?: string
  github?: string
  tech: string[]
  index: number
}

export default function ProjectCard({ title, description, features, link, github, tech, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-2xl bg-white/5 dark:bg-white border border-white/10 dark:border-gray-200 hover:border-secondary/50 dark:hover:border-accent/50 transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex gap-2">
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/10 dark:bg-gray-100 hover:bg-secondary/20 dark:hover:bg-accent/20 transition-colors">
              <ExternalLink size={16} />
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/10 dark:bg-gray-100 hover:bg-secondary/20 dark:hover:bg-accent/20 transition-colors">
              <Github size={16} />
            </a>
          )}
        </div>
      </div>

      <p className="text-gray-400 dark:text-gray-600 mb-4">{description}</p>

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2 text-gray-300 dark:text-gray-500">Features:</h4>
        <ul className="space-y-1">
          {features.map((feature) => (
            <li key={feature} className="text-sm text-gray-400 dark:text-gray-600 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-secondary dark:bg-accent" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="px-3 py-1 text-xs rounded-full bg-secondary/20 dark:bg-accent/20 text-secondary dark:text-accent">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Create Projects section**

```tsx
// src/sections/Projects.tsx
import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'

const projects = [
  {
    title: 'MittUp',
    description: 'Campus communication platform connecting students, staff, alumni, and industry experts.',
    features: ['Community communication', 'Announcements', 'User interaction', 'Digital campus ecosystem'],
    link: 'https://mittup.mitt.edu.in',
    tech: ['React', 'Firebase', 'Web Technologies'],
  },
  {
    title: 'TNBIT Community',
    description: 'Business communication platform with digital marketing and lead generation workflows.',
    features: ['Platform development', 'Lead generation', 'Social media management', 'AI product videos'],
    link: 'https://community.aitsp.in/',
    tech: ['React', 'Node.js', 'Firebase'],
  },
  {
    title: 'Grape',
    description: 'Learning platform for students from 1st to 12th standard.',
    features: ['Digital learning', 'Interactive concepts', 'Educational resources', 'Visualization-based education'],
    link: 'https://grape-10.vercel.app/',
    tech: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'Engipath',
    description: 'Engineering student preparation platform for career readiness.',
    features: ['Career preparation', 'Placement readiness', 'Learning resources', 'Job readiness tools'],
    tech: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'AI Agent Suite',
    description: 'Automation systems using AI for business workflows.',
    features: ['Web scraping agents', 'AI calling agents', 'Voice assistants', 'Business automation'],
    tech: ['Python', 'LLM', 'API Integration'],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-400 dark:text-gray-600 max-w-2xl mx-auto">
            Real-world applications solving real problems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### Task 8: Skills Section

**Covers:** [S7]

**Files:**
- Create: `src/sections/Skills.tsx`

- [ ] **Step 1: Create Skills section**

```tsx
// src/sections/Skills.tsx
import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C'],
  },
  {
    title: 'Frameworks',
    skills: ['React', 'Node.js', 'Tailwind CSS'],
  },
  {
    title: 'Database',
    skills: ['Firebase', 'SQL', 'NoSQL'],
  },
  {
    title: 'AI',
    skills: ['LLM Integration', 'Prompt Engineering', 'AI Agents', 'Automation'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'Figma', 'VS Code'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Skills & <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Technologies</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-300 dark:text-gray-600">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.05 }}
                    className="px-4 py-2 rounded-lg bg-white/5 dark:bg-gray-100 border border-white/10 dark:border-gray-200 text-sm font-medium hover:border-secondary/50 dark:hover:border-accent/50 hover:bg-secondary/10 dark:hover:bg-accent/10 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### Task 9: Experience Section

**Covers:** [S8]

**Files:**
- Create: `src/sections/Experience.tsx`

- [ ] **Step 1: Create Experience section**

```tsx
// src/sections/Experience.tsx
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

const experiences = [
  {
    role: 'Frontend Developer Intern',
    company: 'Virtunexa',
    items: ['Responsive UI development', 'REST API integration'],
  },
  {
    role: 'AIML Internship',
    company: 'Quantum Learning',
    items: ['Python AI applications', 'GST calculator', 'Invoice generator'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Experience</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-secondary/50 dark:border-accent/50"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Briefcase size={12} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold">{exp.role}</h3>
              <p className="text-secondary dark:text-accent mb-3">{exp.company}</p>
              <ul className="space-y-2">
                {exp.items.map((item) => (
                  <li key={item} className="text-gray-400 dark:text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### Task 10: Social Section

**Covers:** [S9]

**Files:**
- Create: `src/sections/Social.tsx`

- [ ] **Step 1: Create Social section**

```tsx
// src/sections/Social.tsx
import { motion } from 'framer-motion'
import { Linkedin, Github, ExternalLink } from 'lucide-react'

const socials = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/praveen-goudappa-yadahalli-a88528317',
    icon: Linkedin,
    description: 'Connect with me professionally',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/praveengyadahalli911-tech',
    icon: Github,
    description: 'View my open source work',
  },
]

export default function Social() {
  return (
    <section id="social" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let's <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Connect</span>
          </h2>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 dark:bg-white border border-white/10 dark:border-gray-200 hover:border-secondary/50 dark:hover:border-accent/50 transition-all group flex-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <social.icon size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{social.name}</h3>
                <p className="text-sm text-gray-400 dark:text-gray-600">{social.description}</p>
              </div>
              <ExternalLink size={18} className="text-gray-400 dark:text-gray-600 group-hover:text-secondary dark:group-hover:text-accent transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### Task 11: Contact Section with Firebase

**Covers:** [S10]

**Files:**
- Create: `src/sections/Contact.tsx`
- Create: `src/firebase/config.ts`
- Create: `src/components/ContactForm.tsx`

- [ ] **Step 1: Create Firebase config**

```tsx
// src/firebase/config.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
```

- [ ] **Step 2: Create ContactForm component**

```tsx
// src/components/ContactForm.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        timestamp: new Date(),
      })
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <Send className="text-green-500" size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-gray-400 dark:text-gray-600">Thank you for reaching out. I'll get back to you soon.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/5 dark:bg-gray-100 border border-white/10 dark:border-gray-200 focus:border-secondary dark:focus:border-accent outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/5 dark:bg-gray-100 border border-white/10 dark:border-gray-200 focus:border-secondary dark:focus:border-accent outline-none transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white/5 dark:bg-gray-100 border border-white/10 dark:border-gray-200 focus:border-secondary dark:focus:border-accent outline-none transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Message</label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white/5 dark:bg-gray-100 border border-white/10 dark:border-gray-200 focus:border-secondary dark:focus:border-accent outline-none transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-secondary to-accent font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>
    </form>
  )
}
```

- [ ] **Step 3: Create Contact section**

```tsx
// src/sections/Contact.tsx
import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-400 dark:text-gray-600 max-w-2xl mx-auto">
            Have an idea? Let's turn it into a working digital product.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 dark:bg-gray-100">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400 dark:text-gray-600">Email</p>
                <a href="mailto:praveengyadahalli911@gmail.com" className="font-medium hover:text-secondary dark:hover:text-accent transition-colors">
                  praveengyadahalli911@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 dark:bg-gray-100">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400 dark:text-gray-600">Location</p>
                <p className="font-medium">India</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

---

### Task 12: Footer Component

**Covers:** [S11]

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create Footer component**

```tsx
// src/components/Footer.tsx
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 dark:border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <a href="#" className="text-xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Praveen G Y
          </a>

          <p className="text-gray-400 dark:text-gray-600 text-sm flex items-center gap-1">
            Built with <Heart size={14} className="text-secondary dark:text-accent" /> by Praveen G Y
          </p>

          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/praveen-goudappa-yadahalli-a88528317" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-600 hover:text-secondary dark:hover:text-accent transition-colors text-sm">
              LinkedIn
            </a>
            <a href="https://github.com/praveengyadahalli911-tech" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-600 hover:text-secondary dark:hover:text-accent transition-colors text-sm">
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
```

---

### Task 13: Environment Setup & Firebase Configuration

**Covers:** [S10]

**Files:**
- Create: `.env.example`
- Create: `.env`

- [ ] **Step 1: Create env files**

```bash
# .env.example
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

```bash
# .env (with placeholder values - user fills in)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

### Task 14: Build & Verification

**Covers:** [S12]

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add build scripts**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: Build succeeds with no errors

- [ ] **Step 3: Verify all components render**

```bash
npm run dev
```

Expected: All sections visible, theme toggle works, animations play

---

### Task 15: Deployment Configuration

**Covers:** [S13]

**Files:**
- Create: `vercel.json`
- Create: `README.md`

- [ ] **Step 1: Create vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

- [ ] **Step 2: Create README.md**

```markdown
# Praveen G Y Portfolio

Full Stack Developer | AI Automation Engineer | Digital Solution Builder

## Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Firebase

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

```bash
vercel --prod
```

## Environment Variables

Copy `.env.example` to `.env` and fill in Firebase credentials.
```

- [ ] **Step 3: Deploy to Vercel**

```bash
vercel --prod
```

Expected: Deployment succeeds, site accessible via Vercel URL

---

## Summary

| Task | Component | Est. Time |
|------|-----------|-----------|
| 1 | Project Scaffolding | 5 min |
| 2 | Theme Context | 3 min |
| 3 | Navbar | 5 min |
| 4 | Hero Section | 5 min |
| 5 | About Section | 5 min |
| 6 | Services Section | 5 min |
| 7 | Projects Section | 5 min |
| 8 | Skills Section | 5 min |
| 9 | Experience Section | 5 min |
| 10 | Social Section | 3 min |
| 11 | Contact + Firebase | 8 min |
| 12 | Footer | 3 min |
| 13 | Environment Setup | 3 min |
| 14 | Build & Verify | 5 min |
| 15 | Deployment | 5 min |

**Total: ~70 minutes**
