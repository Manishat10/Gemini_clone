// src/components/OtpVerificationForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { otpSchema } from '../utils/validation';

const OtpVerificationForm = ({ onVerify, phoneNumber, countryCode }) => {
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: joiResolver(otpSchema),
    defaultValues: {
      otp: '',
    }
  });

  const handleResendOtp = () => {
    setIsResending(true);
    // Simulate API call to resend OTP
    setTimeout(() => {
      setIsResending(false);
      setCountdown(60);
      // Reset countdown timer
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  const onSubmit = async (data) => {
    setIsVerifying(true);
    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll accept any 6-digit code
      // In a real app, you would verify with your backend
      if (data.otp.length === 6 && /^\d+$/.test(data.otp)) {
        setShowSuccess(true);
        // Call the onVerify callback
        onVerify(data.otp);
        // The navigation is handled in the LoginPage component
      } else {
        setError('otp', {
          type: 'manual',
          message: 'Invalid OTP. Please enter a 6-digit code.'
        });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('otp', {
        type: 'manual',
        message: 'Failed to verify OTP. Please try again.'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // Countdown timer
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
          <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-pink-500 dark:text-white">Verify your phone</h2>
        <p className="mt-2 text-sm text-pink-400 dark:text-gray-300">
          We've sent a 6-digit code to {countryCode} {phoneNumber}
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="otp" className="block text-sm font-medium text-pink-500 dark:text-gray-300">
            Enter OTP
          </label>
          <div className="relative">
            <input
              type="text"
              id="otp"
              {...register('otp')}
              placeholder="Enter 6-digit code"
              className={`input-primary w-full ${
                errors.otp ? 'border-red-300 focus:ring-red-300' : ''
              }`}
              maxLength="6"
            />
            {errors.otp ? (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-red-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            ) : (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-green-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.otp && (
            <p className="text-red-300 text-sm mt-1 flex items-center">
              <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.otp.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isVerifying}
          className="btn-primary w-full flex items-center justify-center"
        >
          {isVerifying ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </>
          ) : (
            'Verify & Continue'
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-pink-500 dark:text-gray-300">
          Didn't receive the code?{' '}
          <button
            onClick={handleResendOtp}
            disabled={isResending || countdown > 0}
            className={`font-medium ${isResending || countdown > 0 ? 'text-pink-300 cursor-not-allowed' : 'text-blue-300 hover:text-blue-100 hover:underline'}`}
          >
            {isResending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
          </button>
        </p>
      </div>

      {showSuccess && (
        <div className="mt-6 p-4 bg-blue-700 text-white rounded-lg text-center border border-blue-500 flex items-center justify-center">
          <svg className="h-5 w-5 mr-2 text-green-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Verification successful! Redirecting...
        </div>
      )}
    </div>
  );
};

export default OtpVerificationForm;