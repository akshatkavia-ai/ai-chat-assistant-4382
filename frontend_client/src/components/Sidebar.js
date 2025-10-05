import React from 'react';

/**
 * Component for sidebar with conversation list
 * @param {Object} props - Component props
 * @param {Array} props.conversations - Array of conversation objects
 * @param {string} props.currentConversationId - Currently active conversation ID
 * @param {Function} props.onSelectConversation - Callback when conversation is selected
 * @param {Function} props.onNewConversation - Callback to start new conversation
 * @returns {JSX.Element} Sidebar component
 */
// PUBLIC_INTERFACE
const Sidebar = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
}) => {
  /**
   * Generate a preview title for a conversation
   * @param {string} convId - Conversation ID
   * @returns {string} Display title
   */
  const getConversationTitle = (convId) => {
    // Use first 8 characters of conversation ID as title
    return `Chat ${convId.substring(0, 8)}...`;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Conversations</h2>
        <button
          className="new-chat-button"
          onClick={onNewConversation}
        >
          + New Chat
        </button>
      </div>
      
      <div className="conversations-list">
        {conversations.length === 0 ? (
          <div style={{ padding: '1rem', textAlign: 'center', color: '#6B7280' }}>
            No conversations yet
          </div>
        ) : (
          conversations.map((convId) => (
            <div
              key={convId}
              className={`conversation-item ${
                convId === currentConversationId ? 'active' : ''
              }`}
              onClick={() => onSelectConversation(convId)}
            >
              <div className="conversation-item-title">
                {getConversationTitle(convId)}
              </div>
              <div className="conversation-item-preview">
                Click to view conversation
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
