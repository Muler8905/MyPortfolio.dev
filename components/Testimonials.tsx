import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star, Plus, Trash2, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

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

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
      name: '', role: '', company: '', text: ''
  });
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('portfolio_testimonials');
    if (stored) {
        setTestimonials(JSON.parse(stored));
    } else {
        setTestimonials(DEFAULT_TESTIMONIALS);
        localStorage.setItem('portfolio_testimonials', JSON.stringify(DEFAULT_TESTIMONIALS));
    }
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, AUTO_SLIDE_INTERVAL);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

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
          <div className="flex items-center gap-3">
            <button 
               onClick={toggleAutoPlay}
               className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#131b2e] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-violet-500 transition-all shadow-sm"
               title={isAutoPlaying ? "Pause auto-slide" : "Resume auto-slide"}
             >
               {isAutoPlaying ? <Pause size={18} /> : <Play size={18} />}
             </button>
            <button 
               onClick={() => setIsAdding(!isAdding)}
               className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#131b2e] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl font-semibold hover:border-violet-500 transition-all shadow-sm"
             >
               <Plus size={18} /> Add Review
             </button>
          </div>
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

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-3 bg-white dark:bg-[#131b2e] border border-gray-200 dark:border-white/10 rounded-full shadow-lg hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 transition-all hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-3 bg-white dark:bg-[#131b2e] border border-gray-200 dark:border-white/10 rounded-full shadow-lg hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 transition-all hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slides */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((item) => (
                <div 
                  key={item.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="group relative bg-white dark:bg-[#131b2e] p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-white/5 hover:shadow-2xl transition-all duration-300 max-w-4xl mx-auto">
                    <Quote className="absolute top-8 right-8 text-violet-100 dark:text-violet-900/30 w-16 h-16 rotate-12" />
                    
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none"></div>
                    
                    <div className="flex items-center gap-1 mb-6 text-yellow-400">
                        {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-10 leading-relaxed relative z-10 italic">
                        "{item.text}"
                    </p>

                    <div className="flex items-center gap-5 mt-auto">
                        <img src={item.avatar} alt={item.name} className="w-16 h-16 rounded-full object-cover border-4 border-gray-100 dark:border-white/5 shadow-lg" />
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{item.name}</h4>
                            <p className="text-sm text-violet-600 dark:text-violet-400 font-medium">
                                {item.role} {item.company && `@ ${item.company}`}
                            </p>
                        </div>
                    </div>

                    {/* Delete button (hidden by default, shown on hover) */}
                    <button 
                        onClick={() => handleDelete(item.id)}
                        className="absolute bottom-6 right-6 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete Review"
                    >
                        <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-violet-600 dark:bg-violet-400'
                    : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-violet-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;