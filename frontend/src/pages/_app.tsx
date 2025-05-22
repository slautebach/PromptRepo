import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/AuthContext';
import { QueryProvider } from '../contexts/QueryContext';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <QueryProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </QueryProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp; 