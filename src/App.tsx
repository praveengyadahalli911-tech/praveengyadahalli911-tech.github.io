import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import CertificatesSection from './components/CertificatesSection';
import SideQuestsSection from './components/SideQuestsSection';
import ContactSection from './components/ContactSection';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setShowPreloader(false), 600);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  const handlePreloaderComplete = () => {
    setLoaded(true);
    window.dispatchEvent(new Event('preloader-done'));
  };

  return (
    <>
      {showPreloader && (
        <div
          className="fixed inset-0 z-[9999] transition-opacity duration-500"
          style={{ opacity: loaded ? 0 : 1, pointerEvents: loaded ? 'none' : 'auto' }}
        >
          <Preloader onComplete={handlePreloaderComplete} />
        </div>
      )}
      <main
        className="relative w-full"
        style={{
          overflowX: 'clip',
          background: '#0C0C0C',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease 0.3s',
        }}
      >
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ServicesSection />
        <ProjectsSection />
        <CertificatesSection />
        <SideQuestsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default App;
