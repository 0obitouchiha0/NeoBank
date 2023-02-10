import React from 'react';
import './App.css';
import HomePage from './pages/home/HomePage';
import LoanPage from './pages/loan/LoanPage';
import LoanContinuation from './pages/loanContinuation/LoanContinuation';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SchedulePage from './pages/schedule/SchedulePage';
import DocumentsSigningPage from './pages/documentsSigningPage/DocumentsSigningPage';
import CodePage from './pages/code/CodePage';
import ErrorPage from './pages/error/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,
    },
    {
        path: 'loan',
        element: <LoanPage/>,
    },
    {
        path: 'loan/:applicationId',
        element: <LoanContinuation/>,
    },
    {
        path: 'loan/:applicationId/document',
        element: <SchedulePage/>,
    },
    {
        path: 'loan/:applicationId/document/sign',
        element: <DocumentsSigningPage />,
    },
    {
        path: 'loan/:applicationId/code',
        element: <CodePage />,
    },
    {
        path: '*',
        element: <ErrorPage/>,
    },
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
