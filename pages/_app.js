import { Container, PosContainer } from '@/components/layouts'
import '@/styles/globals.css'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    router.pathname.split('/')[1] == 'pos'
      ? <PosContainer>
        <Component {...pageProps} />
      </PosContainer>
      : router.pathname.split('/')[1] == 'iframes'
        ? <Component {...pageProps} />
        : < Container >
          <Component {...pageProps} />
        </Container >
  )
}
export default MyApp
