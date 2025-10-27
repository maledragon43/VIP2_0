# VIP 2.0 - Social Video Connection App

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, set up your environment variables by copying the example file:

```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:

- Database URL (PostgreSQL)
- Redis URL
- NextAuth.js secrets
- OAuth provider credentials (Google, Apple)
- Stripe API keys

## Database Setup

Generate Prisma client and push the schema:

```bash
npx prisma generate
npx prisma db push
```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Key Features

- **VIP Spin**: Animated roulette-style matching interface
- **Live Video Chat**: WebRTC-powered video calls
- **Real-time Messaging**: Socket.io for instant communication
- **Social Layer**: Eye Me posts and stories
- **VIP Subscription**: Premium features and unlimited spins
- **Virtual Gifts**: Animated gifts during video chats

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main app interface
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── home/              # Homepage sections
│   ├── layout/            # Layout components
│   └── vip/               # VIP Spin and video chat
├── pages/api/             # API routes
├── prisma/                # Database schema
└── public/                # Static assets
```

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, Socket.io, WebRTC
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Deployment**: Vercel

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
