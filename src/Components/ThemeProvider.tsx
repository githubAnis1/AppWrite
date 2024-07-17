import React, { FC, PropsWithChildren, createContext, useState } from 'react';

interface Palette {
  primaryColor: string;
  secondaryColor: string;
  // Add more palette properties as needed
}

// Define your light palette
const lightPalette: Palette = {
  primaryColor: '#007bff',
  secondaryColor: '#6c757d',
  // Add more light palette properties as needed
};

// Define your dark palette
const darkPalette: Palette = {
  primaryColor: '#ff6347',
  secondaryColor: '#32cd32',
  // Add more dark palette properties as needed
};

// Create the context for the theme
export const ThemeContext = createContext<{ palette: Palette; toggleTheme: () => void }>({
  palette: lightPalette,
  toggleTheme: () => {} 
});


// Define the ThemeProvider component
export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  // State to hold the current palette
  const [palette, setPalette] = useState<Palette>(lightPalette);

  // Function to toggle between light and dark palette
  const toggleTheme = () => {
    setPalette((prevPalette) => (prevPalette === lightPalette ? darkPalette : lightPalette));
  };

  const value = {
    palette: palette,
    toggleTheme: toggleTheme
  }

  // Provide the palette and toggleTheme function to the children
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
