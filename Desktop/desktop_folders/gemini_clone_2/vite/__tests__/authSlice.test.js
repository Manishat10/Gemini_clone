import { store } from '../src/redux/store';
import authReducer, {
  setAuthenticated,
  setUser,
  setCountryCode,
  setPhoneNumber,
  setOtp,
  setCountries,
  logout,
} from '../src/redux/authSlice';

describe('authSlice', () => {
  it('should handle initial state', () => {
    const initialState = {
      isAuthenticated: false,
      user: null,
      countryCode: '+1',
      phoneNumber: '',
      otp: '',
      countries: [],
    };
    
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setAuthenticated', () => {
    const actual = authReducer(undefined, setAuthenticated(true));
    expect(actual.isAuthenticated).toEqual(true);
  });

  it('should handle logout', () => {
    const initialState = {
      isAuthenticated: true,
      user: { name: 'Test User' },
      countryCode: '+44',
      phoneNumber: '123456789',
      otp: '123456',
      countries: [{ code: '+1', name: 'USA' }],
    };
    
    const actual = authReducer(initialState, logout());
    expect(actual.isAuthenticated).toEqual(false);
    expect(actual.user).toEqual(null);
    expect(actual.countryCode).toEqual('+1');
    expect(actual.phoneNumber).toEqual('');
    expect(actual.otp).toEqual('');
  });
});