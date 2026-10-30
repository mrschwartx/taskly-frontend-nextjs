import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    'html, body': {
      bg: 'bg',
      color: 'fg',
      transition: 'background-color 0.2s ease, color 0.2s ease',
    },
    '.react-datepicker': {
      bg: 'bg.panel',
      color: 'fg',
      borderColor: 'border',
      fontFamily: 'inherit',
    },
    '.react-datepicker__header': {
      bg: 'bg.muted',
      borderColor: 'border',
    },
    '.react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name':
      {
        color: 'fg',
      },
    '.react-datepicker__day:hover, .react-datepicker__time-list-item:hover': {
      bg: 'bg.emphasized !important',
    },
    '.react-datepicker__day--disabled, .react-datepicker__day--outside-month': {
      color: 'fg.subtle',
    },
    '.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected, .react-datepicker__time-list-item--selected':
      {
        bg: 'brand.solid !important',
        color: 'brand.contrast !important',
      },
    '.react-datepicker__time-container, .react-datepicker__time, .react-datepicker__time-box': {
      bg: 'bg.panel',
      borderColor: 'border',
    },
    '.react-datepicker__input-time-container': {
      color: 'fg',
    },
    '.react-datepicker__triangle': {
      display: 'none',
    },
    '.react-datepicker-popper': {
      zIndex: 'popover',
    },
    'select option': {
      bg: 'bg.panel',
      color: 'fg',
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#FFF1F3' },
          100: { value: '#FFE0E6' },
          200: { value: '#FFC6D1' },
          300: { value: '#FF9BAE' },
          400: { value: '#FA6483' },
          500: { value: '#F02356' },
          600: { value: '#D91548' },
          700: { value: '#B50F3C' },
          800: { value: '#930F37' },
          900: { value: '#7A1034' },
          950: { value: '#440519' },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          contrast: { value: { _light: 'white', _dark: 'white' } },
          fg: { value: { _light: '{colors.brand.700}', _dark: '{colors.brand.300}' } },
          subtle: { value: { _light: '{colors.brand.100}', _dark: '{colors.brand.950}' } },
          muted: { value: { _light: '{colors.brand.200}', _dark: '{colors.brand.900}' } },
          emphasized: { value: { _light: '{colors.brand.300}', _dark: '{colors.brand.800}' } },
          solid: { value: { _light: '{colors.brand.600}', _dark: '{colors.brand.500}' } },
          focusRing: { value: { _light: '{colors.brand.500}', _dark: '{colors.brand.400}' } },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
