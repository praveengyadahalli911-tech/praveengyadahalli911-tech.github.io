import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import FadeIn from './FadeIn';
import ExpandOnHover from './expand-cards';

interface PdfCert {
  name: string;
  file: string;
}

const CERTIFICATE_IMAGES = [
  { src: '/certificates/1291_FL.jpg', alt: 'Flipkart FL Certificate' },
  { src: '/certificates/1291_PC_page-0001.jpg', alt: 'Flipkart PC Certificate' },
  { src: '/certificates/SAP%20hackfest%20participation%20Mangalore%20MITE%20.jpg', alt: 'SAP Hackfest' },
  { src: '/certificates/_Praveen%20Goudappa%20Yadahalli-%20team%20cyber%20knights_page-0001.jpg', alt: 'Team Cyber Knights' },
  { src: '/certificates/Screenshot_20251219-141706.Files%20by%20Google.png', alt: 'Achievement Screenshot' },
];

const PDF_CERTIFICATES: PdfCert[] = [
  { name: 'Microsoft Learn Achievement', file: '/certificates/Achievements%20-%20pt-8875%20_%20Microsoft%20Learn.pdf' },
  { name: 'ACM Membership', file: '/certificates/ACM%20Membership%20card.pdf' },
  { name: 'Basics of Cloud Computing', file: '/certificates/Basics%20of%20cloud%20computing.pdf' },
  { name: 'Blockchain & Bitcoin - Udemy', file: '/certificates/Blockchain%20&%20bitcoin%20basic%20s%20Udemy.pdf' },
  { name: 'Data Structures', file: '/certificates/Data%20structures%20PG%20.pdf' },
  { name: 'Data Visualization in Python', file: '/certificates/Data%20Visualization%20in%20Python%20by%20Examples%20certificate%20.pdf' },
  { name: 'Fundamentals of C', file: '/certificates/Fundamental%20of%20c.pdf' },
  { name: 'IBM Machine Learning', file: '/certificates/IBM%20ML0101EN%20Certificate%20_%20Cognitive%20Class.pdf' },
  { name: 'Internship - Virtunexa', file: '/certificates/Internship%20Completion%20certificate%20virtunexa%20frontend%20dev.pdf' },
  { name: 'Internship - Quantum Learning', file: '/certificates/Internship%20letter%20on%20QL.pdf' },
  { name: 'Offer Letter - Virtunexa', file: '/certificates/Internship%20Offer%20Letter%20virtunexa.pdf' },
  { name: 'Java Fundamentals', file: '/certificates/Java%20programming%20fundamental%20certificate%20jp.pdf' },
  { name: 'JavaScript Mastery', file: '/certificates/JavaScript%20mastery%20from%20basic%20to%20advance%202025.pdf' },
  { name: 'Machine Unlearning for Gen AI', file: '/certificates/Machine%20unlearning%20for%20gen%20AI%20ACM.pdf' },
  { name: 'Design Thinking', file: '/certificates/Praveen%20Goudappa%20Yadahalli%20%20Design%20Thinking%20%2024.pdf' },
  { name: 'Database Index - Quantum', file: '/certificates/Praveen-Goudappa-Yadahalli--Database-Index-Advisors-on-Quantum-Platforms.pdf' },
  { name: 'Programming in C', file: '/certificates/Programming%20in%20c.pdf' },
  { name: 'Python Fundamentals', file: '/certificates/Python%20fundamental%20.pdf' },
  { name: 'Quantum Computing & AIML', file: '/certificates/Quantum%20computing%20AIML%20course%20certificate%20.pdf' },
  { name: 'React Complete Guide', file: '/certificates/React%20the%20complete%20guide%202025%20.pdf' },
  { name: 'SQL - Infosys', file: '/certificates/SQL%20Concepts%20&%20Queries%20Infosys%20Praveen.pdf' },
  { name: 'SQL/MySQL/PostgreSQL/MongoDB', file: '/certificates/SQL%2C%20MYSQL%2CPOSTERGSQL%2CMANGO%20DB%20ALL%20IN%20ONE.pdf' },
  { name: 'Algorithms Masterclass - Udemy', file: '/certificates/The%20design%20and%20analysis%20of%20the%20algorithms%20masterclass%20udemy%20.pdf' },
];

const CertificatesSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? PDF_CERTIFICATES.length - 1 : selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === PDF_CERTIFICATES.length - 1 ? 0 : selectedIndex + 1);
  };

  return (
    <>
      <section
        id="certificates"
        className="relative w-full bg-[#0C0C0C] py-20 sm:py-24 md:py-32 overflow-hidden"
      >
        <FadeIn y={40}>
          <h2
            className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)' }}
          >
            Certificates
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <p
            className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/60 mb-8 sm:mb-12 md:mb-16"
            style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
          >
            {CERTIFICATE_IMAGES.length + PDF_CERTIFICATES.length}+ Certifications & Achievements
          </p>
        </FadeIn>

        <FadeIn delay={0.2} y={30}>
          <ExpandOnHover images={CERTIFICATE_IMAGES} />
        </FadeIn>

        {/* PDF Certificates Grid */}
        <FadeIn delay={0.3} y={30}>
          <div className="mx-auto max-w-6xl px-5 sm:px-8 md:px-10 mt-12 sm:mt-16">
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-2.5 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/[0.03] text-[#D7E2EA]/70 text-xs uppercase tracking-widest transition-all duration-300 hover:border-[#D7E2EA]/40 hover:bg-[#D7E2EA]/[0.06] hover:text-[#D7E2EA]"
              >
                {showAll ? 'Show Less' : `View More (${PDF_CERTIFICATES.length})`}
              </button>
            </div>

            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 transition-all duration-500 ${showAll ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
              {PDF_CERTIFICATES.map((cert, i) => (
                <div
                  key={cert.name}
                  onClick={() => setSelectedIndex(i)}
                  className="group relative rounded-xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.02] p-3 sm:p-4 transition-all duration-300 hover:border-[#D7E2EA]/30 hover:bg-[#D7E2EA]/[0.05] cursor-pointer"
                >
                  <div className="text-lg mb-2">📄</div>
                  <p className="text-[10px] sm:text-xs text-[#D7E2EA]/70 leading-tight line-clamp-2">{cert.name}</p>
                  <p className="text-[8px] text-[#D7E2EA]/30 mt-2 uppercase tracking-wider">Click to view</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors z-50"
            >
              <X size={28} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-2 sm:left-6 text-white/70 hover:text-white transition-colors z-50 p-2"
            >
              <ChevronLeft size={36} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-2 sm:right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
            >
              <ChevronRight size={36} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={PDF_CERTIFICATES[selectedIndex].file}
                className="w-full h-[80vh]"
                title={PDF_CERTIFICATES[selectedIndex].name}
              />
              <div className="text-center py-3 bg-[#0C0C0C]">
                <p className="text-sm text-[#D7E2EA]/80">{PDF_CERTIFICATES[selectedIndex].name}</p>
                <p className="text-xs text-[#D7E2EA]/40 mt-1">{selectedIndex + 1} / {PDF_CERTIFICATES.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificatesSection;
