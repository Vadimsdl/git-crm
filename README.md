# Git CRM

A Customer Relationship Management system integrated with Git repositories.

## Project Overview

This project consists of:
- **Frontend**: React application (port 3000)
- **Backend**: NestJS API (port 8000)
- **Database**: MongoDB (port 27017)

## Requirements

- Docker and Docker Compose
- Node.js v16+ (for local development)
- Git

## Quick Start with Docker

### Option 1: Using Docker Compose

```bash
# Clone the repository
git clone <repository-url>
cd git-crm

# Start all services
docker-compose up -d
```

This will start:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- MongoDB: mongodb://localhost:27017

### Option 2: Using the Bash Scripts

We provide two convenient bash scripts to run the application:

#### Quick Start Script (run.sh)

For daily usage and quick starts:

```bash
# Make the script executable
chmod +x run.sh

# Run the script
./run.sh
```

This script supports several options:
```
./run.sh --help       # Show help message
./run.sh --dev        # Run in development mode
./run.sh --rebuild    # Rebuild containers (calls build-and-run.sh)
./run.sh --stop       # Stop running containers
./run.sh --logs       # Show container logs
```

#### Complete Rebuild Script (build-and-run.sh)

For first-time setup or when you need a complete rebuild:

```bash
# Make the script executable
chmod +x build-and-run.sh

# Run the script
./build-and-run.sh
```

**Why Two Scripts?**

- **run.sh**: A lightweight script for everyday use. It:
  - Checks for Docker and creates .env files if needed
  - Starts existing containers or creates them if they don't exist
  - Provides convenient command-line options for different operations
  - Preserves existing containers and their state
  - Is much faster (typically starts in a few seconds)

- **build-and-run.sh**: A comprehensive script for complete rebuilds. It:
  - Stops and removes all containers
  - Cleans up the Docker environment (networks, volumes, etc.)
  - Removes node_modules and dist/build folders
  - Rebuilds all containers with --no-cache flag
  - Performs additional checks to ensure everything is working
  - Takes much longer to complete (typically 5-15 minutes)
  - Useful after git pull, major updates, or when debugging issues

**When to use which script:**
- For daily development: `./run.sh`
- After pulling new code: `./build-and-run.sh`
- When experiencing strange issues: `./build-and-run.sh`
- To stop the application: `./run.sh --stop`
- To view logs: `./run.sh --logs`

## Environment Variables

Ensure you have the proper environment variables set before running the application:

1. Root directory `.env`:
```
JWT_SECRET=your-secret-key
NODE_ENV=production
```

2. Frontend `.env`:
```
REACT_APP_BASE_URL=http://localhost:8000/
```

3. Backend `.env`:
```
MONGO_CONNECTION_STRING=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

## Accessing Services

- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **MongoDB**: mongodb://localhost:27017

## Technologies

- **Frontend**: React 19, Redux Toolkit, TypeScript
- **Backend**: NestJS 11, Mongoose, JWT Authentication
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose

## Development

For development instructions, refer to the README files in the respective directories:
- [Frontend Documentation](./git-crm-front/README.md)
- [Backend Documentation](./git-crm-back/README.md) 