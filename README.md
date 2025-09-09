# Hosvi - Marketing Site & Client Portal

A modern, gradient-driven marketing site and secure client portal for lead generation services targeting chiropractors and med spas in Florida.

## Features

- **Marketing Landing Page**: Compelling hero with gradient backgrounds, value propositions, and pricing plans
- **30-Day Free Trial**: Self-serve onboarding with automatic conversion
- **Client Dashboard**: Real-time KPI tracking, analytics, and growth metrics
- **Admin Portal**: Monitor all client accounts and performance
- **Role-Based Authentication**: Secure access control with NextAuth.js
- **Data Visualization**: Interactive charts with Recharts
- **CSV Export**: Export leads and campaign data
- **Responsive Design**: Mobile-first approach with accessibility compliance

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom gradient system
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with credentials provider
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- NPM or Yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hosvi-marketing-portal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```
DATABASE_URL="postgresql://username:password@localhost:5432/hosvi_dev"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/your-account/consultation"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
```

## Default Login Credentials

After seeding the database:
- **Admin**: admin@hosvi.com / admin123
- **Demo Client**: demo@clinic.com / demo123

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── dashboard/         # Client dashboard
│   ├── admin/             # Admin portal
│   └── trial/             # Trial signup
├── components/            # Reusable components
├── lib/                   # Utility functions
├── prisma/                # Database schema and migrations
└── public/                # Static assets
```

## Key Components

### Landing Page (`/`)
- Hero section with gradient background
- Benefits and services overview
- Pricing plans comparison
- Call-to-action for free trial

### Trial Signup (`/trial`)
- Multi-step onboarding form
- Plan selection (Basic $1,500/mo, Premium $3,000/mo)
- Demo data generation for new accounts

### Client Dashboard (`/dashboard`)
- KPI metrics display
- Interactive charts and graphs
- Lead management table
- Campaign performance tracking
- Growth since registration metrics
- CSV export functionality

### Admin Portal (`/admin`)
- Organization overview
- Client account monitoring
- Usage statistics
- Account status tracking

## Database Schema

Key models:
- **User**: Authentication and role management
- **Org**: Organization/client accounts
- **Lead**: Lead tracking and management
- **Campaign**: Email campaign performance
- **KpiDaily**: Daily metrics aggregation

## API Endpoints

- `POST /api/trial/start` - Create new trial account
- `GET /api/dashboard/summary` - Dashboard data
- `GET /api/dashboard/export.csv` - Data export
- `GET /api/admin/orgs` - Admin organization list

## Deployment

1. Build the application:
```bash
npm run build
```

2. Set up production database and environment variables

3. Run database migrations:
```bash
npx prisma migrate deploy
```

4. Start the production server:
```bash
npm start
```

## Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Application URL
- `NEXTAUTH_SECRET` - Authentication secret
- `NEXT_PUBLIC_CALENDLY_URL` - Calendly booking link

## Security Features

- Password hashing with bcryptjs
- JWT-based session management
- Role-based access control
- Server-side authorization checks
- Input validation and sanitization
- CSRF protection via NextAuth.js

## Performance Optimization

- Server-side rendering with Next.js
- Image optimization
- Code splitting and lazy loading
- Responsive design with mobile-first approach
- Optimized database queries with Prisma

## Accessibility

- WCAG AA compliance
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast color schemes
- Reduced motion support

## License

This project is proprietary and confidential.