import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import { Experience } from '../types';

const experiences: Experience[] = [
  {
    id: '1',
    role: 'Senior Full Stack Engineer',
    company: 'TechFlow Systems',
    period: '2022 - Present',
    description: 'Leading a team of 6 engineers rebuilding the core SaaS platform. Improved system performance by 40% by migrating legacy monolithic services to microservices on AWS.',
    logo: 'https://picsum.photos/id/1/60/60',
  },
  {
    id: '2',
    role: 'Software Engineer',
    company: 'DataStream Corp',
    period: '2019 - 2022',
    description: 'Developed real-time data visualization dashboards using D3.js and React. Implemented WebSocket connections handling over 10k concurrent users.',
    logo: 'https://picsum.photos/id/2/60/60',
  },
  {
    id: '3',
    role: 'Frontend Developer',
    company: 'Creative Agency X',
    period: '2017 - 2019',
    description: 'Built award-winning marketing sites and e-commerce platforms. Worked closely with designers to implement pixel-perfect responsive UIs.',
    logo: 'https://picsum.photos/id/3/60/60',
  },
];

const ExperienceSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const currentExp = experiences[currentIndex];

  return (
    <section id="work" className="py-24 bg-gray-50 dark:bg-[#080c14] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900 dark:text-white">
            Professional <span className="text-violet-600 dark:text-white">Journey</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A track record of delivering value at scale.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto z-10">
          {/* Card */}
          <div className="bg-white dark:bg-[#131b2e] rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/5 relative overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-none transition-colors duration-300">
             {/* Decorative Quote Icon Background */}
             <Briefcase className="absolute top-8 right-8 text-gray-100 dark:text-white/5 w-32 h-32 -rotate-12" />

             <div className="relative z-10">
               <div className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-light italic mb-8 leading-relaxed">
                 "{currentExp.description}"
               </div>
               
               <div className="flex items-center gap-4">
                 <img 
                   src={currentExp.logo} 
                   alt={currentExp.company} 
                   className="w-14 h-14 rounded-full border-2 border-violet-500/50"
                 />
                 <div>
                   <h4 className="text-gray-900 dark:text-white font-bold text-lg">{currentExp.role}</h4>
                   <p className="text-violet-600 dark:text-violet-400 text-sm font-medium">
                     {currentExp.company} • {currentExp.period}
                   </p>
                 </div>
               </div>
             </div>
          </div>

          {/* Controls */}
          <button 
            onClick={prev}
            className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 p-3 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-lg z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 p-3 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-lg z-20"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;