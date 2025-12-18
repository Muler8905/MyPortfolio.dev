
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Github, ExternalLink, Code2, Layers, CheckCircle2, AlertCircle, Plus, Edit2, Trash2, Save, X, Image as ImageIcon, CloudUpload, Loader2 } from 'lucide-react';
import { getAllProjects, saveProjects } from '../projectData';
import { Project } from '../types';
import { pushToGitHub, getGitHubConfig } from '../services/githubService';
import SyncModal from './SyncModal';

interface ProjectPageProps {
  projectId: string | null;
  onBack: () => void;
  onNavigate: (page: string, sectionId?: string) => void;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ projectId, onBack, onNavigate }) => {
  const [view, setView] = useState<'list' | 'detail' | 'form'>('list');
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '', description: '', longDescription: '', tags: [], imageUrl: '', demoUrl: '', repoUrl: '', features: [], challenges: ''
  });
  const [tagsInput, setTagsInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');

  useEffect(() => {
    const all = getAllProjects();
    setProjects(all);
    if (projectId) {
      const found = all.find(p => p.id === projectId);
      if (found) {
        setCurrentProject(found);
        setView('detail');
      } else { setView('list'); }
    } else { setView('list'); }
    window.scrollTo(0, 0);
  }, [projectId]);

  const handleSyncToGitHub = async () => {
    const config = getGitHubConfig();
    if (!config) {
      setIsSyncModalOpen(true);
      return;
    }

    setIsSyncing(true);
    try {
      // Note: We use a specific path for data persistence
      await pushToGitHub('src/data/projects.json', projects, `Update portfolio projects from UI: ${new Date().toLocaleString()}`);
      alert("Successfully synced with GitHub! Your site will rebuild automatically in a few minutes.");
    } catch (err: any) {
      alert("Error syncing with GitHub: " + err.message);
      if (err.message.includes("configuration")) setIsSyncModalOpen(true);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleEdit = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setFormData(project);
    setTagsInput(project.tags.join(', '));
    setFeaturesInput(project.features ? project.features.join('\n') : '');
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project? This cannot be undone.')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveProjects(updated);
      if (view === 'detail' && currentProject?.id === id) {
        setView('list');
        setCurrentProject(null);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const processedData: Project = {
      id: formData.id || Date.now().toString(),
      title: formData.title || 'Untitled Project',
      description: formData.description || '',
      longDescription: formData.longDescription || '',
      imageUrl: formData.imageUrl || 'https://picsum.photos/1200/800',
      demoUrl: formData.demoUrl,
      repoUrl: formData.repoUrl,
      challenges: formData.challenges,
      tags: tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0),
      features: featuresInput.split('\n').map(f => f.trim()).filter(f => f.length > 0)
    };
    let updatedProjects: Project[];
    if (formData.id) { updatedProjects = projects.map(p => p.id === formData.id ? processedData : p); }
    else { updatedProjects = [processedData, ...projects]; }
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    setCurrentProject(processedData);
    setView('detail');
  };

  const handleCreateNew = () => {
    setFormData({ title: '', description: '', longDescription: '', imageUrl: '', demoUrl: '', repoUrl: '', challenges: '', });
    setTagsInput('');
    setFeaturesInput('');
    setView('form');
  };

  if (view === 'form') {
    return (
      <section className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => setView('list')} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">
              <ArrowLeft size={16} /> Cancel
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{formData.id ? 'Edit Project' : 'Upload New Project'}</h1>
          </div>
          <form onSubmit={handleSave} className="bg-white dark:bg-[#131b2e] rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-white/5 space-y-6">
            <div className="space-y-4">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/5 pb-2">Basic Info</h3>
               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500/50 outline-none" placeholder="e.g. AI SaaS Platform" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short Description (Preview)</label>
                  <textarea required rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500/50 outline-none" placeholder="Brief summary for the card..." />
               </div>
            </div>
            <div className="space-y-4">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/5 pb-2 pt-4">Media & Links</h3>
               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <ImageIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500/50 outline-none" placeholder="https://..." />
                    </div>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Demo URL</label>
                      <input type="url" value={formData.demoUrl} onChange={e => setFormData({...formData, demoUrl: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500/50 outline-none" placeholder="https://..." />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub Repo URL</label>
                      <input type="url" value={formData.repoUrl} onChange={e => setFormData({...formData, repoUrl: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500/50 outline-none" placeholder="https://github.com/..." />
                   </div>
               </div>
            </div>
            <div className="space-y-4">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/5 pb-2 pt-4">Details</h3>
               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Long Description</label>
                  <textarea rows={6} value={formData.longDescription} onChange={e => setFormData({...formData, longDescription: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500/50 outline-none" placeholder="Full details about the project..." />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags / Tech Stack</label>
                  <input type="text" value={tagsInput} onChange={e => setTagsInput(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500/50 outline-none" placeholder="React, Node.js, TypeScript (comma separated)" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Features (One per line)</label>
                  <textarea rows={4} value={featuresInput} onChange={e => setFeaturesInput(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500/50 outline-none" placeholder="- Real-time chat&#10;- Dark mode" />
               </div>
            </div>
            <div className="pt-4 flex justify-end gap-4">
              <button type="button" onClick={() => setView('list')} className="px-6 py-3 rounded-xl font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all">Cancel</button>
              <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/20 transition-all transform hover:-translate-y-1"><Save size={18} /> Save Project</button>
            </div>
          </form>
        </div>
      </section>
    );
  }

  if (view === 'list') {
    return (
        <section className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                   <div>
                        <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors mb-4"><ArrowLeft size={16} /> Back to Home</button>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">All Projects</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and view your portfolio.</p>
                   </div>
                   <div className="flex gap-4">
                      <button 
                        onClick={handleSyncToGitHub}
                        disabled={isSyncing}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                          isSyncing ? 'bg-gray-400 cursor-wait' : 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-600 hover:text-white'
                        }`}
                      >
                        {isSyncing ? <Loader2 size={18} className="animate-spin" /> : <CloudUpload size={18} />}
                        {isSyncing ? 'Pushing...' : 'Push to GitHub'}
                      </button>
                      <button onClick={handleCreateNew} className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-violet-600 dark:hover:bg-gray-200 transition-all shadow-lg"><Plus size={18} /> Add Project</button>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map(p => (
                         <div key={p.id} className="group relative bg-white dark:bg-[#131b2e] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer" onClick={() => { setCurrentProject(p); setView('detail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                            <div className="h-48 overflow-hidden relative">
                                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                <div className="absolute top-2 right-2 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10" onClick={e => e.stopPropagation()}>
                                   <button onClick={(e) => handleEdit(e, p)} className="p-2 bg-white/90 rounded-full text-blue-600 shadow-sm hover:bg-blue-50 active:scale-95 transition-transform" title="Edit"><Edit2 size={14}/></button>
                                   <button onClick={(e) => handleDelete(e, p.id)} className="p-2 bg-white/90 rounded-full text-red-600 shadow-sm hover:bg-red-600 hover:text-white active:scale-95 transition-all duration-300" title="Delete"><Trash2 size={14}/></button>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{p.description}</p>
                                <div className="mt-4 flex flex-wrap gap-2">{p.tags.slice(0, 3).map(tag => ( <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-white/5 rounded text-gray-600 dark:text-gray-400">{tag}</span> ))}</div>
                            </div>
                         </div>
                    ))}
                </div>
            </div>
            <SyncModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} onSuccess={() => { setIsSyncModalOpen(false); handleSyncToGitHub(); }} />
        </section>
    );
  }

  if (view === 'detail' && currentProject) {
      const project = currentProject;
      return (
        <section className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <button onClick={() => setView('list')} className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors"><ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to List</button>
              <div className="flex gap-3">
                 <button onClick={(e) => handleEdit(e, project)} className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-white text-sm font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"><Edit2 size={16} /> Edit</button>
                 <button onClick={(e) => handleDelete(e, project.id)} className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm font-semibold rounded-lg hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all"><Trash2 size={16} /> Delete</button>
                 {project.demoUrl && ( <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-violet-500/20"><ExternalLink size={16} /> Live Demo</a> )}
                 {project.repoUrl && ( <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white text-sm font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"><Github size={16} /> Source Code</a> )}
              </div>
            </div>
            <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10" />
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover"/>
                <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20">
                    <div className="flex flex-wrap gap-2 mb-4">{project.tags.map(tag => ( <span key={tag} className="px-3 py-1 rounded-full bg-violet-600/90 text-white text-xs font-semibold backdrop-blur-md border border-white/10">{tag}</span> ))}</div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 shadow-sm">{project.title}</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <div className="bg-white dark:bg-[#131b2e] rounded-2xl p-8 border border-gray-100 dark:border-white/5 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><Layers className="text-violet-600" /> Project Overview</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{project.longDescription || project.description}</p>
                    </div>
                    {project.features && project.features.length > 0 && (
                        <div className="bg-white dark:bg-[#131b2e] rounded-2xl p-8 border border-gray-100 dark:border-white/5 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Key Features</h2>
                            <ul className="grid grid-cols-1 gap-4">{project.features.map((feature, idx) => ( <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" /><span>{feature}</span></li> ))}</ul>
                        </div>
                    )}
                </div>
                <div className="space-y-8">
                    <div className="bg-white dark:bg-[#131b2e] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><Code2 className="text-blue-500" /> Technologies</h3>
                        <div className="flex flex-wrap gap-2">{project.tags.map(tag => ( <span key={tag} className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-white/10">{tag}</span> ))}</div>
                    </div>
                </div>
            </div>
          </div>
        </section>
      );
  }
  return null;
};

export default ProjectPage;
