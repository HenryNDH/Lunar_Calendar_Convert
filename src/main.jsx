// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import HomePage from './pages/HomePage.jsx';
import AdminPage from './pages/AdminPage.jsx'; // Import the new AdminPage
import NotFoundPage from './pages/NotFoundPage.jsx';
import PublicPage from "./pages/PublicPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <PublicPage />,
            },
            {
                path: ':USERID',
                element: <HomePage />,
            },
            {
                path: '/admin-a1b2c3d4-e5f6-7890-1234-567890henry',
                element: <AdminPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);