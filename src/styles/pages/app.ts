import { styled } from "@stitches/react";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
})

export const CartButton = styled('button', {
  variants: {
    cartHasItems: {
      true: {
        span: {
          position: 'absolute',
          top: -8,
          right: -8,
          boxShadow: '0 0 0 3px $gray900',

          background: '$green500',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          width: 24,
          height: 24,
          fontSize: 14,
          fontWeight: 'bold',
          color: '$white',
          borderRadius: '50%',
        }
      },
    },
  },
  
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  borderRadius: 6,
  backgroundColor: '$gray800',
  border: 'none',
  cursor: 'pointer',

  span: {
    display: 'none',
  }
})
