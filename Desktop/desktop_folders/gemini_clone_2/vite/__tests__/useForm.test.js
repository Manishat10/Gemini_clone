import { renderHook, act } from '@testing-library/react';
import useForm from '../src/hooks/useForm';

describe('useForm', () => {
  const initialValues = { name: '', email: '' };
  
  it('should initialize with correct values', () => {
    const { result } = renderHook(() => useForm(initialValues));
    
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
  });

  it('should handle input changes', () => {
    const { result } = renderHook(() => useForm(initialValues));
    
    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'John' } });
    });
    
    expect(result.current.values.name).toBe('John');
  });

  it('should reset form', () => {
    const { result } = renderHook(() => useForm(initialValues));
    
    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'John' } });
      result.current.reset();
    });
    
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
  });
});