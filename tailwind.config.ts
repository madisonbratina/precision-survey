import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}'
  ],

  theme: {
    extend: {
      backgroundImage: {
        landingPrimary: "url('~/public/images/primary-background.png')"
      },
      colors: {
        blue1: {
          DEFAULT: '#E8F1FC'
        },
        blue2: {
          DEFAULT: '#E8F1FC'
        },
        blue3: {
          DEFAULT: '#297AFC4D'
        },
        blue4: {
          DEFAULT: '#297AFC4D'
        },
        blue5: {
          DEFAULT: '#297AFC'
        },
        blue6: {
          DEFAULT: '#297AFC'
        },
        blue7: {
          DEFAULT: '#001044'
        },
        success: {
          DEFAULT: '#5cb85c'
        }
      }
    },
    fontFamily: {
      sans: ['Adelle Sans', 'sans-serif']
    }
  },
  plugins: []
};
export default config;
