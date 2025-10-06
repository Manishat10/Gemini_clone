# Gemini Frontend Clone Assignment Submission

## Project Overview
This is a fully functional, responsive, and visually appealing frontend for a Gemini-style conversational AI chat application. The app simulates OTP login, chatroom management, AI messaging, and modern UX/UI features.

## Live Deployment
The application has been successfully built and is ready for deployment to Vercel or Netlify. The production build is located in the `dist/` folder.

## Repository Structure
```
src/
├── components/        # Reusable UI components
│   ├── ChatroomList.jsx      # Displays list of chatrooms
│   ├── CreateChatroomModal.jsx # Modal for creating new chatrooms
│   ├── Message.jsx           # Individual message component
│   ├── MessageInput.jsx      # Input area for sending messages
│   ├── MessageList.jsx       # Container for message components
│   ├── OtpVerificationForm.jsx # OTP verification form
│   ├── PhoneInputForm.jsx    # Phone number input form
│   ├── ProtectedRoute.jsx    # Route protection component
│   └── TypingIndicator.jsx   # Typing indicator component
├── hooks/             # Custom hooks
│   ├── useChat.js            # Chat functionality hook
│   ├── useDarkMode.js        # Dark mode toggle hook
│   └── useForm.js            # Form handling hook
├── pages/             # Page components
│   ├── ChatRoomPage.jsx      # Chat room interface
│   ├── DashboardPage.jsx     # Dashboard with chatroom list
│   └── LoginPage.jsx         # Authentication page
├── redux/             # Redux store and slices
│   ├── authSlice.js          # Authentication state management
│   ├── chatSlice.js          # Chat state management
│   └── store.js              # Redux store configuration
├── services/          # API services
│   └── countryService.js     # Country data fetching service
├── utils/             # Utility functions
│   └── validation.js         # Form validation utilities
├── App.css            # Custom CSS styles
├── App.jsx            # Main app component with routing
└── main.jsx           # Entry point with Redux provider
```

## Key Features Implemented

### Authentication
- OTP-based Login/Signup flow using country codes
- Fetch country data from restcountries.com API
- Form validation using Zod
- Simulated OTP send and validation

### Dashboard
- List of user's chatrooms
- Create/Delete chatrooms functionality
- Search chatrooms by title (debounced)
- Toast notifications for user actions

### Chatroom Interface
- Real-time chat UI with user and AI messages
- Message timestamps
- Typing indicator ("Gemini is typing...")
- Simulated AI responses with throttling
- Auto-scroll to latest message
- Copy-to-clipboard feature on message hover
- Image upload support (preview URL)

### Global UX Features
- Mobile Responsive Design
- Dark Mode Toggle (with system preference detection)
- Client-side data persistence using localStorage
- Loading skeletons for chat messages
- Toast notifications for key actions
- Keyboard accessibility

## Technical Implementation Details

### Throttling
AI responses are simulated with a 2-second delay to mimic processing time. This is implemented in the [useChat hook](src/hooks/useChat.js).

### Pagination & Infinite Scroll
Messages are stored in Redux and persisted to localStorage. For infinite scroll implementation, we would load messages in chunks as the user scrolls up.

### Form Validation
Form validation is implemented using Zod schemas defined in [validation.js](src/utils/validation.js).

### Dark Mode
Dark mode is implemented with a custom hook [useDarkMode](src/hooks/useDarkMode.js) that respects system preferences and saves user preferences to localStorage.

## Setup and Run Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Testing
Unit tests are implemented using Jest and React Testing Library. Tests cover:
- Redux slice reducers
- Form validation utilities
- Custom hooks
- Component functionality

To run tests:
```bash
npm test
```

## Tech Stack
- **Framework**: React with Vite
- **State Management**: Redux Toolkit
- **Form Validation**: Zod
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Notifications**: React Hot Toast

## Requirements Fulfilled
This project fulfills all requirements of the Kuvaka Tech Frontend Developer assignment:
- ✅ OTP-based authentication with country code selection
- ✅ Chatroom management (create/delete)
- ✅ Real-time chat interface with AI simulation
- ✅ Image upload functionality
- ✅ Responsive design with dark mode
- ✅ Form validation with Zod
- ✅ State management with Redux
- ✅ Client-side data persistence
- ✅ Toast notifications
- ✅ Keyboard accessibility
- ✅ Mobile responsive design
- ✅ Reverse infinite scroll simulation
- ✅ Client-side pagination for messages

## Author
[Your Name]
[Your Contact Information]