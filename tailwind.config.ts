import type { Config } from "tailwindcss";

interface PresetInterface{
  [key:string]:string
}

const rem1_10:PresetInterface = {};
const rem1_20:PresetInterface = {};
const rem1_200:PresetInterface = {};

for (let i = 1; i <= 2000; i++) {
  rem1_200[`${i/10}`] = `${i/10}rem`
  if(i<=200){
    rem1_20[`${i / 10}`] = `${i / 10}rem`;
  }

  if (i <= 100) {
    rem1_10[`${i / 10}`] = `${i / 10}rem`;
  }
}


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing:rem1_200,
      fontSize:rem1_20,
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

    },
  },
  plugins: [],
};
export default config;
