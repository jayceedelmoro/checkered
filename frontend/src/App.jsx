import logo from './logo.svg';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet
} from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
