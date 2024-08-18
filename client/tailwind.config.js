/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ['GeistSans_3a0388', 'GeistSans_Fallback_3a0388', 'sans-serif'],
      },
      colors: {
        primary: '#1f2937', // Dark gray (background)
        secondary: '#4b5563', // Gray (UI elements)
        accent: '#3b82f6', // Blue (buttons/links)
        textLight: '#f9fafb', // Almost white (text)
        textDark: '#111827', // Almost black (text)
      },
    },
  },
  plugins: [],
};