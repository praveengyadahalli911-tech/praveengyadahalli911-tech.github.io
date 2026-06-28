import { useState, useEffect, useRef, useCallback } from 'react';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const DURATION = 3500;

  const startAnimation = useCallback(() => {
    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress(pct);

      if (elapsed < 600) setPhase(0);
      else if (elapsed < 1200) setPhase(1);
      else if (elapsed < 1800) setPhase(2);
      else if (elapsed < 2200) setPhase(3);
      else if (elapsed < 3000) setPhase(4);
      else setPhase(5);

      if (elapsed >= DURATION) {
        onComplete();
        return;
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number; color: string;
      life: number; decay: number;
      angle: number; orbitSpeed: number; orbitRadius: number;
    }

    const particles: Particle[] = [];
    const cx = () => canvas.width / 2;
    const cy = () => canvas.height / 2;

    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 180 + 20;
      particles.push({
        x: cx() + Math.cos(angle) * radius,
        y: cy() + Math.sin(angle) * radius,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        color: i % 3 === 0 ? '#d7e2ea' : i % 3 === 1 ? '#6D28D9' : '#2563EB',
        life: 1,
        decay: 0.0008 + Math.random() * 0.002,
        angle,
        orbitSpeed: 0.002 + Math.random() * 0.005,
        orbitRadius: radius,
      });
    }

    let running = true;
    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentCx = cx();
      const currentCy = cy();

      particles.forEach(p => {
        p.angle += p.orbitSpeed;
        p.x = currentCx + Math.cos(p.angle) * p.orbitRadius;
        p.y = currentCy + Math.sin(p.angle) * p.orbitRadius;
        p.orbitRadius += p.speedX;
        p.life -= p.decay;

        if (p.life <= 0) {
          const angle = Math.random() * Math.PI * 2;
          p.orbitRadius = Math.random() * 180 + 20;
          p.angle = angle;
          p.life = 1;
          p.x = currentCx + Math.cos(angle) * p.orbitRadius;
          p.y = currentCy + Math.sin(angle) * p.orbitRadius;
        }

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glow.addColorStop(0, p.color);
        glow.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * p.life * 0.5;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * p.life;
        ctx.fill();

        ctx.globalAlpha = 1;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
    startAnimation();

    return () => {
      running = false;
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [startAnimation]);

  const handleSkip = () => {
    cancelAnimationFrame(animFrameRef.current);
    onComplete();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #050B1F 0%, #0c0c0c 50%, #0a0e1a 100%)' }}
      onClick={handleSkip}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Animated gradient orbs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[150px] transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 70%)',
          top: '30%', left: '20%',
          opacity: phase >= 1 ? 1 : 0,
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
          bottom: '20%', right: '25%',
          opacity: phase >= 1 ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Role title */}
        <div className={`transition-all duration-700 ease-out ${phase >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#d7e2ea]/40 mb-4 font-kanit">
            Full Stack Developer · AI Engineer
          </p>
        </div>

        {/* Name */}
        <div className={`transition-all duration-700 ease-out delay-100 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1
            className="font-black uppercase leading-[0.85] tracking-tight font-kanit"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 8rem)',
              background: 'linear-gradient(180deg, #646973 0%, #bbccd7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Praveen
          </h1>
        </div>

        <div className={`transition-all duration-700 ease-out delay-200 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1
            className="font-black uppercase leading-[0.85] tracking-tight font-kanit"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 8rem)',
              background: 'linear-gradient(180deg, #646973 0%, #bbccd7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            G Y
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-700 ease-out ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="mt-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#d7e2ea]/50 font-kanit">
            Praveen Goudappa Yadahalli
          </p>
        </div>

        {/* Glitch line */}
        <div className={`transition-all duration-300 ${phase === 3 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
          <div className="mt-6 h-[1px] w-48 mx-auto bg-gradient-to-r from-transparent via-[#d7e2ea]/40 to-transparent" />
        </div>
      </div>

      {/* Progress bar */}
      <div className={`relative z-10 mt-10 w-[200px] sm:w-[260px] transition-all duration-500 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full h-[2px] bg-[#d7e2ea]/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #6D28D9, #2563EB)',
              boxShadow: '0 0 12px rgba(109,40,217,0.4)',
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#d7e2ea]/30 font-kanit">Loading</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#d7e2ea]/30 font-kanit">{progress}%</span>
        </div>
      </div>

      {/* Skip hint */}
      <span
        className={`fixed bottom-8 z-2 text-[10px] tracking-[0.25em] uppercase text-[#d7e2ea]/20 font-kanit pointer-events-none transition-opacity duration-500 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}
        style={{ animation: 'pulse 2s ease-in-out infinite' }}
      >
        Click anywhere to skip
      </span>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
