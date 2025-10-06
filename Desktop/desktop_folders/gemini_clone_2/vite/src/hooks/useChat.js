import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMessage,
  setIsTyping,
  setMessages,
} from '../redux/chatSlice';

const useChat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const isTyping = useSelector((state) => state.chat.isTyping);
  const currentChatroom = useSelector((state) => state.chat.currentChatroom);
  const messagesEndRef = useRef(null);

  const [messageInput, setMessageInput] = useState('');

  // Simulate AI response with throttling
  const simulateAIResponse = (userMessage) => {
    dispatch(setIsTyping(true));
    
    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now(),
        text: `I received your message: "${userMessage}". This is a simulated response from Gemini AI.`,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      
      dispatch(setIsTyping(false));
      dispatch(addMessage(aiResponse));
    }, 2000);
  };

  // Handle sending a message
  const sendMessage = () => {
    if (messageInput.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(newMessage));
    setMessageInput('');

    // Simulate AI response
    simulateAIResponse(messageInput);
  };

  // Handle sending an image
  const sendImage = (imageData) => {
    const newMessage = {
      id: Date.now(),
      image: imageData,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(newMessage));

    // Simulate AI response to image
    simulateAIResponse('an image');
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load messages when chatroom changes
  useEffect(() => {
    if (currentChatroom) {
      // Simulate loading messages from localStorage or API
      const storedMessages = localStorage.getItem(`messages_${currentChatroom.id}`);
      if (storedMessages) {
        dispatch(setMessages(JSON.parse(storedMessages)));
      } else {
        // Initialize with welcome message
        const welcomeMessage = {
          id: Date.now(),
          text: 'Welcome to the chat! How can I help you today?',
          sender: 'ai',
          timestamp: new Date().toISOString(),
        };
        dispatch(setMessages([welcomeMessage]));
      }
    }
  }, [currentChatroom, dispatch]);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (currentChatroom && messages.length > 0) {
      localStorage.setItem(`messages_${currentChatroom.id}`, JSON.stringify(messages));
    }
  }, [messages, currentChatroom]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return {
    messages,
    isTyping,
    messageInput,
    setMessageInput,
    sendMessage,
    sendImage,
    messagesEndRef,
  };
};

export default useChat;