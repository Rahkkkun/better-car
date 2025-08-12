# 🚗 Better-Car

> **Advanced AI Car Search and Test Drive Platform**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-blue?style=for-the-badge&logo=vercel)](https://better-car-ymi5.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📹 Demo

> **🎥 Screen Recording Coming Soon!**
> 
> A comprehensive demo video showcasing the platform's features will be added here soon.

## 🌟 Overview

Better-Car is a modern, AI-powered car search and test drive booking platform that connects car enthusiasts with their dream vehicles. Built with cutting-edge technologies, it offers an intuitive user experience for browsing, searching, and booking test drives for thousands of verified vehicles.

### ✨ Key Features

- 🔍 **Advanced Car Search** - Filter by make, model, year, price, and more
- 🤖 **AI-Powered Recommendations** - Smart suggestions based on user preferences
- 📅 **Easy Test Drive Booking** - Seamless online booking with flexible scheduling
- 👤 **User Authentication** - Secure sign-up and sign-in with Clerk
- 💾 **Saved Cars** - Save and manage your favorite vehicles
- 📱 **Responsive Design** - Optimized for all devices
- 🌙 **Dark/Light Mode** - Beautiful theme switching
- 🔒 **Secure Process** - Verified listings and secure booking
- 📊 **Admin Dashboard** - Comprehensive management tools for dealerships

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling with validation
- **Zod** - TypeScript-first schema validation

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **Prisma** - Database ORM
- **PostgreSQL** - Relational database

### Authentication & Security
- **Clerk** - User authentication and management
- **Arcjet** - Rate limiting and security

### AI & Integrations
- **Google Generative AI** - AI-powered features
- **React Dropzone** - File upload handling

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler
- **TypeScript** - Type safety

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account
- Clerk account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/better-car.git
   cd better-car
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Google AI
   GOOGLE_AI_API_KEY=your_google_ai_key
   
   # Arcjet
   ARCJET_KEY=your_arcjet_key
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
better-car/
├── app/                    # Next.js App Router
│   ├── (admin)/           # Admin routes
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main application routes
│   └── api/               # API routes
├── components/            # Reusable UI components
│   └── ui/               # Radix UI components
├── lib/                  # Utility functions and configurations
├── hooks/                # Custom React hooks
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🎯 Features in Detail

### For Users
- **Browse Cars** - View thousands of verified vehicles
- **Advanced Filters** - Filter by make, model, year, price, body type
- **Car Details** - Comprehensive vehicle information with images
- **Test Drive Booking** - Easy online booking system
- **Saved Cars** - Save and manage favorite vehicles
- **Reservations** - Track your test drive bookings
- **Responsive Design** - Works perfectly on all devices

### For Admins
- **Car Management** - Add, edit, and manage vehicle listings
- **Test Drive Dashboard** - Monitor and manage test drive requests
- **User Management** - View and manage user accounts
- **Settings** - Configure platform settings
- **Analytics** - View platform statistics

## 🚀 Deployment

The easiest way to deploy Better-Car is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/better-car)

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Clerk](https://clerk.com/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling
- [Radix UI](https://www.radix-ui.com/) for accessible components

## 📞 Contact

- **Website**: [https://better-car-ymi5.vercel.app/](https://better-car-ymi5.vercel.app/)
- **Email**: info@bettercar.com
- **Phone**: +1 (234) 567-890

---

<div align="center">
  <p>Made with ❤️ by the Better-Car Team</p>
  <p>Driving innovation and excellence in the automotive industry</p>
</div>
