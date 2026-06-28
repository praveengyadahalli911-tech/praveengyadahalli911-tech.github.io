'use client'
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface GradientCardProps {
  icon: React.ReactNode;
  title: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
}

export const GradientCard = ({ icon, title, company, duration, description, achievements }: GradientCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / rect.height) * 5;
      const rotateY = (x / rect.width) * 5;
      setRotation({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-[32px] overflow-hidden w-full h-[380px] sm:h-[400px] lg:h-[420px]"
      style={{
        transformStyle: "preserve-3d",
        backgroundColor: "#0e131f",
        boxShadow: "0 -10px 100px 10px rgba(78, 99, 255, 0.25), 0 0 10px 0 rgba(0, 0, 0, 0.5)",
      }}
      initial={{ y: 0 }}
      animate={{
        y: isHovered ? -5 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
        perspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Glass reflection */}
      <motion.div
        className="absolute inset-0 z-35 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
        }}
        animate={{ opacity: isHovered ? 0.7 : 0.5 }}
        transition={{ duration: 0.4 }}
      />

      {/* Dark background */}
      <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(180deg, #000000 0%, #000000 70%)" }} />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Purple/blue glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20"
        style={{
          background: `
            radial-gradient(ellipse at bottom right, rgba(172, 92, 255, 0.7) -10%, rgba(79, 70, 229, 0) 70%),
            radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.7) -10%, rgba(79, 70, 229, 0) 70%)
          `,
          filter: "blur(40px)",
        }}
        animate={{ opacity: isHovered ? 0.9 : 0.8 }}
        transition={{ duration: 0.4 }}
      />

      {/* Central purple glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-21"
        style={{
          background: "radial-gradient(circle at bottom center, rgba(161, 58, 229, 0.7) -20%, rgba(79, 70, 229, 0) 60%)",
          filter: "blur(45px)",
        }}
        animate={{
          opacity: isHovered ? 0.85 : 0.75,
          y: isHovered ? "10%" : "10%",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Bottom border glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-25"
        style={{
          background: "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.05) 100%)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
            : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Card content */}
      <motion.div className="relative flex flex-col h-full p-6 sm:p-8 z-40">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
          style={{
            background: "linear-gradient(225deg, #171c2c 0%, #121624 100%)",
            boxShadow: "0 6px 12px -2px rgba(0, 0, 0, 0.25), inset 1px 1px 3px rgba(255, 255, 255, 0.12), inset -2px -2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="flex items-center justify-center w-full h-full relative z-10 text-white">
            {icon}
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50">{company}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA]/60">{duration}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-medium text-white mb-3" style={{ letterSpacing: "-0.01em", lineHeight: 1.2 }}>
            {title}
          </h3>

          <p className="text-sm text-gray-300 mb-4" style={{ lineHeight: 1.5, fontWeight: 350, opacity: 0.85 }}>
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {achievements.slice(0, 3).map((a, i) => (
              <span key={i} className="text-[10px] sm:text-xs px-2 py-1 rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] text-[#D7E2EA]/70">
                {a}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
