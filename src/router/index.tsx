import { createBrowserRouter } from 'react-router-dom';

import PortalLayout from '../layouts/PortalLayout';

const router = createBrowserRouter([
    {
        path: "/",
        element: <PortalLayout />,
    },
]);

export default router;