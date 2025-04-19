#!/bin/bash

# Git CRM - Simple Startup Script

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to show help message
show_help() {
  echo -e "${GREEN}Git CRM Startup Script${NC}"
  echo
  echo "Usage: ./run.sh [OPTION]"
  echo
  echo "Options:"
  echo "  -h, --help       Show this help message"
  echo "  -d, --dev        Run in development mode"
  echo "  -r, --rebuild    Rebuild containers (equivalent to build-and-run.sh)"
  echo "  -s, --stop       Stop running containers"
  echo "  -l, --logs       Show container logs"
}

# Function to check requirements
check_requirements() {
  if ! command -v docker &> /dev/null || ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker and Docker Compose are required but not found${NC}"
    echo "Please install Docker and Docker Compose first"
    exit 1
  fi
}

# Function to ensure .env file exists
ensure_env_file() {
  if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️ No .env file found, creating from example...${NC}"
    if [ -f .env.example ]; then
      cp .env.example .env
      echo -e "${GREEN}✅ Created .env from .env.example${NC}"
    else
      echo "JWT_SECRET=default-secret-please-change" > .env
      echo "NODE_ENV=production" >> .env
      echo -e "${GREEN}✅ Created default .env file${NC}"
    fi
    echo -e "${YELLOW}⚠️ Please edit .env file with your actual settings before deploying to production${NC}"
  fi
}

# Function to start containers
start_containers() {
  local dev_mode=$1
  
  if [ "$dev_mode" = true ]; then
    echo -e "${YELLOW}🛠️ Starting Git CRM in DEVELOPMENT mode...${NC}"
    export NODE_ENV=development
    sed -i.bak 's/NODE_ENV=production/NODE_ENV=development/g' .env
  else
    echo -e "${GREEN}🚀 Starting Git CRM in PRODUCTION mode...${NC}"
  fi
  
  docker-compose up -d

  if [ $? -eq 0 ]; then
    echo
    echo -e "${GREEN}✅ Git CRM is now running!${NC}"
    echo -e "📊 Backend API: ${YELLOW}http://localhost:8000${NC}"
    echo -e "🖥️ Frontend: ${YELLOW}http://localhost:3000${NC}"
    echo -e "💾 MongoDB: ${YELLOW}mongodb://localhost:27017${NC}"
    echo
    echo -e "📝 You can check the logs with: ${YELLOW}./run.sh --logs${NC}"
    echo -e "🛑 To stop the application: ${YELLOW}./run.sh --stop${NC}"
  else
    echo -e "${RED}❌ Failed to start services${NC}"
    echo -e "Check the logs with: ${YELLOW}docker-compose logs${NC}"
  fi
}

# Function to rebuild and start
rebuild_and_start() {
  echo -e "${YELLOW}🔄 Running complete rebuild (this may take a while)...${NC}"
  ./build-and-run.sh
}

# Function to stop containers
stop_containers() {
  echo -e "${YELLOW}🛑 Stopping Git CRM containers...${NC}"
  docker-compose down
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Containers stopped successfully${NC}"
  else
    echo -e "${RED}❌ Failed to stop containers${NC}"
  fi
}

# Function to show logs
show_logs() {
  echo -e "${YELLOW}📜 Showing logs (Ctrl+C to exit)...${NC}"
  docker-compose logs -f
}

# Parse command line arguments
DEV_MODE=false

if [ $# -eq 0 ]; then
  check_requirements
  ensure_env_file
  start_containers $DEV_MODE
  exit 0
fi

while [ $# -gt 0 ]; do
  case "$1" in
    -h|--help)
      show_help
      exit 0
      ;;
    -d|--dev)
      DEV_MODE=true
      shift
      ;;
    -r|--rebuild)
      check_requirements
      ensure_env_file
      rebuild_and_start
      exit 0
      ;;
    -s|--stop)
      stop_containers
      exit 0
      ;;
    -l|--logs)
      show_logs
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      show_help
      exit 1
      ;;
  esac
done

# Start containers if we reached here
check_requirements
ensure_env_file
start_containers $DEV_MODE 