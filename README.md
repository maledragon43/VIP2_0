# VIP 2.0 - Social Video Connection App

A next-generation social app where users meet instantly through live video chat using our fun VIP Spin mechanic.

## 🚀 Features

- **VIP Spin**: Instant video matching with animated roulette-style interface
- **Live Video Chat**: High-quality WebRTC video calls with real-time messaging
- **Social Layer**: Eye Me feature for sharing moments with connections
- **VIP Subscription**: Premium features and unlimited spins
- **Virtual Gifts**: Send animated gifts during live chats
- **Group Video Rooms**: Community building with 3-6 person video rooms

## 🛠 Tech Stack

### Frontend
- **Next.js 14** with App Router - SEO-optimized with SSR/SSG
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Rapid UI development with custom VIP theme
- **Framer Motion** - Smooth animations for VIP Spin mechanic
- **React Query** - Efficient data fetching and caching

### Backend & Real-time
- **Node.js** with **Express.js** - High-performance API
- **Socket.io** - Real-time WebSocket communication
- **WebRTC** - Live video chat functionality
- **Redis** - Session management and caching

### Database
- **PostgreSQL** - Primary database for user data and matches
- **Prisma ORM** - Type-safe database access

### Authentication & Payments
- **NextAuth.js** - OAuth integration (Google, Apple, email)
- **Stripe** - Payment processing for VIP subscriptions
- **JWT** - Secure token-based authentication

### Infrastructure
- **Vercel** - Hosting with automatic deployments
- **Cloudflare** - CDN and SEO optimization

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/vip-2.0.git
cd vip-2.0
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
# Edit .env.local with your configuration
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🔧 Configuration

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `NEXTAUTH_URL` - NextAuth.js URL
- `NEXTAUTH_SECRET` - NextAuth.js secret key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

### Database Schema

The app uses Prisma with PostgreSQL. Key models include:

- **User** - User profiles, VIP status, spin counts
- **Match** - VIP Spin matches and connections
- **Connection** - Ongoing relationships between users
- **Post** - Eye Me social posts and stories
- **Payment** - VIP subscriptions and purchases

## 🎯 Core Features

### VIP Spin
The main mechanic where users tap a spinning wheel to instantly match with another user for live video chat.

### Video Chat
Real-time video communication with:
- WebRTC peer-to-peer connection
- Text messaging during video calls
- Virtual gift sending
- Connection actions (VIP Connect or Spin Again)

### Eye Me Social Layer
Social features for connected users:
- Share photos, videos, and status updates
- Stories that disappear after 24 hours
- Reactions and comments
- Virtual gift exchanges

## 💰 Monetization

- **Free Tier**: 5 spins per day for first 2 weeks
- **VIP Subscription**: $9.99/month for unlimited spins and premium features
- **Paid Spins**: $1-5 for additional spins
- **Virtual Gifts**: $0.99-99 for animated gifts
- **Post Boost**: $2.99+ to promote Eye Me posts

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Manual Deployment
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📱 Mobile App

The web app is designed to be mobile-first and can be wrapped as a PWA or native app using:
- **Capacitor** for hybrid mobile apps
- **React Native** for native mobile apps
- **PWA** features for web app installation

## 🔒 Security

- HTTPS enforced in production
- Secure authentication with NextAuth.js
- Input validation and sanitization
- Rate limiting on API endpoints
- CSRF protection
- Secure headers configuration

## 📊 SEO Optimization

- Server-side rendering with Next.js
- Structured data markup
- Open Graph and Twitter Card meta tags
- Sitemap generation
- Performance optimization
- Mobile-first responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Documentation: [docs.vip2.app](https://docs.vip2.app)
- Community: [Discord](https://discord.gg/vip2)
- Issues: [GitHub Issues](https://github.com/your-username/vip-2.0/issues)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Prisma for the excellent ORM
- All contributors and users of VIP 2.0
