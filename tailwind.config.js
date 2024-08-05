/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      colors: {
         black: '#000',
         white: '#fff',
         blue: '#005bff',
         red: '#ff4848',
         pageColor: '#f2f4f6',
         primary500: '#32425f',
         primary400: '#737476',
         primary300: '#78b4fb',
         primary200: '#cbe3ff',
         primary100: '#ebf1fb',
      },
      fontSize: {
         verySmall: ['var(--very-small-fz)', 'var(--line-height)'],
         small: ['var(--small-fz)', 'var(--line-height)'],
         default: ['var(--default-fz)', 'var(--line-height)'],
         defaultMax: ['var(--default-max)', 'var(--line-height)'],
         littleBig: ['var(--little-big-fz)', 'var(--line-height)'],
         bigSmall: ['var(--big-small-fz)', 'var(--line-height)'],
         big: ['var(--big-fz)', 'var(--line-height)'],
         VeryBig: ['var(--very-big-fz)', 'var(--line-height)'],
      },
      extend: {
         screens: {
            md1: { max: '1222px' },
            md2: { max: '768px' },
            md3: { max: '576px' },

            mmd1: { min: '1222px' },
            mmd2: { min: '768px' },
            mmd3: { min: '576px' },
         },
      },
   },
   plugins: [],
};
