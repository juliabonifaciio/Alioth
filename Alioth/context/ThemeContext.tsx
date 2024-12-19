// Contexto do tema, para definir modo escuro e claro
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Text, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof Colors.light | typeof Colors.dark;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeReducer = (state: Theme, action: { type: 'TOGGLE_THEME' }): Theme => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return state === 'dark' ? 'light' : 'dark';
    default:
      return state;
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, dispatch] = useReducer(themeReducer, 'dark');

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, []);

  const value = {
    theme,
    toggleTheme,
    colors: Colors[theme],
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};