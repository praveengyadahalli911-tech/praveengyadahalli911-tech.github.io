import { useState, useRef } from 'react';
import FadeIn from './FadeIn';

const AI_VIDEOS = [
  { src: '/ai-video-1.mp4', label: 'AI Video 1' },
  { src: '/ai-video-2.mp4', label: 'AI Video 2' },
  { src: '/ai-video-3.mp4', label: 'AI Video 3' },
  { src: '/ai-video-4.mp4', label: 'AI Video 4' },
];

interface VideoCardProps {
  src: string;
  label: string;
}

const VideoCard = ({ src, label }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden border-2 border-[#D7E2EA]/15 bg-[#141418] transition-all duration-300 hover:border-[#D7E2EA]/40">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full aspect-video object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>

      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white transition-all hover:bg-black/60 hover:scale-110"
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

      <div className="absolute top-3 left-3 z-10">
        <span className="text-[10px] px-2 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/70 border border-white/10">
          {label}
        </span>
      </div>
    </div>
  );
};

const SideQuestsSection = () => {
  return (
    <section
      id="ai-videos"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)' }}
        >
          AI Videos
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p
          className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/60 mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
        >
          AI-Powered Product Demos
        </p>
      </FadeIn>

      <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {AI_VIDEOS.map((video, i) => (
          <FadeIn key={video.label} delay={i * 0.15} y={30}>
            <VideoCard src={video.src} label={video.label} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default SideQuestsSection;
