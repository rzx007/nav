/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/**/*.{ts,js,tsx,vue,md}",
  ],
  options: {
    safelist: ["html", "body"],
  },
};
