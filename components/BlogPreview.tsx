import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogPreviewProps {
  onSeeMore: () => void;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ onSeeMore }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const defaultPosts: BlogPost[] = [
      {
        id: '1',
        title: 'The Future of Full Stack in 2025',
        excerpt: 'Exploring how AI and Serverless architectures are redefining the role of a Full Stack Developer.',
        content: `The landscape of full-stack development is rapidly evolving. By 2025, the definition of a "Full Stack Developer" will likely shift from someone who builds the entire stack to someone who orchestrates it.

Serverless architecture and Edge Computing are moving from niche to norm. Tools like Vercel and Cloudflare Workers allow us to run compute at the edge, reducing latency and removing the need for traditional server management. Database management is following suit with serverless SQL databases like Neon and PlanetScale.

Furthermore, AI-driven coding assistants are becoming integral. They handle boilerplate code, unit tests, and even complex refactoring. This doesn't replace the developer but elevates them to an architect role, focusing on system design, security, and business logic rather than syntax. The future belongs to those who can integrate these disparate services into a cohesive, performant product.`,
        author: 'Muluken Ugamo',
        date: 'Oct 12, 2024',
        category: 'Tech Trends',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
        readTime: '5 min read'
      },
      {
        id: '2',
        title: 'Mastering Tailwind CSS for Scalable UI',
        excerpt: 'Why utility-first CSS is winning and how to organize your components for long-term maintenance.',
        content: `Tailwind CSS has polarized the community, but its value proposition for scalability is undeniable. The utility-first approach solves one of the hardest problems in CSS: maintainability.

In large-scale applications, the traditional "semantic class" approach often leads to append-only stylesheets. Developers are afraid to delete classes because they don't know what might break. Tailwind removes this fear. Styles are local to the markup.

To master Tailwind for scale, you must embrace componentization. Don't use @apply prematurely. Instead, build small, reusable React components (Buttons, Cards, Inputs) that encapsulate the utility classes. Use tools like clsx and tailwind-merge to allow for clean overrides. This "Component-First" architecture, combined with a strict tailwind.config.js design system, is the secret to keeping your UI consistent as your team grows.`,
        author: 'Muluken Ugamo',
        date: 'Sep 28, 2024',
        category: 'Frontend',
        imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop',
        readTime: '8 min read'
      },
      {
        id: '3',
        title: 'Building AI Agents with Gemini API',
        excerpt: 'A step-by-step guide to integrating Google Gemini into your React applications for smarter UX.',
        content: `Integrating AI into web applications is no longer just a cool feature; it's a user expectation. Google's Gemini API provides a powerful, multimodal entry point for developers.

In this guide, we look at building a "Smart Document Assistant". The architecture is straightforward: React on the frontend, a Node.js proxy for security, and the Google GenAI SDK.

Key to success is "System Instructions". By giving the model a persona and strict rules before the user even types a query, you control the output quality. For example, telling Gemini "You are a helpful coding tutor who only answers in JSON" drastically changes the utility of the response. We also explore "Streaming", which is crucial for UX. Instead of waiting 5 seconds for a full answer, streaming allows the user to see text appear in real-time, making the application feel instantaneous.`,
        author: 'Muluken Ugamo',
        date: 'Aug 15, 2024',
        category: 'AI Engineering',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
        readTime: '10 min read'
      }
    ];

    // Check local storage first
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      // Fix: If stored posts exist but have empty content (from previous run), overwrite them with default rich content
      if (parsedPosts.length > 0 && !parsedPosts[0].content) {
        setPosts(defaultPosts);
        localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
      } else {
        setPosts(parsedPosts.slice(0, 3));
      }
    } else {
      // Default initial data
      setPosts(defaultPosts);
      localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
    }
  }, []);

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#080c14] transition-colors duration-300 border-t border-gray-200 dark:border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900 dark:text-white">
              Latest <span className="text-violet-600 dark:text-violet-400">Insights</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Thoughts on technology, software engineering, and the future of AI.
            </p>
          </div>
          <button 
            onClick={onSeeMore}
            className="group flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
          >
            Read all articles
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {posts.map((post, index) => (
            <div 
              key={post.id}
              onClick={onSeeMore}
              className="group cursor-pointer bg-white dark:bg-[#131b2e] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 opacity-0 animate-morph-top hover-lift"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wide">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-violet-600 dark:text-violet-400 font-medium text-sm group-hover:underline decoration-2 underline-offset-4">
                  Read Article
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;