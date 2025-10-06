import chatReducer, {
  setChatrooms,
  addChatroom,
  removeChatroom,
  setCurrentChatroom,
  setMessages,
  addMessage,
  setIsLoading,
  setIsTyping,
  setDarkMode,
  toggleDarkMode,
} from '../src/redux/chatSlice';

describe('chatSlice', () => {
  const initialState = {
    chatrooms: [],
    currentChatroom: null,
    messages: [],
    isLoading: false,
    isTyping: false,
    darkMode: false,
  };

  it('should handle initial state', () => {
    expect(chatReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setChatrooms', () => {
    const chatrooms = [
      { id: '1', title: 'Test Chatroom' },
    ];
    
    const actual = chatReducer(initialState, setChatrooms(chatrooms));
    expect(actual.chatrooms).toEqual(chatrooms);
  });

  it('should handle addChatroom', () => {
    const chatroom = { id: '1', title: 'Test Chatroom' };
    
    const actual = chatReducer(initialState, addChatroom(chatroom));
    expect(actual.chatrooms).toHaveLength(1);
    expect(actual.chatrooms[0]).toEqual(chatroom);
  });

  it('should handle removeChatroom', () => {
    const initialStateWithChatrooms = {
      ...initialState,
      chatrooms: [
        { id: '1', title: 'Test Chatroom 1' },
        { id: '2', title: 'Test Chatroom 2' },
      ],
    };
    
    const actual = chatReducer(initialStateWithChatrooms, removeChatroom('1'));
    expect(actual.chatrooms).toHaveLength(1);
    expect(actual.chatrooms[0].id).toEqual('2');
  });

  it('should handle toggleDarkMode', () => {
    const actual = chatReducer(initialState, toggleDarkMode());
    expect(actual.darkMode).toEqual(true);
  });
});