import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { autoLogin } from '@/services/autoLogin';
import { useAuthStore } from '@/store/authStore';

const Home = ({ dataUser }) => {
  const router = useRouter();
  const { setUser, user } = useAuthStore(state => state);
  useEffect(() => {
    if (dataUser) {
      setUser(dataUser);
      return () => router.push('/dashboard');
    }
    return () => router.push('/auth/login');
  }, [router, dataUser, setUser]);

  return (

    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Stock app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await autoLogin(ctx);
  return {
    props: {
      dataUser: res.dataUser,
    }
  }
}

export default Home
