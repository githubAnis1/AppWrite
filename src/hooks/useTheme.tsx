
import { useContext } from 'react';
import { ThemeContext } from '../Components/ThemeProvider';

export const useTheme = () => {
  return useContext(ThemeContext);
};