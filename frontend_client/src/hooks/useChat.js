import { useState, useCallback, useEffect } from 'react';
import { sendChatMessage, getConversationHistory, listConversations } from '../api/client';

/**
 * Custom hook for managing chat state and API interactions
 * @returns {Object} Chat state and methods
 */
// PUBLIC_INTERFACE
const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Load list of all conversations
   */
  // PUBLIC_INTERFACE
  const loadConversations = useCallback(async () => {
    try {
      const convList = await listConversations();
      setConversations(convList);
    } catch (err) {
      console.error('Failed to load conversations:', err);
      // Don't set error state for this, as it's not critical
    }
  }, []);

  /**
   * Load all conversations on mount
   */
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  /**
   * Send a message to the AI assistant
   * @param {string} messageText - The user's message text
   */
  // PUBLIC_INTERFACE
  const sendMessage = useCallback(async (messageText) => {
    if (!messageText.trim()) {
      return;
    }

    setError(null);
    setIsLoading(true);

    // Add user message to UI immediately
    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Send to backend
      const response = await sendChatMessage(messageText, conversationId);
      
      // Update conversation ID if this is a new conversation
      if (!conversationId && response.conversation_id) {
        setConversationId(response.conversation_id);
        // Reload conversations list
        loadConversations();
      }

      // Add assistant response to messages
      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: response.timestamp || new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.message || 'Failed to send message');
      // Remove the user message if sending failed
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, loadConversations]);

  /**
   * Load a specific conversation's history
   * @param {string} convId - The conversation ID to load
   */
  // PUBLIC_INTERFACE
  const loadConversation = useCallback(async (convId) => {
    if (!convId) {
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const history = await getConversationHistory(convId);
      setConversationId(convId);
      setMessages(history.messages || []);
    } catch (err) {
      setError(err.message || 'Failed to load conversation');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Start a new conversation
   */
  // PUBLIC_INTERFACE
  const startNewConversation = useCallback(() => {
    setConversationId(null);
    setMessages([]);
    setError(null);
  }, []);

  /**
   * Clear the current error
   */
  // PUBLIC_INTERFACE
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    conversationId,
    conversations,
    isLoading,
    error,
    sendMessage,
    loadConversation,
    startNewConversation,
    clearError,
  };
};

export default useChat;
