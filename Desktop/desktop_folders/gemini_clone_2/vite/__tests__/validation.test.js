import { validatePhone, validateOtp, validateChatroom } from '../src/utils/validation';

describe('validation', () => {
  describe('validatePhone', () => {
    it('should validate a correct phone number', () => {
      const data = {
        phoneNumber: '1234567890',
      };
      
      const result = validatePhone(data);
      expect(result.success).toBe(true);
    });

    it('should reject empty phone number', () => {
      const data = {
        phoneNumber: '',
      };
      
      const result = validatePhone(data);
      expect(result.success).toBe(false);
      expect(result.errors.phoneNumber).toBeDefined();
    });

    it('should reject phone number with letters', () => {
      const data = {
        phoneNumber: '123abc',
      };
      
      const result = validatePhone(data);
      expect(result.success).toBe(false);
      expect(result.errors.phoneNumber).toBeDefined();
    });
  });

  describe('validateOtp', () => {
    it('should validate a correct OTP', () => {
      const data = {
        otp: '123456',
      };
      
      const result = validateOtp(data);
      expect(result.success).toBe(true);
    });

    it('should reject incorrect OTP length', () => {
      const data = {
        otp: '12345',
      };
      
      const result = validateOtp(data);
      expect(result.success).toBe(false);
      expect(result.errors.otp).toBeDefined();
    });
  });

  describe('validateChatroom', () => {
    it('should validate a correct chatroom title', () => {
      const data = {
        title: 'Test Chatroom',
      };
      
      const result = validateChatroom(data);
      expect(result.success).toBe(true);
    });

    it('should reject empty chatroom title', () => {
      const data = {
        title: '',
      };
      
      const result = validateChatroom(data);
      expect(result.success).toBe(false);
      expect(result.errors.title).toBeDefined();
    });
  });
});