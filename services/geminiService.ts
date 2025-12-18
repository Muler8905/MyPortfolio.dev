import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini Client
// Note: In a production environment, you should proxy these requests through a backend
// to avoid exposing the API key in the client bundle.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PORTFOLIO_CONTEXT = `
You are an AI assistant for Muluken Ugamo's personal portfolio website.
Muluken is a passionate Full Stack Developer and Software Engineering student (BSc) at Dire Dawa University (Class of 2027).
He is based in Aleta Wendo / Dire Dawa, Ethiopia.

Profile Summary:
- Passionate about building scalable digital experiences and AI integration.
- Strong foundation in Software Engineering, database management, and RESTful API design.
- Open to new opportunities and collaborations.

Key Technical Skills:
- Frontend: React.js, Next.js, HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, Responsive Design.
- Backend: Node.js, Express.js, Python, Go, RESTful APIs, JWT Authentication.
- Databases: PostgreSQL, MySQL, MongoDB, Redis.
- AI & Tools: Gemini API, LangChain, Git, GitHub, VS Code, Figma.

Projects:
1. "Fitness Hub" - An AI-powered fitness platform creating personalized workout/diet plans (React, Tailwind, AI).
2. "Neon AI Thumbnail" - A SaaS platform for generating high-CTR thumbnails using text prompts (Next.js, Gemini API, Stripe).
3. "HealthTrack Pro" - Patient management system (PostgreSQL, AWS, Docker).
4. "FinTech Dashboard" - Real-time crypto trading interface (TypeScript, WebSocket).
5. "Personal Portfolio" - The site the user is currently visiting.

Contact Info:
- Email: mulukenugamo8@gmail.com
- Phone: +251-900-632-624
- Telegram: @Muler_soft
- GitHub: https://github.com/Muler8905

Tone & Style:
- Be friendly, professional, and enthusiastic.
- Answer questions specifically about Muluken's background and skills.
- If asked about services, highlight his full-stack and AI capabilities.
- Keep answers concise and engaging.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "I'm currently in demo mode (API Key missing). I can tell you that Muluken is a skilled Full Stack Developer specializing in React and AI integration!";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: PORTFOLIO_CONTEXT,
      },
    });
    
    return response.text || "I processed that, but couldn't generate a text response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I seem to be having trouble connecting to the neural network right now. Please try again later.";
  }
};