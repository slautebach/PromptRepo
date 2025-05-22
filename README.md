# Prompt Repo

A repository for storing, managing, and easily using prompts across many AI applications.

## Features

- Create, modify, update, and delete prompts
- Version control for prompts
- Variable support in prompts
- Sharing system (individual and group-based)
- SSO login (Google)
- Chrome extension for quick access
- REST API
- Dark/Light theme support

## Project Structure

```
prompt-repo/
├── backend/           # Backend API server
├── frontend/         # Web application
├── chrome-extension/ # Chrome extension
├── docker/          # Docker configuration
└── docs/            # Documentation
```

## Setup

### Prerequisites

- Docker Desktop
- Node.js (for local development)
- PostgreSQL (for local development)

### Development Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and configure your environment variables
3. Make sure Docker Desktop is running on your machine

#### Running with Docker (Recommended)

1. Start all services using Docker Compose:

   ```bash
   docker-compose up --build
   ```

   This will start:

   - Frontend at http://localhost
   - Backend at http://localhost:3000
   - Database at localhost:5432

2. To stop all services:
   ```bash
   docker-compose down
   ```

#### Running Locally (Without Docker)

1. Backend Setup:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. Frontend Setup:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

#### Debugging

- Backend logs will be visible in the terminal where you started the service
- Frontend logs will be visible in the browser's developer tools
- Database logs can be viewed using:
  ```bash
  docker-compose logs db
  ```

#### Common Issues

1. If Docker Desktop is not running:

   - Open Docker Desktop application
   - Wait for it to fully start
   - Check the Docker icon in system tray shows "Docker Desktop is running"

2. If ports are already in use:
   - Check if any other services are using ports 80, 3000, or 5432
   - Stop those services or modify the port mappings in docker-compose.yml

## License

MIT
