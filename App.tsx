import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AboutPreview from './components/AboutPreview';
import TechStack from './components/TechStack';
import ExperienceSection from './components/Experience';
import Projects from './components/Projects';
import AIChat from './components/AIChat';
import Footer from './components/Footer';
import BlogPreview from './components/BlogPreview';
import BlogPage from './components/BlogPage';
import ProjectPage from './components/ProjectPage';
import StarBackground from './components/StarBackground';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AcademicExcellence from './components/AcademicExcellence';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleNavigate = (page: string, sectionIdOrProjectId?: string) => {
    // If navigating to projects page
    if (page === 'project-details') {
        // If an ID is passed, we show detail, otherwise we show list (by passing null to state)
        setSelectedProjectId(sectionIdOrProjectId || null);
        setCurrentPage('project-details');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    setCurrentPage(page);
    
    // Handle scrolling after state update
    if (page === 'home') {
      setTimeout(() => {
        if (sectionIdOrProjectId) {
          const element = document.getElementById(sectionIdOrProjectId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Scroll to top for About and Blog pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-violet-500/30 selection:text-violet-900 dark:selection:text-white bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-gray-200 transition-colors duration-300 relative">
      {isDark && <StarBackground />}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} onNavigate={handleNavigate} />
      <main className="relative z-10">
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <AboutPreview onReadMore={() => handleNavigate('about')} />
            <AcademicExcellence />
            <TechStack />
            <ExperienceSection />
            <Projects onProjectClick={(id) => handleNavigate('project-details', id)} />
            <Testimonials />
            <BlogPreview onSeeMore={() => handleNavigate('blog')} />
            <Contact />
          </>
        )}
        
        {currentPage === 'about' && (
          <About onBack={() => handleNavigate('home')} />
        )}

        {currentPage === 'blog' && (
          <BlogPage onBack={() => handleNavigate('home')} />
        )}

        {currentPage === 'project-details' && (
          <ProjectPage 
            projectId={selectedProjectId} 
            onBack={() => handleNavigate('home', 'projects')} 
            onNavigate={handleNavigate}
          />
        )}
      </main>
      <Footer onNavigate={handleNavigate} />
      <AIChat />
    </div>
  );
}

export default App;