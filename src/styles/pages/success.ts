import { styled } from "@stitches/react";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100'
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',

    '&:hover': {
      color: '$green300',
    }
  }
})

export const ImagesContainer = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',

  div: {
    height: 145,
    maxWidth: 130,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '4rem',
  },
  
  img: {
    objectFit: 'cover'
  }
})
