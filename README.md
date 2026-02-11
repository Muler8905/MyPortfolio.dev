# 🚀 Muluken.dev | Full Stack Engineer Portfolio

A high-performance, aesthetically pleasing personal portfolio for a Full Stack Developer and Software Engineer. This project features a modern dark-themed UI, an interactive AI assistant powered by Google Gemini, and a built-in content management system that syncs directly with GitHub.

## ✨ Features

- **🤖 AI Assistant**: Integrated Gemini 2.5 Flash API that acts as a personal agent to answer questions about skills, projects, and background.
- **🛠️ Built-in CMS**: Manage your projects and blog posts directly from the UI with full CRUD (Create, Read, Update, Delete) capabilities.
- **🔄 GitHub Sync**: A unique feature that allows you to "Commit and Push" your UI changes back to your GitHub repository using the REST API.
- **📄 Dynamic CV Generation**: One-click PDF resume generation using `jsPDF` with a professional layout.
- **🌓 Dark/Light Mode**: Fully responsive theme switching with a smooth star-background transition for dark mode.
- **📧 Contact System**: Real-time email notifications via `EmailJS`.
- **📱 Responsive Design**: Optimized for all devices using Tailwind CSS and mobile-first principles.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **AI**: Google Gemini API (@google/genai)
- **Persistence**: LocalStorage + GitHub REST API
- **Deployment**: GitHub Actions + GitHub Pages
- **Utilities**: EmailJS, jsPDF

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- A Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Muler8905/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

## 📦 Deployment

This project is pre-configured for **GitHub Pages** via GitHub Actions.

1. Go to your GitHub Repository **Settings > Secrets and variables > Actions**.
2. Add a **New repository secret**:
   - Name: `API_KEY`
   - Value: Your Gemini API Key.
3. Push your code to the `main` branch. 
4. The workflow in `.github/workflows/deploy.yml` will automatically build and deploy to the `gh-pages` branch.

## 🔄 How GitHub Sync Works

To make updates to your live site without touching code:
1. Navigate to the **Projects** or **Blog** page.
2. Add/Edit your content.
3. Click the **"Push to GitHub"** button.
4. Enter your **GitHub Username**, **Repo Name**, and a **Personal Access Token** (with `repo` scope).
5. The app will commit the updated JSON data to your repository, triggering a new build automatically!

## 🤝 Contact

**Muluken Ugamo**  
- 📧 Email: [mulukenugamo8@gmail.com](mailto:mulukenugamo8@gmail.com)  
- 📱 Phone: +251-900-632-624  
- ✈️ Telegram: [@Muler_soft](https://t.me/Muler_soft)  
- 🐙 GitHub: [Muler8905](https://github.com/Muler8905)

---
*Built with ❤️ and AI integration.*
