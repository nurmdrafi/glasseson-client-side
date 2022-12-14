module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Comforter_Brush: ["Comforter Brush", "cursive"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0d9488",
          secondary: "#F1F5F9",
          success: "#07b03f",
          warning: "#FEBD17",
          error: "#EF4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
