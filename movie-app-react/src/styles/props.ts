import { useSafeArea } from 'native-base'

// This file is used to define props that can be used in the theme
export const bgProps = {
  _dark: {
    bg: 'brand.900',
  },
  _light: {
    bg: 'coolGray.100',
  },
}

export const textProps = {
  primaryColor: {
    _dark: {
      color: 'brand.200',
    },
    _light: {
      color: 'coolGray.800',
    },
  },
  secondaryColor: {
    _dark: {
      color: 'brand.600',
    },
    _light: {
      color: 'coolGray.400',
    },
  },
}


export const formProps = {
  label: {
    _text: {
      fontSize: 16,
      fontWeight: '500',
    },
    _dark: {
      _text: {
        color: 'brand.600',
      },
    },
    _light: {
      _text: {
        color: 'coolGray.600',
      },
    },
  },
  input: {
    px: 4,
    h: 12,
    borderRadius: 12,
    fontSize: 16,
    variant: 'filled',
    borderWidth: 2,
    _dark: {
      bg: 'brand.700',
      borderColor: 'brand.700',
      placeholderTextColor: 'brand.600',
      _focus: {
        borderColor: 'extra.purple',
        bg: 'brand.700',
      },
    },
    _light: {
      bg: 'coolGray.200',
      placeholderTextColor: 'coolGray.400',
      borderColor: 'coolGray.200',
      _focus: {
        borderColor: 'extra.purple',
        bg: 'coolGray.200',
      },
    },
    _invalid: {
      borderWidth: 1,
    },
  },
  error: {
    _text: {
      fontSize: 'sm',
      fontWeight: '400',
    },
  },
  link: {
    isUnderlined: false,
    _dark: { _text: { color: 'blue.500' } },
    _light: { _text: { color: 'blue.500' } },
    _text: {
      fontSize: 14,
      fontWeight: '500',
    },
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    _dark: { color: 'brand.400' },
    _light: { color: 'coolGray.400' },
  },
}

export const buttonProps = {
  mt: 2,
  borderRadius: 16,
  h: 12,
  _text: {
    fontSize: 16,
    fontWeight: 600,
  },
  _pressed: {
    opacity: 0.8,
    bg: 'extra.purple',
  },
  _light: {
    _text: {
      color: 'coolGray.100',
    },
  },
  _dark: {
    _text: {
      color: 'brand.200',
    },
  },
  bg: 'extra.purple',
}
