import { UrqlProvider } from '../../graphql/urqlProvider';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { extendTheme } from '@chakra-ui/react';
// 2. custom colorやfontなどで theme を拡張する
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};
const theme = extendTheme({ colors });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UrqlProvider>
        <Component {...pageProps} />
      </UrqlProvider>
    </ChakraProvider>
  );
}
