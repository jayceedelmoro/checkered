import { Outlet, Navigate } from "react-router-dom";

import Header from "../components/Header";

const Layout = () => {

  return (
    <>
        <Header />
        { localStorage.getItem('userId') ? <Outlet /> : <Navigate to="/login" /> }
    </>
  )
};

export default Layout;