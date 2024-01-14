import logo from './logo.svg';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import './App.css';

import Layout from './routes/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

import { getCurrentUser, getTasks } from './routes/loaders/getData';

const router = createBrowserRouter([
  {
    index: true,
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    loader: getCurrentUser,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: getTasks,
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
