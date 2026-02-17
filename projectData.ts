import { Project } from './types';

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI YouTube Thumbnail Generator',
    description: 'An AI-powered SaaS platform allowing content creators to generate high-CTR thumbnails using text prompts.',
    longDescription: 'AI YouTube Thumbnail Generator is a cutting-edge SaaS application designed to revolutionize how content creators design their YouTube thumbnails. By leveraging the power of Google\'s Gemini API and advanced image generation models, users can simply describe their video concept in text, and the system generates high-quality, click-optimized thumbnails in seconds. The platform includes a drag-and-drop editor for final touches, user authentication, and a credit-based payment system.',
    tags: ['Next.js', 'React', 'Gemini API', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    imageUrl: 'https://i.ytimg.com/vi/fFDfd2ZhYjk/maxresdefault.jpg',
    repoUrl: 'https://github.com/Muler8905/AI-YouTube-Thumbnail-Generator',
    demoUrl: 'https://ai-you-tube-thumbnail-generator-indol.vercel.app/',
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
    title: 'Event Registration System',
    description: 'A comprehensive, full-stack event registration system built with React, Node.js, and modern web technologies. Features real-time analytics, professional UI/UX, and enterprise-grade functionality.',
    longDescription: 'TAn Event Registration System is a web-based application that allows organizers to create, manage, and monitor events while enabling users to browse and register for events online. The system streamlines the registration process by providing features such as event listing, attendee management, online booking, and automated notifications. It improves event organization efficiency, reduces manual workload, and enhances user experience through a simple and interactive interface.',
    tags: ['TypeScript', 'React', 'WebSocket', 'D3.js', 'Node.js', 'Redis'],
    imageUrl: 'https://media.gettyimages.com/id/1641611858/photo/asian-event-participants-guest-registering-at-reception-desk-attending-business-conference.jpg?s=612x612&w=0&k=20&c=H9gFODAe4Mj0LZcuuNQE9WHgN7RR4a9Y9cGLcIVKtvE=',
    repoUrl: 'https://github.com/Muler8905/Event_Registration_System',
    demoUrl: 'https://muler8905.github.io/Event_Registration_System/',
    features: [
      
      '🚀 Key Features',
'Core Functionality',
'User Management: Registration, authentication, and profile management with JWT',
'Event Management: Create, edit, delete, and manage events with full CRUD operations',
'Registration System: Event registration with capacity management and status tracking',
'Admin Dashboard: Comprehensive admin panel with real-time analytics and monitoring',
'Email Notifications: Automated email confirmations and notifications',
'Advanced Features ✨',
'Real-time Analytics: Live dashboard updates with WebSocket connections',
'Professional Charts: Interactive data visualizations with smooth animations',
'Advanced Navigation: Forward/back navigation with breadcrumb trails',
'Dynamic Footer: Context-aware footer with admin-specific navigation',
'Export Functionality: CSV export and comprehensive data backup capabilities',
'System Health Monitoring: Real-time system status and performance metrics',
'Live Activity Feed: Real-time activity tracking with filtering and categorization'
    ]
  },
 
   {
    id: '3',
    title: 'Fitness Hub AI',
    description: 'Personalized workout and diet plan generator using AI to tailor schedules to user biometrics.',
    longDescription: 'Fitness Hub uses generative AI to create highly personalized fitness regimes. Unlike static apps, it adapts to the user\'s progress, available equipment, and dietary restrictions. The backend processes user feedback to refine future recommendations, acting as a virtual personal trainer.',
    tags: ['React', 'OpenAI API', 'Tailwind', 'MongoDB'],
    imageUrl: 'https://img.freepik.com/free-vector/sport-youtube-thumbnail-template_23-2148599067.jpg?t=st=1771012609~exp=1771016209~hmac=b9eba3bdd485e545a226c6f11b9d0d835f960479c2e7935fb3167dfcb6a11fea',
    repoUrl: 'https://github.com/Muler8905',
    demoUrl: 'https://6000-firebase-studio-1752541410920.cluster-6vyo4gb53jczovun3dxslzjahs.cloudworkstations.dev/',
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
