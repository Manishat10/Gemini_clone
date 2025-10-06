import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ChatRoomPage from './pages/ChatRoomPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chat/:chatroomId" 
            element={
              <ProtectedRoute>
                <ChatRoomPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;