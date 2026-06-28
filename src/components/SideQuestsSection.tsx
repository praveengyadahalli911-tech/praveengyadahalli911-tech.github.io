import FadeIn from './FadeIn';

const AI_VIDEOS = [
  { src: '/ai-video-1.mp4', label: 'AI Video 1' },
  { src: '/ai-video-2.mp4', label: 'AI Video 2' },
  { src: '/ai-video-3.mp4', label: 'AI Video 3' },
  { src: '/ai-video-4.mp4', label: 'AI Video 4' },
];

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
            <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden border-2 border-[#D7E2EA]/15 bg-[#141418] transition-all duration-300 hover:border-[#D7E2EA]/40">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-video object-cover"
              >
                <source src={video.src} type="video/mp4" />
              </video>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default SideQuestsSection;
