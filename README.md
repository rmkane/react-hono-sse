# React + Hono + SSE

A full-stack application with React frontend, Hono backend, and Server-Sent Events for real-time communication.

## Architecture

- **Frontend**: React with Vite and TypeScript
- **Backend**: Hono server with TypeScript
- **Real-time**: Server-Sent Events (SSE) for live updates
- **Containerization**: Docker with separate dev and prod configurations

## Project Structure

```none
├── client/                 # React frontend
│   ├── src/
│   ├── Dockerfile          # Development Dockerfile
│   ├── Dockerfile.prod     # Production Dockerfile
│   └── nginx.conf          # Nginx configuration for production
├── server/                 # Hono backend
│   ├── src/
│   ├── Dockerfile          # Development Dockerfile
│   └── Dockerfile.prod     # Production Dockerfile
├── docker-compose.dev.yml  # Development Docker Compose
├── docker-compose.prod.yml # Production Docker Compose
└── package.json           # Root workspace configuration
```

## Features

- **API Endpoints**:
  - `GET /api/hello` - Simple hello message
  - `GET /api/time` - Server timestamp and timezone
  - `GET /api/sse` - Server-Sent Events stream
  - `GET /health` - Health check endpoint

- **Real-time Updates**: Live data streaming via SSE
- **CORS Support**: Cross-origin requests enabled
- **Docker Support**: Both development and production containers

## Quick Start

### Development (Local)

1. **Install dependencies**:

   ```bash
   make install
   ```

2. **Start both client and server**:

   ```bash
   make dev
   ```

3. **Access the application**:
   - Frontend: <http://localhost:5173>
   - Backend API: <http://localhost:3001>

### Development (Docker)

1. **Start with Docker Compose**:

   ```bash
   make docker-dev
   ```

2. **Access the application**:
   - Frontend: <http://localhost:5173>
   - Backend API: <http://localhost:3001>

### Production (Docker)

1. **Build and start production containers**:

   ```bash
   make docker-prod
   ```

2. **Access the application**:
   - Frontend: <http://localhost:80>
   - Backend API: <http://localhost:3001>

## Host/Port Reference

| Environment     | Frontend                | Backend                 | Notes                 |
|-----------------|-------------------------|-------------------------|-----------------------|
| **Local Dev**   | <http://localhost:5173> | <http://localhost:3001> | Vite dev server       |
| **Docker Dev**  | <http://localhost:5173> | <http://localhost:3001> | Same ports as local   |
| **Docker Prod** | <http://localhost:80>   | <http://localhost:3001> | Nginx serves frontend |
| **Local Prod**  | <http://localhost:4173> | <http://localhost:3001> | Vite preview server   |

## Available Scripts

### Root Level

- `make dev` - Start both client and server in development mode
- `make dev-client` - Start only the React client
- `make dev-server` - Start only the Hono server
- `make build` - Build both client and server
- `make start` - Start production servers locally
- `make docker-dev` - Start development environment with Docker
- `make docker-prod` - Start production environment with Docker
- `make docker-down` - Stop all Docker containers
- `make install` - Install dependencies for all packages
- `make clean` - Clean all build artifacts and node_modules
- `make format` - Format code with Prettier

### Client Scripts

- `pnpm run dev` - Start Vite development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build

### Server Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build TypeScript to JavaScript
- `pnpm start` - Start production server

## API Endpoints

### Health Check

```bash
curl http://localhost:3001/health
```

### Hello Message

```bash
curl http://localhost:3001/api/hello
```

### Server Time

```bash
curl http://localhost:3001/api/time
```

### Server-Sent Events

```bash
curl -N http://localhost:3001/api/sse
```

## Environment Variables

### Server

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

### Client

- `VITE_SERVER_URL` - Backend server URL (default: <http://localhost:3001>)

## Docker Configuration

### Development

- Hot reload enabled for both client and server
- Volume mounts for live code changes
- Separate containers for client and server

### Production

- Optimized builds with multi-stage Dockerfiles
- Nginx reverse proxy for the React app
- Production-ready Hono server
- Health checks and restart policies

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Hono, TypeScript, Node.js
- **Real-time**: Server-Sent Events (SSE)
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (production)
- **Package Management**: pnpm workspaces

## Development Notes

- The React app connects to the Hono server via HTTP requests and SSE
- CORS is configured to allow cross-origin requests
- SSE endpoint streams real-time data every second
- Production setup uses Nginx to proxy API requests to the backend
- Both development and production Docker configurations are provided

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
