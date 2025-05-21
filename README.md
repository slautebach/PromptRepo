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

- Docker
- Node.js (for local development)
- PostgreSQL (for local development)

### Development Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and configure your environment variables
3. Run `docker-compose up` to start the development environment

## License

MIT 