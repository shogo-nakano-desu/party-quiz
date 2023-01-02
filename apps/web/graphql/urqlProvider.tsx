import { PropsWithChildren } from 'react';
import { createClient, defaultExchanges, errorExchange, Provider } from 'urql';

const baseUrl = process.env.NODE_ENV === 'test' ? process.env.API_ENDPOINT : '';

// https://formidable.com/open-source/urql/docs/basics/react-preact/#providing-the-client
const client = createClient({
  url: `${baseUrl}/graphql`,
});

export function UrqlProvider({ children }: PropsWithChildren<unknown>) {
  return <Provider value={client}>{children}</Provider>;
}
