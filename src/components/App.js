import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import ProtectedRouteElement from './ProtectedRouteElement';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Movies from './Movies';
import Profile from './Profile';
import NotFound from './NotFound';
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRouteElement isLoggedIn={true} element={Home} />}
        />
        <Route
          path="/movies"
          element={<ProtectedRouteElement isLoggedIn={true} element={Movies} />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement isLoggedIn={true} element={Profile} />
          }
        />
        <Route />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
