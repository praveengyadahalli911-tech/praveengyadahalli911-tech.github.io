import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

interface SubProject {
  name: string;
  icon: string;
}

interface ProjectData {
  number: string;
  category: string;
  name: string;
  description: string;
  liveUrl?: string;
  video?: string;
  subProjects?: SubProject[];
  tech: string[];
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'Communication Platform',
    name: 'MittUp',
    description: 'Campus communication platform connecting students, staff, alumni, and industry experts with announcements, discussions, and community interaction.',
    liveUrl: 'https://mittup.mitt.edu.in',
    video: '/mittup-demo.mp4',
    tech: ['React', 'Firebase', 'Web Technologies'],
  },
  {
    number: '02',
    category: 'Business Platform',
    name: 'TNBIT Community',
    description: 'Business communication platform with digital marketing, lead generation workflows, social media management, and AI product video creation.',
    liveUrl: 'https://community.aitsp.in/',
    video: '/tnbit-demo.mp4',
    tech: ['React', 'Node.js', 'Firebase'],
  },
  {
    number: '03',
    category: 'Education Platform',
    name: 'Grape',
    description: 'Learning platform for students from 1st to 12th standard with concept learning, visualization-based education, and interactive modules.',
    liveUrl: 'https://grape-10.vercel.app/',
    video: '/grape-demo.mp4',
    tech: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    number: '04',
    category: 'Career Platform',
    name: 'Engipath',
    description: 'Engineering student preparation platform for career readiness with placement preparation, learning resources, and job readiness tools.',
    video: '/engipath-demo.mp4',
    tech: ['React', 'Node.js', 'MongoDB'],
  },
  {
    number: '05',
    category: 'AI Automation Suite',
    name: 'Agents & Scrapers',
    description: 'Suite of AI-powered automation tools including scrapers, calling agents, voice assistants, and WhatsApp automation.',
    subProjects: [
      { name: 'Jarvis', icon: '🤖' },
      { name: 'AI Calling Agent', icon: '📞' },
      { name: 'Voice Assistant', icon: '🎙️' },
      { name: 'WhatsApp Automation', icon: '💬' },
      { name: 'Content Extractor', icon: '📄' },
      { name: 'Freelance AI Hunter', icon: '🎯' },
      { name: 'Freelancing Scraper', icon: '🔍' },
      { name: 'Sales Scraper', icon: '💰' },
      { name: 'YouTube Shorts', icon: '🎬' },
      { name: 'Scraping Suite', icon: '🕸️' },
    ],
    tech: ['Python', 'LLM', 'API', 'Automation'],
  },
  {
    number: '06',
    category: 'Flutter App',
    name: 'Namma Metro Sahaya',
    description: 'Flutter mobile app for Namma Metro commuters with real-time information and navigation assistance.',
    video: '/namma-metro-demo.mp4',
    tech: ['Flutter', 'Dart', 'Mobile'],
  },
  {
    number: '07',
    category: 'Utility App',
    name: 'Bill Splitter',
    description: 'Smart bill splitting app for groups with equal and custom split options, tip calculator, and expense tracking.',
    video: '/bill-splitter-demo.mp4',
    tech: ['React', 'Node.js', 'Mobile'],
  },
  {
    number: '08',
    category: 'Hackathon Project',
    name: 'Hackmitten',
    description: 'Hackathon project built during a competitive coding event with full-stack implementation.',
    liveUrl: 'https://www.linkedin.com/posts/praveen-goudappa-yadahalli-a88528317_webdev-coding-fullstack-activity-7362383259059568640-ZzPx',
    video: '/hackmitten-demo.mp4',
    tech: ['Full Stack', 'Hackathon', 'Team'],
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
}

const ProjectCard = ({ project, index, total }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-24 md:top-32 h-[85vh] w-full"
      style={{ top: `${96 + index * 28}px` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-full w-full flex flex-col gap-4 sm:gap-6 md:gap-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        {/* Top row: number + meta + button */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex flex-row items-start gap-3 sm:gap-6 md:gap-10 min-w-0 w-full">
            <div
              className="shrink-0 font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}
            >
              {project.number}
            </div>

            <div className="flex flex-col gap-1 sm:gap-3 pt-1 sm:pt-3 md:pt-4 min-w-0 flex-1">
              <span
                className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
                style={{ fontSize: 'clamp(0.65rem, 1.2vw, 1rem)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
              <p className="text-[#D7E2EA]/70 text-sm mt-1">{project.description}</p>
            </div>
          </div>

          <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-2 md:pt-3 w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {project.liveUrl && (
              <LiveProjectButton href={project.liveUrl} className="w-full sm:w-auto" />
            )}
          </div>
        </div>

        {/* Video, Sub-projects, or Tech stack */}
        {project.video ? (
          <div className="flex-1 min-h-0 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            >
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
        ) : project.subProjects ? (
          <div className="flex-1 min-h-0 overflow-y-auto rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.02] p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {project.subProjects.map((sub) => (
                <div
                  key={sub.name}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.03] p-3 sm:p-4 transition-all hover:border-[#D7E2EA]/40 hover:bg-[#D7E2EA]/[0.06]"
                >
                  <span className="text-2xl">{sub.icon}</span>
                  <span className="text-[10px] sm:text-xs text-[#D7E2EA]/80 text-center leading-tight">{sub.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 px-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/[0.03] px-3 py-1 text-xs text-[#D7E2EA]/60"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </motion.article>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-7xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
