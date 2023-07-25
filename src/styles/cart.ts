import { styled } from "@stitches/react";

export const CartDrawer = styled('aside', {
  $$asideWith: 480,
  
  variants: {
    open: {
      true: {
        opacity: 1,
        transform: 'translateX(-100%)',
      }
    }
  },

  opacity: 0,
  transition: 'all 0.3s ease-in-out',
  
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: -480,
  width: 480,
  
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$gray800',

  header: {
    padding: 24,
  
    button: {
      display: 'block',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      marginLeft: 'auto',
    }
  },

  main: {
    overflow: 'auto',
    flex: 1,
    padding: '0 48px 48px 48px',
    display: 'flex',
    flexDirection: 'column',
    
    h1: {
      fontSize: '$lg',
      marginBottom: '2rem',
    },

    ul: {
      listStyle: 'none',

      'li + li': {
        marginTop: '1.5rem',
      },
    },

    '.spacer': {
      flex: 1
    }
  },

  footer: {
    marginTop: '1rem',
    lineHeight: 1.4,

    div: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    button: {
      border: 'none',
      width: '100%',
      padding: '20px 32px',
      marginTop: '3rem',
      backgroundColor: '$green500',
      fontWeight: 'bold',
      cursor: 'pointer',
      color: '$white',
      fontSize: '$md',
      borderRadius: 8,
      
      '&:hover': {
        opacity: 0.8,
      }
    },

    '.amount': {
      color: '$gray100',

      span: {
        fontSize: '$md'
      }
    },

    '.total': {
      label: {
        fontSize: '$md'
      },

      span: {
        fontSize: '$xl'
      },
    }
  }
})

export const CartItem = styled('li', {
  display: 'flex',
  gap: '1.25rem',
  color: '$gray300',
  fontSize: '$md',
  lineHeight: '160%',

  strong: {
    color: '$white',
  },

  button: {
    display: 'block',
    marginTop: '1rem',
    color: '$green500',
    fontWeight: 'bold',
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',

    '&:hover': {
      color: '$green300',
    }
  }
})

export const ImageContainer = styled('div', {
  height: 95,
  width: 95,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
  img: {
    objectFit: 'cover'
  }
})
