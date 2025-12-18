import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Code, User, Sparkles, Camera, RefreshCw } from 'lucide-react';

interface AboutPreviewProps {
  onReadMore: () => void;
}

const DEFAULT_IMAGE = 'https://img.freepik.com/premium-photo/anime-boy-is-coding_1040322-5696.jpg?w=2000';
const FALLBACK_IMAGE = 'https://cdn.impossibleimages.ai/wp-content/uploads/2023/07/20123614/Vg0p8SqN6LTWbvr5WD6eddkmhSXOyBKumvhm6B5qWfQFrLPOFs-600x901.jpg';

const AboutPreview: React.FC<AboutPreviewProps> = ({ onReadMore }) => {
  // Primary: Cyberpunk/Neon "Anime-style" coding environment
  // Fallback: Standard coding screen
  const [imgSrc, setImgSrc] = useState(DEFAULT_IMAGE);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load saved image from local storage if exists
    const savedImage = localStorage.getItem('about_preview_image');
    if (savedImage) {
      setImgSrc(savedImage);
    }
  }, []);

  const handleImgError = () => {
    // Only set fallback if we aren't already using it to avoid loops
    if (imgSrc !== FALLBACK_IMAGE) {
        setImgSrc(FALLBACK_IMAGE);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImgSrc(base64String);
        localStorage.setItem('about_preview_image', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setImgSrc(DEFAULT_IMAGE);
      localStorage.removeItem('about_preview_image');
  };

  const triggerFileInput = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent triggering other clicks
      e.preventDefault();
      fileInputRef.current?.click();
  };

  return (
    <section className="py-20 bg-white dark:bg-[#0B0F19] transition-colors duration-300 overflow-hidden relative border-b border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          {/* Image Side with Animation */}
          <div className="w-full md:w-1/2 relative group z-0">
             {/* Background decorative blob - Cyan/Orange theme */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-cyan-500/30 to-orange-500/30 rounded-full blur-3xl animate-blob opacity-70 pointer-events-none"></div>
             
             <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 transition-transform duration-500 hover:scale-[1.02] group-hover:shadow-cyan-500/20">
               {/* 
                  IMAGE CONFIGURATION:
                  Switched to a stylized/anime-esque digital environment.
                  Added onError handler to fallback if the link breaks.
               */}
               <img 
                 src={imgSrc}
                 onError={handleImgError}
                 alt="Muluken Ugamo - Full Stack Developer" 
                 className="w-full h-[300px] md:h-[450px] object-cover shadow-lg"
               />
               
               {/* Overlay - Tech themed for the coder image */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                  <p className="text-cyan-100 font-medium font-display tracking-wide font-mono">
                   <span className="text-orange-400">System</span>.<span className="text-cyan-400">build</span>(<span className="text-green-400">"Future"</span>);
                </p>
               </div>

               {/* Upload / Edit Controls (Visible on Hover) */}
               <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <input 
                       type="file" 
                       ref={fileInputRef} 
                       className="hidden" 
                       accept="image/*"
                       onChange={handleImageUpload}
                   />
                   <button 
                       onClick={triggerFileInput}
                       className="p-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-gray-700 dark:text-gray-200 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 transition-all shadow-lg"
                       title="Upload New Image"
                   >
                       <Camera size={18} />
                   </button>
                   <button 
                       onClick={handleResetImage}
                       className="p-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 transition-all shadow-lg"
                       title="Reset to Default"
                   >
                       <RefreshCw size={18} />
                   </button>
               </div>
             </div>

             {/* Floating Badge 1 - Cyan Theme */}
             <div className="absolute -top-6 -left-6 bg-white dark:bg-[#1c263b] p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 animate-float hidden md:block">
               <div className="flex items-center gap-3">
                 <div className="p-2.5 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl text-cyan-600 dark:text-cyan-400">
                    <Code size={20} />
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Focus</p>
                   <p className="text-sm font-bold text-gray-900 dark:text-white">Full Stack Dev</p>
                 </div>
               </div>
             </div>

             {/* Floating Badge 2 - Orange Theme */}
             <div className="absolute -bottom-8 -right-8 bg-white dark:bg-[#1c263b] p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 animate-float [animation-delay:2s] hidden md:block">
               <div className="flex items-center gap-3">
                 <div className="p-2.5 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400">
                    <Sparkles size={20} />
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Based In</p>
                   <p className="text-sm font-bold text-gray-900 dark:text-white">Ethiopia</p>
                 </div>
               </div>
             </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 text-sm font-medium mb-6">
              <User size={14} />
              <span>About Me</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 dark:from-blue-400 dark:to-purple-600">Innovation</span> & Impact
            </h2>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                Hi, I'm <strong className="text-gray-900 dark:text-white">Muluken Ugamo</strong>. My journey in technology began in 2023 at Dire Dawa University, where I discovered my passion for Software Engineering.
              </p>
              <p>
                I am a Full Stack Developer with a growth-oriented mindset, dedicated to turning ideas into functional solutions. I love solving social and community-based problems using modern technology.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row gap-4">
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onReadMore();
                }}
                className="group px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-violet-600 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-violet-500/25 flex items-center justify-center gap-2 cursor-pointer z-20 relative"
              >
                Read Full Bio
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutPreview;