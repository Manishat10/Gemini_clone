import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  setAuthenticated,
  setCountries,
  setCountryCode,
  setPhoneNumber,
  setOtp,
} from '../redux/authSlice';
import { fetchCountries } from '../services/countryService';
import { validatePhone, validateOtp } from '../utils/validation';
import useForm from '../hooks/useForm';
import PhoneInputForm from '../components/PhoneInputForm';
import OtpVerificationForm from '../components/OtpVerificationForm';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countryCode, phoneNumber, otp, countries } = useSelector(
    (state) => state.auth
  );
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  // Form handlers
  const phoneForm = useForm(
    { countryCode, phoneNumber },
    validatePhone
  );

  const otpForm = useForm({ otp }, validateOtp);

  // Fetch countries on component mount
  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      const countryData = await fetchCountries();
      dispatch(setCountries(countryData));
      setLoading(false);
    };

    loadCountries();
  }, [dispatch]);

  // Handle phone number submission
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    
    if (!phoneForm.validate()) return;

    // Dispatch values to Redux store
    dispatch(setCountryCode(phoneForm.values.countryCode));
    dispatch(setPhoneNumber(phoneForm.values.phoneNumber));

    // Simulate sending OTP
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setTimer(30); // 30 seconds timer
      toast.success('OTP sent successfully!');
    }, 1000);
  };

  // Handle OTP submission
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    
    if (!otpForm.validate()) return;

    // Simulate OTP verification
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      // In a real app, you would verify the OTP with your backend
      if (otpForm.values.otp === '123456') {
        dispatch(setAuthenticated(true));
        dispatch(setOtp(otpForm.values.otp));
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid OTP. Please try again.');
        otpForm.reset();
      }
    }, 1000);
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    if (timer > 0) return;
    
    // Simulate resending OTP
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTimer(30);
      toast.success('OTP resent successfully!');
    }, 1000);
  };

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Gemini Chat
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {step === 'phone'
              ? 'Enter your phone number to get started'
              : 'Enter the OTP sent to your phone'}
          </p>
        </div>

        {step === 'phone' ? (
          <PhoneInputForm
            form={phoneForm}
            countries={countries}
            loading={loading}
            onSubmit={handlePhoneSubmit}
            onCountryChange={(value) =>
              phoneForm.handleSelectChange('countryCode', value)
            }
          />
        ) : (
          <OtpVerificationForm
            form={otpForm}
            loading={loading}
            timer={timer}
            onSubmit={handleOtpSubmit}
            onResendOtp={handleResendOtp}
            onBackToPhone={() => setStep('phone')}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;