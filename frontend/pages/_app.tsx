import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { AppPropsWithLayout } from 'types/app.types';
import AppLayout from '../layout/AppLayout';

import 'styles/global.css';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
