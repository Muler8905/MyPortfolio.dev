import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onNavigate: (page: string, sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', page: 'home', section: 'home' },
    { name: 'About', page: 'about', section: undefined },
    { name: 'Expertise', page: 'home', section: 'expertise' },
    { name: 'Work', page: 'home', section: 'work' },
    { name: 'Projects', page: 'home', section: 'projects' },
    { name: 'Blog', page: 'blog', section: undefined },
    { name: 'Contact', page: 'home', section: 'contact' },
  ];

  const handleLinkClick = (page: string, section?: string) => {
    onNavigate(page, section);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'py-2 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 shadow-sm' 
          : 'py-4 bg-transparent hover:bg-white/90 dark:hover:bg-[#0B0F19]/90 hover:backdrop-blur-md hover:border-b hover:border-gray-200 dark:hover:border-white/5 hover:shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" 
            onClick={() => handleLinkClick('home')}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 dark:from-blue-400 dark:to-purple-600 font-display font-bold text-2xl tracking-tight transition-transform duration-300 group-hover:scale-105">
              Muluken.dev
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.page, link.section)}
                className="relative px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-white transition-colors duration-300 text-sm font-medium tracking-wide bg-transparent border-none cursor-pointer group overflow-hidden"
              >
                <span className="relative z-10">{link.name}</span>
                {/* Colored Underline Animation */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 dark:bg-violet-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            ))}
            
            <div className="flex items-center gap-4 pl-6 ml-2 border-l border-gray-200 dark:border-white/10">
               {/* Theme Toggle */}
               <button 
                 onClick={toggleTheme}
                 className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 hover:rotate-12 transition-all duration-300"
                 aria-label="Toggle Theme"
               >
                 {isDark ? <Sun size={20} /> : <Moon size={20} />}
               </button>

               <div className="flex gap-2">
                 <a href="https://github.com/Muler8905" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-white hover:-translate-y-1 transition-all duration-300"><Github size={20} /></a>
                 <a href="https://www.linkedin.com/in/muluken-ugamo-4a23a0336/" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-white hover:-translate-y-1 transition-all duration-300"><Linkedin size={20} /></a>
               </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <button 
                 onClick={toggleTheme}
                 className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 transition-all"
             >
                 {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-white p-2 transition-transform duration-300 active:scale-95"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 absolute w-full shadow-lg transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
      }`}>
          <div className="px-4 pt-2 pb-8 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.page, link.section)}
                className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 text-base font-medium px-4 py-3 rounded-xl transition-all"
              >
                {link.name}
              </button>
            ))}
          </div>
      </div>
    </nav>
  );
};

export default Navbar;