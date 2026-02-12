
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, User, Plus, Search, Tag, X, Trash2, Edit2, Save, CloudUpload, Loader2 } from 'lucide-react';
import { BlogPost } from '../types';
import { pushToGitHub, getGitHubConfig } from '../services/githubService';
import SyncModal from './SyncModal';

interface BlogPageProps {
  onBack: () => void;
}

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: '1', title: 'The Future of Full Stack in 2025', excerpt: 'Exploring how AI and Serverless architectures are redefining the role of a Full Stack Developer.', content: `The landscape...`, author: 'Muluken Ugamo', date: 'Oct 12, 2024', category: 'Tech Trends', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop', readTime: '5 min read'
  }
];

const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  const [view, setView] = useState<'list' | 'detail' | 'create'>('list');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({ title: '', excerpt: '', content: '', category: '', imageUrl: '', });

  useEffect(() => {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      try {
        const parsedPosts = JSON.parse(storedPosts);
        if (Array.isArray(parsedPosts)) { setPosts(parsedPosts); }
        else { setPosts(DEFAULT_POSTS); }
      } catch (e) { setPosts(DEFAULT_POSTS); }
    } else { setPosts(DEFAULT_POSTS); }
  }, []);

  const handleSyncToGitHub = async () => {
    const config = getGitHubConfig();
    if (!config) {
      setIsSyncModalOpen(true);
      return;
    }

    setIsSyncing(true);
    try {
      await pushToGitHub('src/data/blog.json', posts, `Update blog posts from UI: ${new Date().toLocaleString()}`);
      alert("Successfully synced blog with GitHub!");
    } catch (err: any) {
      alert("Error syncing blog: " + err.message);
      if (err.message.includes("configuration")) setIsSyncModalOpen(true);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleReadPost = (post: BlogPost) => {
    setSelectedPost(post);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    setPosts(prevPosts => {
        let updatedPosts: BlogPost[];
        if (isEditing && newPost.id) { updatedPosts = prevPosts.map(p => p.id === newPost.id ? { ...p, ...newPost } as BlogPost : p); }
        else {
            const post: BlogPost = {
              id: Date.now().toString(),
              title: newPost.title || 'Untitled',
              excerpt: newPost.excerpt || '',
              content: newPost.content || '',
              author: 'Muluken Ugamo',
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              category: newPost.category || 'General',
              imageUrl: newPost.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
              readTime: '3 min read'
            };
            updatedPosts = [post, ...prevPosts];
        }
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
        return updatedPosts;
    });
    setNewPost({ title: '', excerpt: '', content: '', category: '', imageUrl: '' });
    setIsEditing(false);
    setView('list');
  };

  const handleEditClick = (e: React.MouseEvent, post: BlogPost) => {
      e.stopPropagation(); e.preventDefault();
      setNewPost(post); setIsEditing(true); setView('create');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
      e.stopPropagation(); e.preventDefault();
      if (window.confirm("Are you sure you want to delete this post?")) {
          setPosts(currentPosts => {
              const updatedPosts = currentPosts.filter(p => p.id !== id);
              localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
              return updatedPosts;
          });
          if (view === 'detail' && selectedPost?.id === id) { setView('list'); setSelectedPost(null); }
      }
  };

  if (view === 'list') {
    return (
      <section className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors mb-4"><ArrowLeft size={16} /> Back to Home</button>
              <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">Blog & Insights</h1>
            </div>
            <div className="flex items-center gap-4">
               <button 
                 onClick={handleSyncToGitHub}
                 disabled={isSyncing}
                 className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg ${
                   isSyncing ? 'bg-gray-400 cursor-wait' : 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-600 hover:text-white'
                 }`}
               >
                 {isSyncing ? <Loader2 size={18} className="animate-spin" /> : <CloudUpload size={18} />}
                 {isSyncing ? 'Pushing...' : 'Push to GitHub'}
               </button>
               <button onClick={() => { setNewPost({ title: '', excerpt: '', content: '', category: '', imageUrl: '' }); setIsEditing(false); setView('create'); }} className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-violet-600 dark:hover:bg-gray-200 transition-all shadow-lg"><Plus size={18} /> New Post</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} onClick={() => handleReadPost(post)} className="group cursor-pointer bg-white dark:bg-[#131b2e] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-200 dark:border-white/5 transition-all duration-300 hover:-translate-y-1 relative">
                <div className="h-56 overflow-hidden relative">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0 relative"/>
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wide z-10">{post.category}</div>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[60]" onClick={(e) => e.stopPropagation()}>
                      <button onClick={(e) => handleEditClick(e, post)} className="p-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"><Edit2 size={16}/></button>
                      <button onClick={(e) => handleDeleteClick(e, post.id)} className="p-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full text-red-600 hover:bg-red-50 transition-colors shadow-sm"><Trash2 size={16}/></button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 uppercase tracking-wider"><span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span></div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">{post.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <SyncModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} onSuccess={() => { setIsSyncModalOpen(false); handleSyncToGitHub(); }} />
      </section>
    );
  }
  if (view === 'detail' && selectedPost) {
    return (
      <section className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => setView('list')} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Articles
          </button>

          <article className="bg-white dark:bg-[#131b2e] rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/5">
            <div className="h-96 overflow-hidden">
              <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span className="flex items-center gap-1 bg-violet-100 dark:bg-violet-900/30 px-3 py-1 rounded-full text-violet-600 dark:text-violet-400 font-semibold">
                  <Tag size={14} /> {selectedPost.category}
                </span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {selectedPost.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {selectedPost.readTime}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200 dark:border-white/5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {selectedPost.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedPost.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Full Stack Developer</p>
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                {selectedPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  if (view === 'create') {
    return (
      <section className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => { setView('list'); setIsEditing(false); setNewPost({ title: '', excerpt: '', content: '', category: '', imageUrl: '' }); }} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400 transition-colors mb-8">
            <ArrowLeft size={16} /> Cancel
          </button>

          <div className="bg-white dark:bg-[#131b2e] rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-white/5">
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">
              {isEditing ? 'Edit Post' : 'Create New Post'}
            </h1>

            <form onSubmit={handleSavePost} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input type="text" value={newPost.title || ''} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0B0F19] text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" placeholder="Enter post title" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <input type="text" value={newPost.category || ''} onChange={(e) => setNewPost({ ...newPost, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0B0F19] text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" placeholder="e.g., Tech Trends, Frontend, AI" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                <input type="url" value={newPost.imageUrl || ''} onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0B0F19] text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" placeholder="https://example.com/image.jpg" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Excerpt</label>
                <textarea value={newPost.excerpt || ''} onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0B0F19] text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none" placeholder="Brief summary of the post" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Content</label>
                <textarea value={newPost.content || ''} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} rows={12} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0B0F19] text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none font-mono text-sm" placeholder="Write your post content here..." required />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-violet-600 dark:hover:bg-gray-200 transition-all shadow-lg">
                  <Save size={18} /> {isEditing ? 'Update Post' : 'Publish Post'}
                </button>
                <button type="button" onClick={() => { setView('list'); setIsEditing(false); setNewPost({ title: '', excerpt: '', content: '', category: '', imageUrl: '' }); }} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default BlogPage;
