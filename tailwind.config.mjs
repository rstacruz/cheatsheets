import resolveConfig from 'tailwindcss/resolveConfig'

const defaults = resolveConfig({})

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      spacing: {
        // max-widths
        content: '1232px',
        slim: '740px'
      },
      colors: {
        mildindigo: {
          50: '#F2F1F8',
          100: '#E8E7F3',
          200: '#D0CFE8',
          300: '#B5B4DA',
          400: '#9E9CCF',
          500: '#8784C3',
          600: '#6F6BB7',
          700: '#4C4893',
          800: '#312F60',
          900: '#191730',
          950: '#0C0C18'
        }
      },

      fontFamily: {
        manrope: ['Manrope', ...defaults.theme.fontFamily.sans]
      },

      boxShadow: {
        'lg-cool': [
          '0 1px 1px rgb(0 0 80 / 0.05)',
          '0 1.5px 3px -1px rgb(0 0 80 / 0.15)',
          '0 4px 6px -1px rgb(0 0 80 / 0.07)',
          '0 8px 12px -1px rgb(0 0 80 / 0.04)'
        ].join(', '),
        'md-cool': [
          '0 0 0 1px rgb(0 0 80 / 0.1)',
          '0 1px 1px rgb(0 0 80 / 0.1)',
          '0 1.5px 3px -2px rgb(0 0 80 / 0.3)',
          '0 4px 6px rgb(0 0 80 / 0.04)',
          '0 8px 12px -1px rgb(0 0 80 / 0.03)'
        ].join(', ')
      }
    }
  },
  plugins: []
}
