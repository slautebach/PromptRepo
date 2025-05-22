import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/AuthContext';
import { QueryProvider } from '../contexts/QueryContext';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryProvider>
    </ChakraProvider>
  );
}

export default MyApp; 