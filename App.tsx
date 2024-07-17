import React from 'react';
import Router from './src/routes/Router';
import { AppwriteProvider } from './src/appwrite/AppwriteContext';
import { ThemeProvider } from './src/Components/ThemeProvider';
import { useColorScheme } from 'react-native';
import { Root as PopupProvider } from 'react-native-popup-confirm-toast'




export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  console.log("isDarkMode",isDarkMode);

  return (
      <AppwriteProvider>
        <ThemeProvider>
          <PopupProvider/>
            <Router/>
        </ThemeProvider>
      </AppwriteProvider>
    );
  }


