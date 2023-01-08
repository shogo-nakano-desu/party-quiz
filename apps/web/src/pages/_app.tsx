import { UrqlProvider } from '../../graphql/urqlProvider';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider>
      <Component {...pageProps} />
    </UrqlProvider>
  );
}
