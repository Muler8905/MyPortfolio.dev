import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setFormState('loading');

      // Your EmailJS Configuration
      const SERVICE_ID = 'service_6td03z4';
      const TEMPLATE_ID = 'template_0a5ldbk';
      const PUBLIC_KEY = 'CZ7ucriPjS2Ex9tLj';

      // Construct a robust data object to handle common template variable names
      // Users often name variables differently (e.g., {{name}} vs {{from_name}})
      const templateParams = {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          to_name: 'Muluken'
      };

      emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
          publicKey: PUBLIC_KEY,
      })
      .then(
          (result) => {
              console.log('Email sent successfully:', result.text);
              setFormState('success');
              setFormData({ name: '', email: '', message: '' });
              setTimeout(() => setFormState('idle'), 5000);
          },
          (error) => {
              console.error('EmailJS Failed:', error);
              setFormState('error');
              
              // extract error message safely
              let errorMessage = 'Unknown error occurred.';
              if (error && typeof error === 'object') {
                  if (error.text) errorMessage = error.text;
                  else errorMessage = JSON.stringify(error);
              } else if (typeof error === 'string') {
                  errorMessage = error;
              }

              alert(`Failed to send message. Reason: ${errorMessage}`);
              setTimeout(() => setFormState('idle'), 5000);
          },
      );
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-[#0B0F19] transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Contact Info */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                        Let's work <span className="text-violet-600">together</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        I'm currently available for freelance projects and open to full-time opportunities. 
                        If you have a project that needs some creative injection, get in touch.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#131b2e] border border-gray-100 dark:border-white/5">
                        <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl text-violet-600 dark:text-violet-400">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Email</h3>
                            <a href="mailto:mulukenugamo8@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-violet-600 transition-colors">
                                mulukenugamo8@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#131b2e] border border-gray-100 dark:border-white/5">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Phone</h3>
                            <a href="tel:+251900632624" className="text-gray-600 dark:text-gray-400 hover:text-violet-600 transition-colors">
                                +251-900-632-624
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#131b2e] border border-gray-100 dark:border-white/5">
                        <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl text-pink-600 dark:text-pink-400">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Location</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Dire Dawa City, Ethiopia
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-gray-50 dark:bg-[#131b2e] p-8 md:p-10 rounded-3xl border border-gray-100 dark:border-white/5 shadow-2xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                        <input 
                            id="name"
                            name="name" 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input 
                            id="email"
                            name="email"
                            type="email" 
                            required
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                        <textarea 
                            id="message"
                            name="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all resize-none"
                            placeholder="Tell me about your project..."
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={formState === 'loading' || formState === 'success'}
                        className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                            formState === 'success' 
                                ? 'bg-green-500 hover:bg-green-600' 
                                : formState === 'error'
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-500/25 hover:-translate-y-1'
                        }`}
                    >
                        {formState === 'idle' && (
                            <>Send Message <Send size={18} /></>
                        )}
                        {formState === 'loading' && (
                            <><Loader2 size={20} className="animate-spin" /> Sending...</>
                        )}
                        {formState === 'success' && (
                            <>Message Sent! <CheckCircle size={20} /></>
                        )}
                        {formState === 'error' && (
                            <>Failed. Try again <AlertCircle size={20} /></>
                        )}
                    </button>
                </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;