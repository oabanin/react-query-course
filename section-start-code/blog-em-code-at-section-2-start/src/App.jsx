import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Posts } from "./Posts";
import "./App.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // These are disabled for now, to not increase load on API for now
            retry: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
        <ReactQueryDevtools />
      </div>
    </QueryClientProvider>
  );
}

export default App;
