# React + Hono + SSE Project Makefile

.PHONY: help install dev build start clean docker-dev docker-prod docker-down test

# Default target
help:
	@echo "React + Hono + SSE Project Commands:"
	@echo ""
	@echo "Development:"
	@echo "  make install     - Install all dependencies"
	@echo "  make dev         - Start development servers (client + server)"
	@echo "  make dev-client  - Start only React client"
	@echo "  make dev-server  - Start only Hono server"
	@echo ""
	@echo "Production:"
	@echo "  make build       - Build both client and server"
	@echo "  make start       - Start production servers"
	@echo "  make start-client - Start production client only"
	@echo "  make start-server - Start production server only"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-dev  - Start development with Docker Compose"
	@echo "  make docker-prod - Start production with Docker Compose"
	@echo "  make docker-down - Stop all Docker containers"
	@echo "  make docker-build - Build Docker images"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean       - Clean all build artifacts and node_modules"
	@echo "  make format      - Format code with Prettier"
	@echo "  make format-check - Check code formatting"
	@echo "  make test        - Run tests (if available)"
	@echo "  make logs        - Show Docker container logs"
	@echo "  make status      - Show Docker container status"

# Install dependencies
install:
	@echo "Installing root dependencies..."
	pnpm install
	@echo "Installing client dependencies..."
	cd client && pnpm install
	@echo "Installing server dependencies..."
	cd server && pnpm install
	@echo "All dependencies installed!"

# Development commands
dev:
	@echo "Starting development servers..."
	pnpm run dev

dev-client:
	@echo "Starting React client..."
	pnpm run dev:client

dev-server:
	@echo "Starting Hono server..."
	pnpm run dev:server

# Production commands
build:
	@echo "Building client and server..."
	pnpm run build

start:
	@echo "Starting production servers..."
	pnpm run start

start-client:
	@echo "Starting production client..."
	pnpm run start:client

start-server:
	@echo "Starting production server..."
	pnpm run start:server

# Docker commands
docker-dev:
	@echo "Starting development environment with Docker..."
	docker-compose -f docker-compose.dev.yml up --build

docker-prod:
	@echo "Starting production environment with Docker..."
	docker-compose -f docker-compose.prod.yml up --build

docker-down:
	@echo "Stopping all Docker containers..."
	docker-compose -f docker-compose.dev.yml down
	docker-compose -f docker-compose.prod.yml down

docker-build:
	@echo "Building Docker images..."
	docker-compose -f docker-compose.dev.yml build
	docker-compose -f docker-compose.prod.yml build

# Utility commands
clean:
	@echo "Cleaning build artifacts and node_modules..."
	rm -rf client/dist client/node_modules
	rm -rf server/dist server/node_modules
	rm -rf node_modules
	@echo "Cleanup complete!"

format:
	@echo "Formatting code with Prettier..."
	pnpm run format

format-check:
	@echo "Checking code formatting..."
	pnpm run format:check

test:
	@echo "Running tests..."
	@if [ -f "client/package.json" ] && grep -q '"test"' client/package.json; then \
		cd client && pnpm test; \
	fi
	@if [ -f "server/package.json" ] && grep -q '"test"' server/package.json; then \
		cd server && pnpm test; \
	fi

logs:
	@echo "Showing Docker container logs..."
	docker-compose -f docker-compose.dev.yml logs -f

status:
	@echo "Docker container status:"
	docker-compose -f docker-compose.dev.yml ps
	docker-compose -f docker-compose.prod.yml ps

# Quick setup for new developers
setup: install
	@echo "Project setup complete!"
	@echo "Run 'make dev' to start development servers"
	@echo "Or 'make docker-dev' to start with Docker"

# Production deployment
deploy: docker-build docker-prod
	@echo "Production deployment started!"

# Development with specific services
dev-with-db:
	@echo "Starting development with database..."
	docker-compose -f docker-compose.dev.yml up --build

# Health check
health:
	@echo "Checking service health..."
	@curl -s http://localhost:3001/health || echo "Server not responding"
	@curl -s http://localhost:5173 > /dev/null && echo "Client responding" || echo "Client not responding"
