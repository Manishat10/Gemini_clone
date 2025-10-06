import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../redux/chatSlice';

const useDarkMode = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.chat.darkMode);

  useEffect(() => {
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      // Invert the logic: 'dark' in localStorage means light mode in UI, 'light' means dark mode in UI
      dispatch(setDarkMode(savedTheme === 'light'));
    } else {
      // Check system preference and invert it
      if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // Invert the system preference
        dispatch(setDarkMode(!prefersDark));
      } else {
        dispatch(setDarkMode(true)); // Default to dark mode (which shows sun icon)
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // Apply theme to document with inverted logic
    if (typeof document !== 'undefined') {
      // Invert the logic: when isDarkMode is true, we want light theme in UI (sun icon)
      if (isDarkMode) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;