
import React, { useState, useEffect } from 'react';
import { X, Github, Key, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { GitHubConfig, getGitHubConfig, saveGitHubConfig } from '../services/githubService';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SyncModal: React.FC<SyncModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [config, setConfig] = useState<GitHubConfig>({
    owner: '',
    repo: '',
    token: '',
    branch: 'main'
  });

  useEffect(() => {
    const saved = getGitHubConfig();
    if (saved) setConfig(saved);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveGitHubConfig(config);
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#131b2e] w-full max-w-md rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden scale-in">
        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 dark:bg-white rounded-lg text-white dark:text-gray-900">
              <Github size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">GitHub Sync Settings</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-500/20 flex gap-3">
            <Info size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              These settings allow you to push your changes (Projects/Blogs) back to your GitHub repository automatically.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">GitHub Username</label>
            <input 
              required
              type="text"
              value={config.owner}
              onChange={e => setConfig({...config, owner: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/50"
              placeholder="e.g. Muler8905"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Repository Name</label>
            <input 
              required
              type="text"
              value={config.repo}
              onChange={e => setConfig({...config, repo: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/50"
              placeholder="e.g. portfolio-2024"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Personal Access Token</label>
              <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-[10px] text-violet-600 dark:text-violet-400 hover:underline">Generate Token</a>
            </div>
            <div className="relative">
              <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                required
                type="password"
                value={config.token}
                onChange={e => setConfig({...config, token: e.target.value})}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/50"
                placeholder="ghp_xxxxxxxxxxxx"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2">
              <CheckCircle size={18} /> Save Config
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SyncModal;
