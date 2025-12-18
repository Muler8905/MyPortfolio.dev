import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, FileText, Github, Linkedin, Youtube, Download, Send } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface HeroProps {
  onNavigate: (page: string, sectionId?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = "Building Scalable Digital Experiences";

  useEffect(() => {
    const handleType = () => {
      setText(prev => {
        if (isDeleting) {
          return fullText.substring(0, prev.length - 1);
        } else {
          return fullText.substring(0, prev.length + 1);
        }
      });
    };

    let speed = 100;
    if (isDeleting) speed = 50;
    
    if (!isDeleting && text === fullText) {
      speed = 2000; // Pause at end before deleting
    } else if (isDeleting && text === '') {
      speed = 500; // Pause at start before typing
    }

    const timer = setTimeout(() => {
      if (!isDeleting && text === fullText) {
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
      } else {
        handleType();
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  const handleDownloadCV = () => {
    const doc = new jsPDF();
    const violetColor = '#7c3aed';
    const darkColor = '#111827';
    const grayColor = '#4b5563';

    // Header Background
    doc.setFillColor(245, 243, 255); // Light violet bg
    doc.rect(0, 0, 210, 40, 'F');

    // Name & Title
    doc.setTextColor(darkColor);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("MULUKEN UGAMO", 20, 20);
    
    doc.setTextColor(violetColor);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("FULL STACK DEVELOPER", 20, 30);

    // Contact Info (Right aligned in header)
    doc.setFontSize(10);
    doc.setTextColor(grayColor);
    const contactX = 130;
    doc.text("+251-900-632-624", contactX, 15);
    doc.text("mulukenugamo8@gmail.com", contactX, 20);
    doc.text("02 wana Street., Dire Dawa", contactX, 25);
    doc.setTextColor(violetColor);
    doc.textWithLink("GitHub Profile", contactX, 30, { url: 'https://github.com/Muler8905' });

    let yPos = 55;

    // Profile Summary
    doc.setTextColor(violetColor);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("PROFILE SUMMARY", 20, yPos);
    
    yPos += 8;
    doc.setTextColor(darkColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const summary = "Passionate Full Stack Developer with expertise in modern web technologies including React.js, Node.js, and Express.js. Proven ability to build responsive, user-friendly applications with robust backend systems. Strong foundation in Software Engineering with hands-on experience developing AI-powered applications, database management, and RESTful API design.";
    const splitSummary = doc.splitTextToSize(summary, 170);
    doc.text(splitSummary, 20, yPos);

    yPos += 30;

    // Left Column: Education, Skills, Languages
    const leftColX = 20;
    
    // Education
    doc.setTextColor(violetColor);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("EDUCATION", leftColX, yPos);
    yPos += 8;
    doc.setTextColor(darkColor);
    doc.setFontSize(11);
    doc.text("DIRE DAWA UNIVERSITY", leftColX, yPos);
    yPos += 5;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("BSc in Software Engineering", leftColX, yPos);
    yPos += 5;
    doc.setTextColor(grayColor);
    doc.text("2023 - 2027 GC", leftColX, yPos);

    yPos += 15;

    // Technical Skills
    doc.setTextColor(violetColor);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("TECHNICAL SKILLS", leftColX, yPos);
    yPos += 8;
    
    const skillCategories = [
      { title: "Frontend:", items: "React.js, HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, Responsive Design" },
      { title: "Backend:", items: "Node.js, Express.js, RESTful APIs, Authentication (JWT)" },
      { title: "Databases:", items: "MySQL, PostgreSQL" },
      { title: "Tools:", items: "Git, GitHub, VS Code, Figma" }
    ];

    skillCategories.forEach(cat => {
        doc.setTextColor(darkColor);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(cat.title, leftColX, yPos);
        yPos += 5;
        doc.setFont("helvetica", "normal");
        const splitItems = doc.splitTextToSize(cat.items, 80);
        doc.text(splitItems, leftColX, yPos);
        yPos += splitItems.length * 5 + 3;
    });

    yPos += 5;
    // Languages
    doc.setTextColor(violetColor);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("LANGUAGES", leftColX, yPos);
    yPos += 8;
    doc.setTextColor(darkColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("• English: Fluent", leftColX, yPos);
    yPos += 5;
    doc.text("• Amharic: Native", leftColX, yPos);
    yPos += 5;
    doc.text("• Sidamic: Native", leftColX, yPos);

    // Right Column: Experience (Adjust Y position to top of columns)
    yPos = 93; 
    const rightColX = 110;

    doc.setTextColor(violetColor);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("WORK EXPERIENCE", rightColX, yPos);
    
    yPos += 10;

    const experiences = [
      {
        title: "Fitness Hub",
        tech: "React.js, Tailwind CSS, AI Integration",
        bullets: [
          "Developed an AI-powered fitness platform creating personalized workout/diet plans.",
          "Built responsive UI using React.js and Tailwind CSS.",
          "Integrated AI engine for automated plan generation.",
          "Optimized application performance for smooth user experience."
        ]
      },
      {
        title: "AI YouTube Thumbnail Gen",
        tech: "React.js, Node.js, PostgreSQL",
        bullets: [
          "Created full-stack web app generating custom thumbnails via AI.",
          "Developed RESTful APIs with Node.js for storage/management.",
          "Implemented PostgreSQL architecture for scalability.",
          "Designed intuitive frontend interface with React.js."
        ]
      },
      {
        title: "Personal Portfolio Website",
        tech: "React.js, Tailwind CSS",
        bullets: [
          "Built comprehensive portfolio showcasing projects and skills.",
          "Created clean, responsive UI for desktop and mobile.",
          "Implemented modern design principles for optimal UX.",
          "Deployed and optimized for cross-platform compatibility."
        ]
      }
    ];

    experiences.forEach(exp => {
      doc.setTextColor(darkColor);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(exp.title, rightColX, yPos);
      
      yPos += 5;
      doc.setTextColor(grayColor);
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.text(exp.tech, rightColX, yPos);
      
      yPos += 6;
      doc.setTextColor(darkColor);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      
      exp.bullets.forEach(bullet => {
        const splitBullet = doc.splitTextToSize(`• ${bullet}`, 90);
        doc.text(splitBullet, rightColX, yPos);
        yPos += splitBullet.length * 4 + 2;
      });
      yPos += 5;
    });

    doc.save('Muluken_Ugamo_CV.pdf');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-normal"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-normal"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm dark:bg-white/5 dark:border-white/10 text-sm text-purple-600 dark:text-purple-300 mb-6 animate-fade-in-up">
          <Sparkles size={14} className="text-purple-500 dark:text-purple-400" />
          <span className="font-medium tracking-wide">Available for new opportunities</span>
        </div>

        {/* Greeting */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in-up [animation-delay:100ms] text-gray-900 dark:text-white">
          Hi, I'm <span className="text-violet-600 dark:text-violet-400">Muluken</span>
        </h2>

        {/* Main Heading with Typing Animation */}
        <div className="min-h-[120px] md:min-h-[160px] flex items-center justify-center mb-10">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight animate-fade-in-up [animation-delay:200ms] text-gray-900 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 dark:from-blue-400 dark:via-purple-500 dark:to-pink-500">
              {text}
            </span>
            <span className="animate-pulse ml-1 text-gray-400 dark:text-gray-500 font-light">|</span>
          </h1>
        </div>

        {/* CTAs and Socials Container */}
        <div className="flex flex-col items-center gap-12 animate-fade-in-up [animation-delay:600ms]">
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate('home', 'projects')}
              className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-xl font-semibold text-white transition-all shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_6px_25px_rgba(124,58,237,0.4)] flex items-center gap-2 cursor-pointer"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={handleDownloadCV}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-white rounded-xl font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download size={18} />
              Download CV
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-8">
            <a 
              href="https://github.com/Muler8905" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-500 hover:rotate-[360deg] transform"
              aria-label="GitHub"
            >
              <Github size={32} />
            </a>
            <a 
              href="https://www.linkedin.com/in/muluken-ugamo-4a23a0336/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#0077b5] hover:text-[#006396] transition-all duration-500 hover:rotate-[360deg] transform"
              aria-label="LinkedIn"
            >
              <Linkedin size={32} />
            </a>
            <a 
              href="https://t.me/Muler_soft" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#0088cc] hover:text-[#0077b5] transition-all duration-500 hover:rotate-[360deg] transform"
              aria-label="Telegram"
            >
              <Send size={32} />
            </a>
            <a 
              href="https://www.youtube.com/@Muler_Te" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#FF0000] hover:text-[#D50000] transition-all duration-500 hover:rotate-[360deg] transform"
              aria-label="YouTube"
            >
              <Youtube size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;