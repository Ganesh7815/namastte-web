module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mydark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          "base-100": "#2a2e37",
          "base-300": "#1f2937", 
        },
      },
    ],
  },
};
