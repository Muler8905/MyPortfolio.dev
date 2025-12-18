import { Project } from './types';

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI YouTube Thumbnail Generator',
    description: 'An AI-powered SaaS platform allowing content creators to generate high-CTR thumbnails using text prompts.',
    longDescription: 'AI YouTube Thumbnail Generator is a cutting-edge SaaS application designed to revolutionize how content creators design their YouTube thumbnails. By leveraging the power of Google\'s Gemini API and advanced image generation models, users can simply describe their video concept in text, and the system generates high-quality, click-optimized thumbnails in seconds. The platform includes a drag-and-drop editor for final touches, user authentication, and a credit-based payment system.',
    tags: ['Next.js', 'React', 'Gemini API', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    imageUrl: 'https://picsum.photos/id/20/1200/800',
    repoUrl: 'https://github.com/Muler8905/-Muler8905-AI-You-tube-Thaminal-Generator',
    demoUrl: 'https://ai.studio/apps/drive/1-TUt9noZtxaxsDkKrB5dOGhyGqLZDP6P?fullscreenApplet=true',
    features: [
      'Text-to-Image Generation using Gemini Vision capabilities',
      'Real-time credit system integrated with Stripe',
      'Drag-and-drop canvas editor for text overlays',
      'Cloud storage for user asset management',
      'Responsive dashboard for analytics and history'
    ],
    challenges: 'Integrating the payment gateway securely while managing asynchronous AI generation tasks was a complex challenge. We implemented a webhook-based architecture to ensure credits are only deducted upon successful image generation.'
  },
  {
    id: '2',
    title: 'FinTech Dashboard',
    description: 'Real-time cryptocurrency trading interface with sub-millisecond updates, interactive charts, and portfolio management.',
    longDescription: 'This comprehensive FinTech Dashboard provides traders with a professional-grade interface for monitoring cryptocurrency markets. Built with performance in mind, it utilizes WebSockets for live price feeds and D3.js for rendering complex, high-frequency financial charts without rendering lag. The application supports multiple wallets, transaction history tracking, and predictive market analysis indicators.',
    tags: ['TypeScript', 'React', 'WebSocket', 'D3.js', 'Node.js', 'Redis'],
    imageUrl: 'https://picsum.photos/id/3/1200/800',
    repoUrl: 'https://github.com/Muler8905',
    demoUrl: '#',
    features: [
      'Live WebSocket data streaming for 50+ pairs',
      'Interactive candlestick charts with technical indicators',
      'Portfolio performance tracking and aggregation',
      'Dark/Light mode optimized for prolonged usage',
      'Secure JWT authentication with session management'
    ]
  },
  {
    id: '3',
    title: 'HealthTrack Pro',
    description: 'HIPAA-compliant patient management system for private clinics. Features appointment scheduling and telemedicine.',
    longDescription: 'HealthTrack Pro is a robust Electronic Health Record (EHR) system tailored for small to medium-sized private clinics. It digitizes the entire patient lifecycle, from appointment booking to diagnosis and prescription. Security was the primary focus, employing end-to-end encryption for patient data and strictly adhering to HIPAA compliance standards. It also features a built-in video consultation module using WebRTC.',
    tags: ['React Native', 'PostgreSQL', 'AWS', 'Docker', 'WebRTC', 'Node.js'],
    imageUrl: 'https://picsum.photos/id/4/1200/800',
    repoUrl: 'https://github.com/Muler8905',
    demoUrl: '#',
    features: [
      'Secure patient record management (EMR)',
      'Real-time appointment scheduling with calendar sync',
      'Integrated HD video consultation (Telemedicine)',
      'Automated prescription PDF generation',
      'Role-based access control (RBAC) for doctors and staff'
    ]
  },
  {
    id: '4',
    title: 'Fitness Hub AI',
    description: 'Personalized workout and diet plan generator using AI to tailor schedules to user biometrics.',
    longDescription: 'Fitness Hub uses generative AI to create highly personalized fitness regimes. Unlike static apps, it adapts to the user\'s progress, available equipment, and dietary restrictions. The backend processes user feedback to refine future recommendations, acting as a virtual personal trainer.',
    tags: ['React', 'OpenAI API', 'Tailwind', 'MongoDB'],
    imageUrl: 'https://picsum.photos/id/96/1200/800',
    repoUrl: 'https://github.com/Muler8905',
    demoUrl: '#',
    features: [
      'AI-generated weekly workout schedules',
      'Calorie and macro calculator based on biometrics',
      'Progress tracking with visual charts',
      'Social sharing features for accountability'
    ]
  }
];

// Data Service Helpers
export const getAllProjects = (): Project[] => {
  try {
    const stored = localStorage.getItem('portfolio_projects');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure it is an array. We allow empty arrays (length 0) to support
      // the case where the user deleted all projects.
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    // Only initialize defaults if no key exists in localStorage at all
    localStorage.setItem('portfolio_projects', JSON.stringify(DEFAULT_PROJECTS));
    return DEFAULT_PROJECTS;
  } catch (error) {
    console.error("Failed to load projects", error);
    return DEFAULT_PROJECTS;
  }
};

export const saveProjects = (projects: Project[]) => {
  try {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to save projects", error);
    alert("Failed to save changes to local storage. Storage might be full.");
  }
};