import React from 'react';
import { Database, Layout, Server, Cpu } from 'lucide-react';
import { TechSkill } from '../types';

const skills: TechSkill[] = [
  {
    name: 'Frontend Architecture',
    description: 'React, Next.js, TypeScript. Building responsive, accessible, and performant UIs.',
    icon: <Layout className="w-6 h-6 text-white" />,
  },
  {
    name: 'Backend Systems',
    description: 'Node.js, Python, Go. Scalable APIs and microservices Architecture.',
    icon: <Server className="w-6 h-6 text-white" />,
  },
  {
    name: 'AI Integration',
    description: 'LangChain, Gemini API, OpenAI. Embedding LLMs into practical workflows.',
    icon: <Cpu className="w-6 h-6 text-white" />,
  },
  {
    name: 'Database Design',
    description: 'PostgreSQL, MongoDB, Redis. Optimized schema design and caching strategies.',
    icon: <Database className="w-6 h-6 text-white" />,
  },
];

const TechStack: React.FC = () => {
  return (
    <section id="expertise" className="py-24 bg-white dark:bg-[#0B0F19] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900 dark:text-white">
            Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-500 dark:from-blue-400 dark:to-purple-500">Scale</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive suite of technical skills designed to bring your ambitious projects to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="fade-up-on-scroll group relative z-10 p-6 rounded-2xl bg-gray-50 dark:bg-[#131b2e] border border-gray-200 dark:border-white/5 hover:border-violet-500/30 dark:hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-none hover-tilt"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none"></div>
              
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-violet-900/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10">{skill.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;