import { PropsWithChildren } from 'react';
import { createClient, Provider } from 'urql';

const baseUrl = (process.env.NODE_ENV === 'test'|| process.env.NODE_ENV ==='development' )? process.env.NEXT_DEV_API_ENDPOINT : process.env.NEXT_PROD_API_ENDPOINT;
console.log(baseUrl)
console.log(process.env.NODE_ENV)
// https://formidable.com/open-source/urql/docs/basics/react-preact/#providing-the-client
const client = createClient({
  url: `${baseUrl}/graphql`,
});

export function UrqlProvider({ children }: PropsWithChildren<unknown>) {
  return <Provider value={client}>{children}</Provider>;
}
