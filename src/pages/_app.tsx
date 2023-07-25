import { AppProps } from 'next/app'
import Image from 'next/image'

import CartButton from '../components/CartButton'
import { CartContextProvider, CartDrawer } from '../components/Cart'

import { globalStyles } from '../styles/global'
import { Container, Header } from '../styles/pages/app'
import logoImg from '../assets/logo.svg'

globalStyles()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CartContextProvider>
        <Header>
          <Image src={logoImg} alt="Ignite Shop" />
          <CartButton />
        </Header>

        <Component {...pageProps} />

        <CartDrawer />
      </CartContextProvider>
    </Container>
  )
}

export default MyApp
