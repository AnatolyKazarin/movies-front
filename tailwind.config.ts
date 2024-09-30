import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        input: 'var(--input)',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)'],
        mono: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
  corePlugins: { preflight: false },
};
export default config;
