import './styles/main.scss';

import router from './router';
import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from "react-query"
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;