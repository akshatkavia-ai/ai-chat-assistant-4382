# AI Copilot Web Application - Frontend Client

## Overview
This is the frontend client for the AI Copilot web application. It provides an interactive chat interface for real-time communication with an AI assistant.

## Project Structure
```
frontend_client/
├── public/
│   ├── index.html             # HTML template
│   ├── favicon.ico            # App icon
│   └── manifest.json          # PWA manifest
├── src/
│   ├── App.js                 # Main application component
│   ├── App.css                # Application styles
│   ├── index.js               # React entry point
│   ├── index.css              # Global styles
│   └── setupTests.js          # Test configuration
├── package.json               # Node dependencies and scripts
├── .env                       # Environment variables (not in git)
├── .env.example              # Example environment variables
└── .gitignore                # Git ignore rules
```

## Setup Instructions

### 1. Environment Setup
Copy `.env.example` to `.env` and configure your environment variables:
```bash
cp .env.example .env
```

Required environment variables:
- `REACT_APP_BACKEND_URL`: Backend API URL (e.g., http://localhost:3001)

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm start
```

The application will open in your browser at http://localhost:3000

### 4. Build for Production
```bash
npm run build
```

## Features
- Real-time chat UI with message bubbles
- Send/receive AI messages via backend API
- Display chat conversation history
- User authentication (to be implemented)
- Responsive design with Heritage Brown theme
- Classic styling with clean, professional aesthetic

## Design Theme
- **Theme**: Heritage Brown (Rich brown & cream)
- **Style**: Classic with structured layouts and subtle shadows
- **Layout**: Central chat panel with message bubbles, sidebar for past conversations, top bar for app branding, and user profile icon

## Technology Stack
- **Framework**: React 18
- **HTTP Client**: Axios (to be integrated)
- **Styling**: CSS with custom theme variables
- **Build Tool**: React Scripts

## Available Scripts

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is a one-way operation!** Ejects from Create React App

## API Integration
The frontend communicates with the backend service via Axios:
- Backend endpoint: Configured via `REACT_APP_BACKEND_URL`
- CORS: Enabled on backend for cross-origin requests

## Development Notes
- Ensure the backend service is running before starting the frontend
- Environment variables must be prefixed with `REACT_APP_`
- The app uses the Heritage Brown color palette defined in the style guide
- All public functions should be documented and marked with PUBLIC_INTERFACE comments
