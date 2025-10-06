import { useState, useEffect } from 'react';

const Message = ({ message, onCopy, isCopied }) => {
  const [showCopyButton, setShowCopyButton] = useState(false);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isUserMessage = message.sender === 'user';

  return (
    <div
      className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowCopyButton(true)}
      onMouseLeave={() => setShowCopyButton(false)}
    >
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl px-4 py-3 relative shadow-custom ${
          isUserMessage
            ? 'bg-blue-700 text-white rounded-tr-none'
            : 'bg-blue-600 text-white rounded-tl-none'
        }`}
      >
        {message.image ? (
          <div className="mb-2">
            <img
              src={message.image}
              alt="Uploaded content"
              className="rounded-lg max-h-64 object-contain border border-blue-400"
            />
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.text}</p>
        )}
        
        <div className={`flex items-center mt-2 text-sm ${isUserMessage ? 'text-blue-200' : 'text-blue-300'}`}>
          <span>{formatTime(message.timestamp)}</span>
        </div>
        
        {showCopyButton && message.text && (
          <button
            onClick={onCopy}
            className={`absolute -top-3 -right-3 p-1.5 rounded-full shadow-md transition-all duration-200 ${
              isUserMessage
                ? 'bg-blue-800 text-white hover:bg-blue-900'
                : 'bg-blue-700 text-white hover:bg-blue-800'
            }`}
            aria-label="Copy message"
          >
            {isCopied ? (
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;