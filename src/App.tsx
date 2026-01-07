import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import Layout from "components/Layout";
import { AppRouter } from "routes/AppRouter";
import "antd/dist/reset.css";

import theme from "./theme";
import useHttpExceptions from "./hook/useHttpExceptions";

function App() {
  const { handleHttpException } = useHttpExceptions();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {},
    },
    queryCache: new QueryCache({
      onError: async (response: any) => {
        await handleHttpException(response);
      },
    }),
    mutationCache: new MutationCache({
      onError: async (response: any) => {
        await handleHttpException(response);
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ConfigProvider theme={theme}>
          <Layout>
            <AppRouter />
          </Layout>
        </ConfigProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
