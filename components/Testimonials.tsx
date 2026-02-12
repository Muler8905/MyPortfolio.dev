import React, { useState, useEffect } from 'react';
import { Quote, Star, Plus, User, Trash2 } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Abebe Kebede',
    role: 'CEO',
    company: 'Addis Tech Solutions',
    text: "Muluken delivered an exceptional e-commerce platform for our business. His understanding of both local market needs and modern web technologies made the project a huge success.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Tigist Haile',
    role: 'Founder',
    company: 'Habesha Digital',
    text: "Working with Muluken was a game-changer for our startup. He built our mobile-responsive platform from scratch and it's been running smoothly for months. Highly recommended!",
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Dawit Tesfaye',
    role: 'Operations Manager',
    company: 'Ethiopian Logistics Hub',
    text: "Muluken's work on our inventory management system exceeded expectations. He's professional, responsive, and delivers quality code. A true asset to any project.",
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop'
  }
];

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
      name: '', role: '', company: '', text: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('portfolio_testimonials');
    if (stored) {
        setTestimonials(JSON.parse(stored));
    } else {
        setTestimonials(DEFAULT_TESTIMONIALS);
        localStorage.setItem('portfolio_testimonials', JSON.stringify(DEFAULT_TESTIMONIALS));
    }
  }, []);

  const handleAdd = (e: React.FormEvent) => {
      e.preventDefault();
      const item: Testimonial = {
          id: Date.now().toString(),
          name: newTestimonial.name || 'Anonymous',
          role: newTestimonial.role || 'Client',
          company: newTestimonial.company || '',
          text: newTestimonial.text || '',
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${newTestimonial.name}`
      };
      const updated = [item, ...testimonials];
      setTestimonials(updated);
      localStorage.setItem('portfolio_testimonials', JSON.stringify(updated));
      setIsAdding(false);
      setNewTestimonial({ name: '', role: '', company: '', text: '' });
  };

  const handleDelete = (id: string) => {
      if(window.confirm("Remove this testimonial?")) {
          const updated = testimonials.filter(t => t.id !== id);
          setTestimonials(updated);
          localStorage.setItem('portfolio_testimonials', JSON.stringify(updated));
      }
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#080c14] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 relative z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900 dark:text-white">
              Client <span className="text-violet-600 dark:text-violet-400">Stories</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Feedback from people I've collaborated with.
            </p>
          </div>
          <button 
             onClick={() => setIsAdding(!isAdding)}
             className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#131b2e] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-violet-500 transition-all shadow-sm"
           >
             <Plus size={18} /> Add Review
           </button>
        </div>

        {/* Add Form */}
        {isAdding && (
            <div className="mb-12 bg-white dark:bg-[#131b2e] p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 animate-fade-in-up">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Add New Recommendation</h3>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required placeholder="Name" value={newTestimonial.name} onChange={e => setNewTestimonial({...newTestimonial, name: e.target.value})} className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/50" />
                    <input required placeholder="Role (e.g. CTO)" value={newTestimonial.role} onChange={e => setNewTestimonial({...newTestimonial, role: e.target.value})} className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/50" />
                    <input placeholder="Company" value={newTestimonial.company} onChange={e => setNewTestimonial({...newTestimonial, company: e.target.value})} className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/50" />
                    <input required placeholder="Testimonial text..." value={newTestimonial.text} onChange={e => setNewTestimonial({...newTestimonial, text: e.target.value})} className="md:col-span-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/50" />
                    <div className="md:col-span-2 flex justify-end gap-2">
                        <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700">Save</button>
                    </div>
                </form>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
                <div 
                  key={item.id} 
                  className="group relative bg-white dark:bg-[#131b2e] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 opacity-0 animate-morph-left hover-tilt"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                    <Quote className="absolute top-8 right-8 text-violet-100 dark:text-violet-900/30 w-12 h-12 rotate-12" />
                    
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none"></div>
                    
                    <div className="flex items-center gap-1 mb-6 text-yellow-400">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed relative z-10">
                        "{item.text}"
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                        <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 dark:border-white/5" />
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</h4>
                            <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">
                                {item.role} {item.company && `@ ${item.company}`}
                            </p>
                        </div>
                    </div>

                    {/* Delete button (hidden by default, shown on hover) */}
                    <button 
                        onClick={() => handleDelete(item.id)}
                        className="absolute bottom-4 right-4 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete Review"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;