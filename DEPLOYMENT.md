# Portfolio Deployment Guide

## 🚀 Deploy to Vercel

### Quick Deploy
1. **Fork/Clone** this repository
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub: `Muler8905/MyPortfolio.dev`
   - Select the `feature/academic-excellence-and-animations` branch

### Environment Variables
Set these in Vercel dashboard:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## 📁 File Structure
```
public/
├── certificates/          # Replace with actual certificates
│   ├── ministry-cert.jpg
│   ├── entrance-cert.jpg
│   └── preparatory-cert.jpg
└── muluken-banner.png    # Replace with actual banner

src/
├── components/           # React components
├── services/            # API services
└── types.ts            # TypeScript types
```

## 🔧 Local Development
```bash
npm install
npm run dev
```

## 🏗️ Build for Production
```bash
npm run build
npm run preview
```

## ✨ Features Included
- ✅ Academic Excellence section with certificates
- ✅ Professional morphing animations
- ✅ Ethiopian client testimonials
- ✅ Gemini AI chat integration
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Performance optimized

## 📝 Post-Deployment Tasks
1. Replace placeholder images in `/public/certificates/`
2. Replace `/public/muluken-banner.png` with actual banner
3. Add Gemini API key to environment variables
4. Test all functionality
5. Update social media links if needed

## 🌐 Live Demo
Once deployed, your portfolio will be available at:
- Vercel URL: `https://your-project.vercel.app`
- Custom domain: `https://muluken.dev` (if configured)