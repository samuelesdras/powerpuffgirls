import React from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Home from './components/home';
import Details from './components/details';
import logo from '../src/assets/showlogo.png';
import notFound from '../src/assets/notfound.webp';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="bgimg" />
      <div className="bgcolor header-margin">
        <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom pt-2">
          <Link
            to="/"
            className="d-flex align-items-center text-dark text-decoration-none"
          >
            <img alt="Logo" src={logo} />
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="details/:season/:chapter" element={<Details />}></Route>

          <Route
            path="*"
            element={
              <div className="d-flex">
                <p>We couldn't find what you're looking for...</p>
                <img alt="Not found" src={notFound} />
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default AppRoutes;
