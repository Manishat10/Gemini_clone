import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setCurrentChatroom } from '../redux/chatSlice';
import useChat from '../hooks/useChat';
import useDarkMode from '../hooks/useDarkMode';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import TypingIndicator from '../components/TypingIndicator';

const ChatRoomPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chatroomId } = useParams();
  const { chatrooms, currentChatroom } = useSelector((state) => state.chat);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const {
    messages,
    isTyping,
    messageInput,
    setMessageInput,
    sendMessage,
    sendImage,
    messagesEndRef,
  } = useChat();

  // Set current chatroom based on URL parameter
  useEffect(() => {
    const chatroom = chatrooms.find((room) => room.id === chatroomId);
    if (chatroom) {
      dispatch(setCurrentChatroom(chatroom));
    } else {
      // If chatroom not found, redirect to dashboard
      navigate('/dashboard');
    }
  }, [chatroomId, chatrooms, dispatch, navigate]);

  // Handle key press for message input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!currentChatroom) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black dark:bg-gray-500">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-pink-500 dark:text-gray-300">
            Loading chatroom...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black dark:bg-gray-500">
      {/* Chat Header */}
      <div className="bg-blue-600 border-b border-blue-700 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="mr-3 text-pink-700 hover:text-pink-900 dark:text-gray-300 dark:hover:text-white focus:outline-none transition-colors duration-200 p-2 rounded-full hover:bg-blue-500 dark:hover:bg-blue-700"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center mr-3">
                <span className="text-white font-bold">{currentChatroom.title.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-pink-500 dark:text-white">
                  {currentChatroom.title}
                </h1>
                <p className="text-xs text-pink-400 dark:text-gray-300">
                  {messages.length} messages
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-pink-700 dark:text-gray-300 hover:bg-blue-500 dark:hover:bg-blue-700 focus:outline-none transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden flex flex-col bg-black dark:bg-gray-500">
        <div className="flex-1 overflow-y-auto p-4">
          <MessageList 
            messages={messages} 
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
          />
          {isTyping && <TypingIndicator />}
        </div>

        {/* Message Input */}
        <div className="border-t border-blue-700 bg-blue-600 p-4">
          <MessageInput
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            onSendMessage={sendMessage}
            onSendImage={sendImage}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;