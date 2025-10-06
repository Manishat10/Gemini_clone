import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Message from './Message';

const MessageList = ({ messages, isTyping, messagesEndRef }) => {
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  const copyToClipboard = (text, messageId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessageId(messageId);
      toast.success('Message copied to clipboard!');
      setTimeout(() => setCopiedMessageId(null), 2000);
    });
  };

  return (
    <div className="space-y-4 pb-4">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          onCopy={() => copyToClipboard(message.text || 'Image', message.id)}
          isCopied={copiedMessageId === message.id}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;