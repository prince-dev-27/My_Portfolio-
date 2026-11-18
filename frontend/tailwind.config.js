/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          main: '#0B1220',
          secondary: '#111C2F',
          card: '#111C2F',
          elevated: '#1B2A41',
          border: '#26364D',
        },
        accent: {
          primary: '#2563EB',
          secondary: '#60A5FA',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
        },
        status: {
          success: '#22C55E',
          error: '#EF4444',
          warning: '#F59E0B',
        }
      },
      backgroundColor: {
        main: '#0B1220',
        secondary: '#111C2F',
        card: '#111C2F',
        elevated: '#1B2A41',
      },
      textColor: {
        primary: '#F8FAFC',
        secondary: '#94A3B8',
      },
      borderColor: {
        DEFAULT: '#26364D',
        subtle: '#26364D',
      }
    },
  },
  plugins: [],
}
