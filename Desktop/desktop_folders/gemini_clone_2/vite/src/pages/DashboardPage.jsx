import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  setChatrooms,
  addChatroom,
  removeChatroom,
  setCurrentChatroom,
} from '../redux/chatSlice';
import { logout } from '../redux/authSlice';
import { validateChatroom } from '../utils/validation';
import useDarkMode from '../hooks/useDarkMode';
import ChatroomList from '../components/ChatroomList';
import CreateChatroomModal from '../components/CreateChatroomModal';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chatrooms } = useSelector((state) => state.chat);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Load chatrooms from localStorage on component mount
  useEffect(() => {
    const storedChatrooms = localStorage.getItem('chatrooms');
    if (storedChatrooms) {
      dispatch(setChatrooms(JSON.parse(storedChatrooms)));
    } else {
      // Initialize with some sample chatrooms
      const sampleChatrooms = [
        {
          id: '1',
          title: 'General Chat',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Project Discussion',
          createdAt: new Date().toISOString(),
        },
      ];
      dispatch(setChatrooms(sampleChatrooms));
    }
  }, [dispatch]);

  // Save chatrooms to localStorage when they change
  useEffect(() => {
    if (chatrooms.length > 0) {
      localStorage.setItem('chatrooms', JSON.stringify(chatrooms));
    }
  }, [chatrooms]);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter chatrooms based on search term
  const filteredChatrooms = chatrooms.filter((chatroom) =>
    chatroom.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!');
    navigate('/');
  };

  // Handle create chatroom
  const handleCreateChatroom = (title) => {
    const validation = validateChatroom({ title });
    if (!validation.success) {
      toast.error(validation.errors.title);
      return;
    }

    const newChatroom = {
      id: Date.now().toString(),
      title,
      createdAt: new Date().toISOString(),
    };

    dispatch(addChatroom(newChatroom));
    setShowCreateModal(false);
    toast.success('Chatroom created successfully!');
  };

  // Handle delete chatroom
  const handleDeleteChatroom = (chatroomId) => {
    dispatch(removeChatroom(chatroomId));
    toast.success('Chatroom deleted successfully!');
  };

  // Handle chatroom selection
  const handleSelectChatroom = (chatroom) => {
    dispatch(setCurrentChatroom(chatroom));
    navigate(`/chat/${chatroom.id}`);
  };

  return (
    <div className="min-h-screen bg-black dark:bg-gray-500">
      {/* Header */}
      <header className="bg-blue-600 shadow-custom sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <h1 className="ml-3 text-xl font-bold text-pink-500 dark:text-white">
                  Gemini Chat
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative max-w-xs w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-pink-300 dark:text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search chatrooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-primary w-full pl-10 pr-3 py-2 text-sm"
                />
              </div>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-pink-700 dark:text-gray-300 hover:bg-blue-500 dark:hover:bg-blue-700 focus:outline-none transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
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
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
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
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center text-sm font-medium text-pink-700 dark:text-gray-300 hover:text-pink-900 dark:hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-500 dark:hover:bg-blue-700"
              >
                <svg
                  className="h-5 w-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-pink-500 dark:text-white">
              Your Chatrooms
            </h2>
            <p className="mt-1 text-sm text-pink-400 dark:text-gray-300">
              Manage your conversations and create new chatrooms
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center px-4 py-2.5 shadow-md hover:shadow-lg"
          >
            <svg
              className="h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Chatroom
          </button>
        </div>

        {filteredChatrooms.length > 0 ? (
          <ChatroomList
            chatrooms={filteredChatrooms}
            onSelectChatroom={handleSelectChatroom}
            onDeleteChatroom={handleDeleteChatroom}
          />
        ) : (
          <div className="text-center py-16 rounded-2xl bg-blue-600 shadow-custom">
            <svg
              className="mx-auto h-16 w-16 text-pink-300 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-pink-500 dark:text-white">
              No chatrooms found
            </h3>
            <p className="mt-2 text-sm text-pink-400 dark:text-gray-300">
              Get started by creating a new chatroom.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary flex items-center px-4 py-2.5 mx-auto shadow-md hover:shadow-lg"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Create Your First Chatroom
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Create Chatroom Modal */}
      {showCreateModal && (
        <CreateChatroomModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateChatroom}
        />
      )}
    </div>
  );
};

export default DashboardPage;