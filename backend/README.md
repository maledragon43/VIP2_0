# VIP 2.0 Backend

A modern, scalable backend for the VIP 2.0 social connection app built with NestJS, TypeScript, and PostgreSQL.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with refresh tokens
- **Real-time Communication**: WebSocket support for instant messaging and video calls
- **VIP Spin System**: Advanced matching algorithm with preferences
- **Payment Integration**: Stripe payment processing
- **WebRTC Support**: Video calling infrastructure
- **File Upload**: Image and video upload support
- **Database**: PostgreSQL with TypeORM
- **Caching**: Redis for session management and caching
- **Security**: Rate limiting, CORS, input validation
- **Monitoring**: Health checks and logging

## 🛠 Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Cache**: Redis
- **WebSockets**: Socket.IO
- **Payments**: Stripe
- **Validation**: Class-validator
- **Documentation**: Swagger/OpenAPI

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd backend
npm install
```

### 2. Environment Setup

```bash
cp env.example .env
# Edit .env with your configuration
```

### 3. Database Setup

```bash
# Start PostgreSQL and Redis
docker-compose up -d postgres redis

# Run migrations
npm run migration:run
```

### 4. Start Development Server

```bash
npm run start:dev
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/api`
- Health Check: `http://localhost:8000/health`

## 🐳 Docker Deployment

### Development

```bash
docker-compose up -d
```

### Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── common/           # Shared utilities, DTOs, filters
│   ├── database/         # Database entities and configuration
│   ├── modules/          # Feature modules
│   │   ├── auth/         # Authentication module
│   │   ├── vip/          # VIP spin functionality
│   │   ├── websocket/    # Real-time communication
│   │   ├── users/        # User management
│   │   ├── payments/     # Payment processing
│   │   ├── webrtc/       # Video calling
│   │   ├── files/        # File upload
│   │   └── notifications/ # Email/push notifications
│   └── main.ts          # Application entry point
├── docker-compose.yml   # Docker services
├── nginx.conf          # Nginx configuration
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | localhost |
| `DB_PORT` | PostgreSQL port | 5432 |
| `DB_USERNAME` | Database username | vip2_user |
| `DB_PASSWORD` | Database password | vip2_password |
| `DB_NAME` | Database name | vip2_0 |
| `REDIS_HOST` | Redis host | localhost |
| `JWT_SECRET` | JWT secret key | - |
| `STRIPE_SECRET_KEY` | Stripe secret key | - |

## 🔐 Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Input validation
- SQL injection prevention
- XSS protection

## 📊 Monitoring

- Health check endpoint: `/health`
- Request logging
- Error tracking
- Performance metrics

## 🚀 Deployment

### VPS Deployment

1. **Server Setup**:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   
   # Install Docker Compose
   sudo apt install docker-compose-plugin
   ```

2. **Deploy Application**:
   ```bash
   # Clone repository
   git clone <your-repo>
   cd vip2_0/backend
   
   # Configure environment
   cp env.example .env
   # Edit .env with production values
   
   # Start services
   docker-compose up -d
   ```

3. **SSL Setup**:
   ```bash
   # Install Certbot
   sudo apt install certbot
   
   # Generate SSL certificate
   sudo certbot certonly --standalone -d yourdomain.com
   
   # Copy certificates to nginx
   sudo cp /etc/letsencrypt/live/yourdomain.com/*.pem ./ssl/
   ```

### Environment-Specific Configs

- **Development**: `npm run start:dev`
- **Production**: `npm run start:prod`
- **Docker**: `docker-compose up -d`

## 🔄 Database Migrations

```bash
# Generate migration
npm run migration:generate -- src/migrations/AddNewFeature

# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📈 Performance

- Database indexing
- Query optimization
- Redis caching
- Connection pooling
- Rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@vip2.app or create an issue in the repository.
