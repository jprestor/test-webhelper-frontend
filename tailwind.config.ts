import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      '2xl': { max: '1379px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
    },
    colors: {
      ContentBlack: '#121212',
      MainYellow: '#ffde31',
      Grey: '#777',
      ErrorRed: '#d84444',
      GoodGreen: '#0fcc5b',
      InfoBlue: '#2c80ff',
      White: '#fff',
      transparent: 'transparent',
    },
    extend: {
      spacing: {
        '7.5': '1.875rem',
      },
    },
  },
  plugins: [
    require('daisyui'),
    plugin(({ addComponents }) => {
      addComponents({
        '.container': {
          margin: '0 auto',
          width: '100%',
          maxWidth: '83.25rem',
          padding: '0 1rem',
        },
      });
    }),
  ],
};
export default config;
