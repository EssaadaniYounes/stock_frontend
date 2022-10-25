import { Container } from '@/components/layouts'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<Container>
    <Component {...pageProps} />
  </Container>)

}

export default MyApp
