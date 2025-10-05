import React from 'react';
import './styles/theme.css';
import useChat from './hooks/useChat';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

/**
 * Main application component for AI Copilot chat interface
 * @returns {JSX.Element} App component
 */
// PUBLIC_INTERFACE
function App() {
  const {
    messages,
    conversationId,
    conversations,
    isLoading,
    error,
    sendMessage,
    loadConversation,
    startNewConversation,
    clearError,
  } = useChat();

  return (
    <div className="app-container">
      <Sidebar
        conversations={conversations}
        currentConversationId={conversationId}
        onSelectConversation={loadConversation}
        onNewConversation={startNewConversation}
      />
      
      <div className="main-content">
        <div className="top-bar">
          <div className="top-bar-brand">
            <h1>🤖 AI Copilot</h1>
          </div>
          <div className="top-bar-user">
            <div className="user-icon">U</div>
          </div>
        </div>
        
        {error && (
          <div className="error-alert">
            <span className="error-alert-icon">⚠️</span>
            <span className="error-alert-message">{error}</span>
            <button className="error-alert-close" onClick={clearError}>
              ✕
            </button>
          </div>
        )}
        
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
