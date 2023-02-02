import React from 'react';
import './App.css';
import HomePage from './pages/home/HomePage';
import LoanPage from './pages/loan/loanPage';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
  
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
        path: '*',
        element: <HomePage/>,
    },
]);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
