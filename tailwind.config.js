/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        warm: {
          DEFAULT: "#cbb95b",
        },
        teal: {
          DEFAULT: "#00ffa2",
          700: "#00a811",
        },
        "oxford-blue": {
          DEFAULT: "#00273e",
        },
      },
      fontFamily: {
        "gemunu-libre": ["Gemunu Libre", "sans-serif"],
        // 'inter-tight': ['Inter Tight', 'sans-serif'],
        // 'lora': ['Lora', 'serif'],
        // 'mukta': ['Mukta', 'sans-serif'],
        // 'playfair': ['Playfair Display', 'serif'],
        // 'railway': ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
