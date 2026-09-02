/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './EVENT-BACKEND-NODEJS/event-admin-ui/index.html',
    './EVENT-BACKEND-NODEJS/event-admin-ui/src/**/*.{js,jsx,ts,tsx}',
    './EVENT-BACKEND-NODEJS/event-managment/index.html',
    './EVENT-BACKEND-NODEJS/event-managment/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
