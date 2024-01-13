import logo from './logo.svg';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet
} from 'react-router-dom';
import './App.css';

import Layout from './routes/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
  {
    index: true,
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
