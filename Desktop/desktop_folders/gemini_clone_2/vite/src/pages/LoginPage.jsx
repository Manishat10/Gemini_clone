// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import PhoneInputForm from '../components/PhoneInputForm';
import OtpVerificationForm from '../components/OtpVerificationForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setUser, setPhoneNumber, setCountryCode } from '../redux/authSlice';
import useDarkMode from '../hooks/useDarkMode';

const LoginPage = () => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumberLocal] = useState('');
  const [countryCode, setCountryCodeLocal] = useState('India');
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleContinue = (phone, country) => {
    setPhoneNumberLocal(phone);
    setCountryCodeLocal(country);
    setStep('otp');
  };

  const handleVerify = (otp) => {
    // Simulate successful authentication
    const user = {
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      token: 'fake-token-' + Date.now()
    };
    
    // Update Redux store
    dispatch(setAuthenticated(true));
    dispatch(setUser(user));
    dispatch(setPhoneNumber(phoneNumber));
    dispatch(setCountryCode(countryCode));
    
    // Also save to localStorage for persistence
    localStorage.setItem('authToken', user.token);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('countryCode', countryCode);
    
    // Navigate to dashboard after successful authentication
    // Using a short timeout to show the success message
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black dark:bg-gray-500 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">G</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-pink-500 dark:text-white">
                Gemini Chat
              </h1>
              <p className="mt-2 text-sm text-pink-400 dark:text-gray-200">
                Enter your phone number to get started
              </p>
            </div>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-pink-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-700 focus:outline-none transition-colors duration-200"
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
          </div>
        </div>

        <div className="bg-blue-600 py-8 px-4 shadow-custom rounded-2xl sm:px-10 transition-all duration-300 hover:shadow-lg">
          {step === 'phone' ? (
            <PhoneInputForm onContinue={handleContinue} />
          ) : (
            <OtpVerificationForm 
              onVerify={handleVerify} 
              phoneNumber={phoneNumber} 
              countryCode={countryCode} 
            />
          )}
        </div>
        
        <div className="text-center text-sm text-pink-500 dark:text-gray-300 mt-6">
          <p>© 2025 Gemini Chat. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;