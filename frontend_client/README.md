# AI Copilot Frontend - React Application

This is the React frontend for the AI Copilot web application, providing an interactive chat interface for real-time communication with an AI assistant powered by Google Gemini.

## Features

- 💬 **Real-time Chat Interface**: Clean, professional chat UI with message bubbles
- 🎨 **Heritage Brown Theme**: Classic design with rich brown & cream color palette
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔄 **Conversation Management**: Browse and switch between past conversations
- ⌨️ **Smart Input**: Press Enter to send, Shift+Enter for new line
- 🔔 **Error Handling**: User-friendly error messages and loading states
- ⚡ **Real-time Updates**: Typing indicators and smooth animations

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and configure your backend URL:

```bash
cp .env.example .env
```

Edit `.env` and set your backend URL:

```env
REACT_APP_BACKEND_URL=http://localhost:3001
```

The application will try `REACT_APP_BACKEND_URL` first, then fall back to `REACT_APP_API_BASE_URL` if not set.

### 3. Run Development Server

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
```

The optimized production build will be created in the `build/` folder.

## Project Structure

```
frontend_client/
├── public/                    # Static assets
├── src/
│   ├── api/
│   │   └── client.js         # Axios API client with backend integration
│   ├── components/
│   │   ├── ChatWindow.js     # Main chat interface container
│   │   ├── MessageList.js    # Displays chat messages
│   │   ├── MessageInput.js   # User input with send button
│   │   └── Sidebar.js        # Conversation history sidebar
│   ├── hooks/
│   │   └── useChat.js        # Custom hook for chat state management
│   ├── styles/
│   │   └── theme.css         # Heritage Brown theme styles
│   ├── App.js                # Main application component
│   ├── App.css               # Legacy styles (deprecated)
│   ├── index.js              # React entry point
│   └── index.css             # Global styles
├── package.json              # Dependencies and scripts
└── .env.example             # Environment variables template
```

## API Integration

The frontend communicates with the FastAPI backend via Axios:

### Endpoints Used

- **POST /chat**: Send a message and receive AI response
  - Request: `{ message: string, conversation_id?: string }`
  - Response: `{ response: string, conversation_id: string, timestamp: string }`

- **GET /history**: Retrieve conversation history
  - Query params: `conversation_id`
  - Response: `{ conversation_id: string, messages: Array }`

- **GET /conversations**: List all conversation IDs
  - Response: `{ conversations: Array<string> }`

### Environment Variables

- `REACT_APP_BACKEND_URL`: Primary backend API URL (recommended)
- `REACT_APP_API_BASE_URL`: Fallback backend API URL

**Important**: All environment variables must be prefixed with `REACT_APP_` to be accessible in React.

## Design Theme

### Heritage Brown Color Palette

- **Primary**: `#92400E` (Rich brown)
- **Secondary**: `#FEF3C7` (Cream)
- **Success**: `#059669` (Green)
- **Error**: `#DC2626` (Red)
- **Background**: `#FFFBEB` (Light cream)
- **Surface**: `#FFFFFF` (White)
- **Text**: `#111827` (Dark gray)

### Layout

- **Top Bar**: Application branding and user profile icon
- **Sidebar**: Past conversations list with "New Chat" button
- **Chat Panel**: Central area with message bubbles (user on right, AI on left)
- **Input Area**: Message textarea with send button at bottom

### Style Guidelines

- Clean, professional aesthetic with structured layouts
- Subtle shadows and rounded corners
- Timeless, classic design
- Minimalist corporate styling

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
The page will reload when you make changes.

### `npm test`

Launches the test runner in non-interactive mode (CI=true).

### `npm run build`

Builds the app for production to the `build` folder.
Optimizes the build for best performance.

### `npm run eject`

**Note: this is a one-way operation!**
Ejects from Create React App for full configuration control.

## Usage

1. **Start a New Chat**: Click the "+ New Chat" button in the sidebar
2. **Send Messages**: Type your message and press Enter (or click Send)
3. **View History**: Click on past conversations in the sidebar to view and continue them
4. **Error Recovery**: If an error occurs, a dismissible alert will appear at the top

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- Ensure the backend service is running before starting the frontend
- CORS is enabled on the backend for cross-origin requests
- All public functions are documented with PUBLIC_INTERFACE comments
- The application uses React functional components with hooks
- State management is handled through the custom `useChat` hook

## Troubleshooting

### Backend Connection Issues

If you see "Failed to send message" errors:
1. Verify the backend is running (check the URL in your browser)
2. Check that `REACT_APP_BACKEND_URL` in `.env` is correct
3. Ensure CORS is enabled on the backend
4. Check browser console for detailed error messages

### Build Errors

If you encounter build errors:
1. Delete `node_modules/` and `package-lock.json`
2. Run `npm install` again
3. Clear the cache: `npm cache clean --force`

## License

This project is part of the AI Copilot application suite.
