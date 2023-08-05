import React from 'react';

export const themes = {
  light: {
    background: 'white',
  },
  dark: {
    background: '#222222',
    color: 'white',
    input: '#222222',
  },
};

export const ThemeContext = React.createContext(themes.light);
