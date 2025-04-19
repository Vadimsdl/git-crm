# Git CRM Frontend

React-based frontend application for Git CRM system.

## Technical Requirements

- Node.js version: 16.x or higher (19.x recommended)
- npm version: 8.x or higher
- Port used: 3000

## Environment Variables

Create a `.env` file in the root of the frontend directory with the following content:

```
REACT_APP_BASE_URL=http://localhost:8000/
```

## Quick Start

### Using Docker (Recommended)

```bash
# From the project root
docker-compose up -d web

# Or from the frontend directory
docker-compose up -d
```

### Manual Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Runs tests
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from create-react-app

## Docker Configuration

The frontend is configured to run in a Docker container with the following specifications:

- Base image: Node.js + Nginx
- Working directory: `/app`
- Build output is served via Nginx on port 80
- Container exposes port 80, mapped to host port 3000
- Environment variables are passed from the host to the container

## Project Structure

```
git-crm-front/
├── public/           # Static files
├── src/              # Source code
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── store/        # Redux store
│   ├── styles/       # SCSS styles
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main App component
│   └── index.tsx     # Application entry point
├── .env              # Environment variables
├── Dockerfile        # Docker configuration
├── package.json      # Dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## Technologies

- React 19.x
- TypeScript 4.x
- Redux Toolkit
- React Router 7.x
- SASS
- Jest and React Testing Library
