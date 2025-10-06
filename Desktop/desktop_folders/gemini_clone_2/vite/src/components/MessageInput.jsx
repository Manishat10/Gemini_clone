import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';

const MessageInput = ({
  messageInput,
  setMessageInput,
  onSendMessage,
  onSendImage,
  onKeyPress,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (messageInput.trim()) {
      onSendMessage();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onSendImage(event.target.result);
      toast.success('Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please drop an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onSendImage(event.target.result);
      toast.success('Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`rounded-xl border-2 border-dashed ${
        isDragging
          ? 'border-blue-400 bg-blue-400/20'
          : 'border-blue-300'
      } p-4 transition-all duration-300 hover:border-blue-400 bg-blue-600 shadow-custom`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging ? (
        <div className="text-center py-8">
          <svg
            className="mx-auto h-12 w-12 text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mt-2 text-sm text-blue-300 font-medium">
            Drop your image here
          </p>
        </div>
      ) : (
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={onKeyPress}
              placeholder="Type your message..."
              rows="1"
              className="input-primary w-full resize-none py-3 px-4"
            />
          </div>
          
          <div className="flex space-x-2">
            {/* Image Upload Button */}
            <button
              onClick={() => fileInputRef.current.click()}
              className="p-3 rounded-full text-pink-300 hover:text-blue-200 focus:outline-none transition-all duration-200 hover:bg-blue-500"
              aria-label="Upload image"
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
            
            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!messageInput.trim()}
              className={`p-3 rounded-full focus:outline-none transition-all duration-200 ${
                messageInput.trim()
                  ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-blue-400 text-blue-200 cursor-not-allowed'
              }`}
              aria-label="Send message"
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default MessageInput;