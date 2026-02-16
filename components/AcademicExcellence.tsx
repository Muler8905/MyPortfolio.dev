import React, { useState } from 'react';
import { Award, GraduationCap, Trophy, Star, X, ZoomIn } from 'lucide-react';

interface AcademicCard {
  id: string;
  title: string;
  institution: string;
  result: string;
  year: string;
  icon: 'award' | 'graduation' | 'trophy' | 'star';
  color: string;
  certificateImage?: string;
}

const academicData: AcademicCard[] = [
  {
    id: '1',
    title: 'Ministry Exam',
    institution: 'Ethiopian Ministry of Education',
    result: '99.8%',
    year: '2019',
    icon: 'trophy',
    color: 'from-amber-500 to-orange-600',
    certificateImage: '/certificates/ministry-cert.jpg'
  },
  {
    id: '2',
    title: 'Preparatory School',
    institution: 'Aleta Wendo Preparatory School',
    result: 'GPA 3.6/4.0',
    year: '2021',
    icon: 'award',
    color: 'from-blue-500 to-cyan-600',
    certificateImage: '/certificates/preparatory-cert.jpg'
  },
  {
    id: '3',
    title: 'University Entrance',
    institution: 'National Entrance Examination',
    result: '444/700',
    year: '2023',
    icon: 'star',
    color: 'from-violet-500 to-purple-600',
    certificateImage: '/certificates/entrance-cert.jpg'
  },
  {
    id: '4',
    title: 'University (Current)',
    institution: 'Dire Dawa University',
    result: 'CGPA 3.54/4.0',
    year: '2023 - 2027',
    icon: 'graduation',
    color: 'from-emerald-500 to-teal-600'
  }
];

const AcademicExcellence: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'trophy': return <Trophy size={28} />;
      case 'award': return <Award size={28} />;
      case 'star': return <Star size={28} />;
      case 'graduation': return <GraduationCap size={28} />;
      default: return <Award size={28} />;
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-[#0B0F19] transition-colors duration-300 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-blob [animation-delay:2s]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 text-sm font-medium mb-6">
            <GraduationCap size={16} />
            <span>Academic Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900 dark:text-white">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400">Excellence</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            A track record of consistent academic achievement and dedication to learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {academicData.map((item, index) => (
            <div
              key={item.id}
              onClick={() => item.certificateImage && setSelectedCertificate(item.certificateImage)}
              className={`fade-up-on-scroll group relative bg-gradient-to-br from-white to-gray-50 dark:from-[#131b2e] dark:to-[#0d1420] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 overflow-hidden ${item.certificateImage ? 'cursor-pointer' : ''}`}
            >
              {/* Certificate preview overlay on hover */}
              {item.certificateImage && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                  <img 
                    src={item.certificateImage} 
                    alt={`${item.title} Certificate`}
                    className="w-full h-full object-cover opacity-20 blur-sm"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <ZoomIn size={20} />
                      <span>View Certificate</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Animated gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Icon with gradient background */}
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                {getIcon(item.icon)}
                
                {/* Pulse ring on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 blur-md"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${item.color} transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {item.institution}
                </p>
                
                {/* Result badge */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300 inline-block">
                      {item.result}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
                      {item.year}
                    </p>
                  </div>
                </div>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <div className={`w-full h-full bg-gradient-to-br ${item.color} rounded-bl-full`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setSelectedCertificate(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-[#131b2e] rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-black/80 rounded-full text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white transition-all shadow-lg"
            >
              <X size={24} />
            </button>
            <div className="overflow-auto max-h-[90vh] p-4">
              <img 
                src={selectedCertificate} 
                alt="Certificate" 
                className="w-full h-auto rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default AcademicExcellence;
