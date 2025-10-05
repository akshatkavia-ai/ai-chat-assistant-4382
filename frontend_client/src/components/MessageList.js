import React, { useEffect, useRef } from 'react';

/**
 * Component to display a list of chat messages
 * @param {Object} props - Component props
 * @param {Array} props.messages - Array of message objects
 * @param {boolean} props.isLoading - Whether a message is being sent
 * @returns {JSX.Element} MessageList component
 */
// PUBLIC_INTERFACE
const MessageList = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  /**
   * Auto-scroll to bottom when messages change
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  /**
   * Format timestamp for display
   * @param {string} timestamp - ISO timestamp string
   * @returns {string} Formatted time string
   */
  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return '';
    }
  };

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">💬</div>
        <h2>Welcome to AI Copilot</h2>
        <p>Start a conversation by typing a message below</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.role}`}>
          <div className="message-avatar">
            {message.role === 'user' ? 'U' : 'AI'}
          </div>
          <div className="message-bubble">
            <div className="message-content">{message.content}</div>
            {message.timestamp && (
              <div className="message-timestamp">
                {formatTimestamp(message.timestamp)}
              </div>
            )}
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="typing-indicator">
          <div className="message-avatar">AI</div>
          <div className="message-bubble">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
