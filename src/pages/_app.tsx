import { AppProps } from 'next/app'
import logoImg from '../assets/logo.svg'

import { globalStyles } from '../styles/global'
import { Container, Header } from '../styles/pages/app'
import Image from 'next/image'

globalStyles()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="Ignite Shop" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
