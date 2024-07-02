import type { Config } from "tailwindcss";

interface PresetInterface{
  [key:string]:string
}

const rem0_10:PresetInterface = {};
const rem0_20:PresetInterface = {};
const rem0_200:PresetInterface = {};

for (let i = 0; i <= 2000; i++) {
  rem0_200[`${i/10}`] = `${i/10}rem`
  if(i<=200){
    rem0_20[`${i / 10}`] = `${i / 10}rem`;
  }

  if (i <= 100) {
    rem0_10[`${i / 10}`] = `${i / 10}rem`;
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
      spacing:rem0_200,
      fontSize:rem0_20,
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes:{
        RTL: {
          'from': { transform: 'translateX(0%)' },
          'to': { transform: 'translateX(-100%)' },
        },
      },
      animation:{
        'decrease-progress':'RTL'
      }
    },
  },
  plugins: [],
};
export default config;
