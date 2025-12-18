import React from 'react';
import { Github, Linkedin, Youtube, Twitter, Send } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, sectionId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-[#080c14] pt-20 pb-10 border-t border-gray-200 dark:border-white/5 transition-colors duration-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <span 
              onClick={() => onNavigate('home')}
              className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 dark:from-blue-400 dark:to-purple-600 font-display font-bold text-2xl tracking-tight mb-6 block cursor-pointer w-fit"
            >
              Muluken.dev
            </span>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">
              Building the future of web applications with modern technologies and AI integration. 
              Let's build something amazing together.
            </p>
          </div>
          
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 tracking-wide text-sm">RESOURCES</h4>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm text-left"
                >
                  Resume / CV
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('home', 'projects')} 
                  className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm text-left"
                >
                  Project Kit
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('blog')} 
                  className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm text-left"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 tracking-wide text-sm">CONNECT</h4>
            <div className="flex gap-4">
              <a 
                href="https://github.com/Muler8905" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/muluken-ugamo-4a23a0336/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://t.me/Muler_soft" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-[#0088cc] hover:text-white dark:hover:bg-[#0088cc] dark:hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Send size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Muluken.dev. All rights reserved.
          </p>
          <div className="flex gap-1 text-sm text-gray-500 dark:text-gray-600">
            Powered by <span className="text-gray-700 dark:text-gray-500">React</span> & <span className="text-gray-700 dark:text-gray-500">Gemini</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;