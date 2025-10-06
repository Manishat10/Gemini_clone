import { createSlice } from '@reduxjs/toolkit';

// Check if user is already authenticated from localStorage
const authToken = localStorage.getItem('authToken');
const phoneNumber = localStorage.getItem('phoneNumber');
const countryCode = localStorage.getItem('countryCode');

const initialState = {
  isAuthenticated: !!authToken,
  user: authToken ? {
    phoneNumber: phoneNumber,
    countryCode: countryCode,
    token: authToken
  } : null,
  countryCode: countryCode || '+1',
  phoneNumber: phoneNumber || '',
  otp: '',
  countries: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.countryCode = '+1';
      state.phoneNumber = '';
      state.otp = '';
      
      // Clear localStorage as well
      localStorage.removeItem('authToken');
      localStorage.removeItem('phoneNumber');
      localStorage.removeItem('countryCode');
    },
  },
});

export const {
  setAuthenticated,
  setUser,
  setCountryCode,
  setPhoneNumber,
  setOtp,
  setCountries,
  logout,
} = authSlice.actions;

export default authSlice.reducer;