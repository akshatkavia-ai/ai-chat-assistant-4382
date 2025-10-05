import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

/**
 * Main chat window component that combines message list and input
 * @param {Object} props - Component props
 * @param {Array} props.messages - Array of message objects
 * @param {boolean} props.isLoading - Whether a message is being sent
 * @param {Function} props.onSendMessage - Callback when message is sent
 * @returns {JSX.Element} ChatWindow component
 */
// PUBLIC_INTERFACE
const ChatWindow = ({ messages, isLoading, onSendMessage }) => {
  return (
    <div className="chat-window">
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput onSendMessage={onSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatWindow;
