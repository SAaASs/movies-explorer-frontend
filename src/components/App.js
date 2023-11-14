import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import ProtectedRouteElement from './ProtectedRouteElement';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Movies from './Movies';
import Profile from './Profile';
import NotFound from './NotFound';
import { api } from '../utils/MainApi';
import Loader from './Loader';
function App() {
  const [isUserChecked, setIsUserChecked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
  });
  React.useEffect(() => {
    if (localStorage.getItem('movExpToken')) {
      api._headers = api._headers = {
        'Content-Type': 'application/json',
        authorisation: localStorage.getItem('movExpToken'),
      };
      api
        .getMe()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch(() => {
          localStorage.removeItem('movExpToken');
        })
        .finally(() => {
          setIsUserChecked(true);
        });
    }
  }, []);
  return isUserChecked ? (
    <>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Routes>
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                isLoggedIn={currentUser.name == '' ? false : true}
                element={Movies}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                isLoggedIn={currentUser.name == '' ? false : true}
                element={Profile}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                isLoggedIn={currentUser.name == '' ? false : true}
                element={Movies}
              />
            }
          />
          <Route />
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  ) : (
    <Loader></Loader>
  );
}

export default App;
