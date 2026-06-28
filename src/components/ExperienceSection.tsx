import FadeIn from './FadeIn';
import { GradientCard } from './gradient-card';

const EXPERIENCES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Team Leader',
    company: 'TNBIT',
    duration: '3 Months',
    description: 'Led a cross-functional development team, ensuring smooth collaboration, sprint planning, and on-time delivery.',
    achievements: ['100% on-time delivery', '+15% team productivity', '3 major projects delivered'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Software Developer',
    company: 'Hindustan Enterprise',
    duration: '3 Months',
    description: 'Built and maintained modular web applications using React.js, Node.js, and JavaScript with REST API integration.',
    achievements: ['5+ core modules', '-25% response time', '+30% dev speed'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: 'Frontend Developer Intern',
    company: 'Virtunexa',
    duration: 'May 2025',
    description: 'Built responsive, user-friendly UIs using modern frontend frameworks with REST API integration.',
    achievements: ['3 responsive pages', '+20% page speed', 'Client satisfaction'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M20.66 8A10 10 0 0 0 14 2v6h6.66z" />
      </svg>
    ),
    title: 'AIML Intern',
    company: 'Quantum Learning',
    duration: 'Oct 2024',
    description: 'Developed GST Calculator, Predictor, and Invoice Generator using Python and Gradio on Google Colab.',
    achievements: ['50+ internal users', '92% prediction accuracy', '10+ hours saved/week'],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: 'Design Thinking Participant',
    company: 'IUCEE',
    duration: 'Jul 2024',
    description: 'Attended 8 intensive webinars focused on human-centered design frameworks and community problem solving.',
    achievements: ['Full certification', 'Prototype solution', 'Empathy mapping'],
  },
];

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p
          className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/60 mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
        >
          9 Months · 5 Roles · Full-Stack, AI/ML, Leadership
        </p>
      </FadeIn>

      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 md:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {EXPERIENCES.map((exp, i) => (
            <FadeIn key={exp.title} delay={i * 0.1} y={30}>
              <GradientCard {...exp} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
