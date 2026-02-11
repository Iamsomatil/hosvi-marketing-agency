# Hosvi - Referral Coordination for Personal Injury Cases

A modern marketing website for Hosvi, a referral coordination platform that connects personal injury law firms with treatment provider clinics (chiropractors and physical therapists) that accept personal injury cases.

## Overview

Hosvi streamlines the referral process by:
- Helping personal injury paralegals quickly place clients with vetted treatment providers
- Enabling clinics to receive consistent patient referrals from law firms
- Reducing friction in the treatment placement workflow

## Features

- **Modern Marketing Landing Page** - Responsive hero section with mission-aligned imagery
- **How It Works Section** - Clear 3-step process explanation
- **Who We Serve** - Highlights for law firms and treatment providers
- **Contact Section** - Email-based inquiry form with rate limiting
- **Floating Chat Widget** - AI-powered chatbot for visitor engagement
- **Mobile-First Design** - Fully responsive across all devices
- **Smooth Animations** - Framer Motion for polished interactions

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Resend
- **Chat**: OpenAI API
- **UI Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hosvi-marketing-agency
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```
RESEND_API_KEY="your_resend_api_key"
OPENAI_API_KEY="your_openai_api_key"
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with navbar and footer
│   ├── page.tsx             # Home page
│   ├── about/               # About page
│   ├── privacy/             # Privacy policy
│   ├── terms/               # Terms of service
│   ├── cookies/             # Cookie policy
│   ├── home/
│   │   ├── HomePageClient.tsx     # Hero and main sections
│   │   └── ContactSection.tsx     # Contact form
│   ├── api/
│   │   ├── contact/route.ts       # Contact form submission
│   │   └── chat/route.ts          # Chatbot API
│   └── globals.css          # Global styles
├── components/
│   ├── NavBar.tsx           # Navigation bar
│   ├── Footer.tsx           # Footer with links
│   ├── ChatWidget.tsx       # Floating chat widget
│   └── ui/                  # UI utility components
├── lib/
│   └── utils.ts             # Utility functions
├── public/
│   ├── hero-hosvi.png       # Hero section image
│   ├── testimonial-*.png    # Testimonial images
│   └── robots.txt
├── package.json
└── README.md
```

## Key Pages

### Home (`/`)
- Hero section with hero image and call-to-action
- How It Works process steps
- Who We Serve sections
- Contact form
- Final CTA section

### About (`/about`)
- Company mission and values
- Service overview
- Benefits for law firms and clinics

### Legal Pages
- **Privacy Policy** (`/privacy`)
- **Terms of Service** (`/terms`)
- **Cookie Policy** (`/cookies`)

## API Endpoints

- `POST /api/contact` - Submit contact form
- `POST /api/chat` - Chat widget messages

## Environment Variables

- `RESEND_API_KEY` - API key for email service (contact form)
- `OPENAI_API_KEY` - API key for chatbot responses

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to your hosting provider (Vercel, Netlify, etc.)

3. Set environment variables in your hosting platform

## Design Features

- **Gradient backgrounds** for modern visual appeal
- **Responsive grid layouts** that adapt to all screen sizes
- **Smooth animations** with Framer Motion for interactivity
- **Accessible color schemes** with proper contrast ratios
- **Mobile-first approach** ensuring excellent UX on all devices

## Security

- Rate limiting on contact and chat endpoints
- Input validation and sanitization
- CORS-safe API design
- No sensitive data in frontend code

## Performance

- Server-side rendering with Next.js
- Optimized images with Next.js Image component
- Code splitting and lazy loading
- Responsive images for different screen sizes

## Contact & Support

For inquiries or partnerships:
- Email: info@hosvi.com
- Phone: (754) 207-0982

## License

This project is proprietary and confidential.
