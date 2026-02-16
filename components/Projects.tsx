import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, ArrowRight, Plus, FolderOpen, Trash2 } from 'lucide-react';
import { getAllProjects, saveProjects } from '../projectData';
import { Project } from '../types';

interface ProjectsProps {
  onProjectClick?: (id: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectClick }) => {
  const [displayProjects, setDisplayProjects] = useState<Project[]>([]);

  const loadProjects = () => {
    const all = getAllProjects();
    setDisplayProjects(all.slice(0, 3)); // Show top 3
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
        const all = getAllProjects();
        const updated = all.filter(p => p.id !== id);
        saveProjects(updated);
        loadProjects(); // Refresh the list immediately
    }
  };

  return (
    <section id="projects" className="py-24 bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-gray-900 dark:text-white">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-400">Hand-picked case studies of my best work.</p>
          </div>
          <div className="flex gap-4">
             <button 
                onClick={() => onProjectClick && onProjectClick('')} // Empty string signals "List View" / "Manage"
                className="px-6 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-violet-600 dark:hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-2 shadow-lg"
             >
                <Plus size={16} /> Manage Projects
             </button>
             <a 
               href="https://github.com/Muler8905"
               target="_blank"
               rel="noopener noreferrer"
               className="px-6 py-2 rounded-lg border border-violet-500/30 text-violet-600 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors text-sm font-medium flex items-center gap-2"
             >
               View Github <ArrowRight size={16} />
             </a>
          </div>
        </div>

        {displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, index) => (
              <div 
                key={project.id} 
                onClick={() => onProjectClick && onProjectClick(project.id)}
                className="fade-up-on-scroll group bg-gray-50 dark:bg-[#131b2e] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-violet-500/30 transition-all hover:shadow-2xl hover:shadow-violet-900/10 dark:hover:shadow-violet-900/10 cursor-pointer flex flex-col h-full relative hover-lift"
              >
                <div className="relative h-48 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10 opacity-60" />
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                  
                  {/* Delete Button Overlay */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20">
                     <button 
                       onClick={(e) => handleDelete(e, project.id)} 
                       className="p-2 bg-white/90 rounded-full text-red-600 shadow-sm hover:bg-red-600 hover:text-white active:scale-95 transition-all duration-300"
                       title="Delete Project"
                     >
                       <Trash2 size={14}/>
                     </button>
                  </div>
                </div>
                
                <div className="p-6 relative z-20 -mt-12 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs font-semibold px-2 py-1 bg-white/90 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 rounded-md border border-violet-200 dark:border-violet-500/20 backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                       <span className="text-xs font-semibold px-2 py-1 bg-white/90 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 rounded-md border border-violet-200 dark:border-violet-500/20 backdrop-blur-sm">
                         +{project.tags.length - 3}
                       </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-white/5">
                     {project.demoUrl && (
                         <button className="flex items-center gap-2 text-gray-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 text-sm font-medium transition-colors">
                           <ExternalLink size={16} /> Live Demo
                         </button>
                     )}
                     {project.repoUrl && (
                         <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors">
                           <Github size={16} /> Code
                         </button>
                     )}
                     <span className="ml-auto text-violet-600 dark:text-violet-400 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                         Details <ArrowRight size={14} />
                     </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 dark:bg-[#131b2e] rounded-3xl border border-dashed border-gray-300 dark:border-white/10">
            <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-full mb-4 text-gray-400">
                <FolderOpen size={48} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Projects Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
              Your portfolio is currently empty. Click the button below to add your first project.
            </p>
            <button 
                onClick={() => onProjectClick && onProjectClick('')}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-violet-500/20"
            >
                Add Your First Project
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;