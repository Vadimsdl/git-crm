#!/bin/bash

# Function to handle errors
handle_error() {
  echo "❌ Error: $1"
  exit 1
}

# Stop any running containers
echo "🔄 Stopping any running containers..."
docker-compose down || handle_error "Failed to stop containers"

# Remove old containers, networks, images and volumes
echo "🧹 Cleaning up Docker environment..."
docker-compose rm -f || handle_error "Failed to remove containers"

# Clean up unused volumes and networks
echo "🧹 Cleaning up Docker volumes and networks..."
docker system prune -f || echo "⚠️ Warning: Could not prune Docker system"

# Remove previous node_modules to avoid dependency issues
echo "🧹 Removing node_modules in backend..."
rm -rf git-crm-back/node_modules || echo "⚠️ Warning: Could not remove backend node_modules"
rm -rf git-crm-back/dist || echo "⚠️ Warning: Could not remove backend dist folder"

# Also clean frontend node_modules
echo "🧹 Removing node_modules in frontend..."
rm -rf git-crm-front/node_modules || echo "⚠️ Warning: Could not remove frontend node_modules"
rm -rf git-crm-front/build || echo "⚠️ Warning: Could not remove frontend build folder"

# Build and start the containers
echo "🏗️ Building backend (this may take a while)..."
echo "📝 Build logs for backend:"
docker-compose build --no-cache api 2>&1 | tee backend_build.log || handle_error "Failed to build backend"

echo "🏗️ Building frontend (this may take a while)..."
docker-compose build --no-cache web || handle_error "Failed to build frontend"

echo "🚀 Starting containers..."
docker-compose up -d || handle_error "Failed to start containers"

# Wait a moment for containers to initialize
echo "⏳ Waiting for containers to initialize..."
sleep 5

# Check for backend build issues
echo "🔍 Checking backend container..."
docker-compose exec api ls -la || echo "❌ Failed to access backend container"
echo "🔍 Checking backend dist directory..."
docker-compose exec api ls -la dist/ || echo "❌ Could not find dist directory in backend container"

# Check if containers are running
echo "🔍 Checking container status..."
if docker-compose ps | grep -q "Up"; then
  echo "✅ Containers are running successfully!"
  echo "📊 Backend API: http://localhost:8000"
  echo "🖥️ Frontend: http://localhost:3000"
  echo "💾 MongoDB: mongodb://localhost:27017"
else
  echo "❌ Container status check failed. Showing logs:"
  docker-compose logs
  handle_error "Containers failed to start properly"
fi

# Follow the logs
echo "📜 Following logs (Ctrl+C to exit log view)..."
docker-compose logs -f 