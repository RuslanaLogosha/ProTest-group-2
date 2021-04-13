import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeView from './views/HomeView/HomeView';
import TestView from './views/TestView/TestView';
import SpinnerLoader from './components/SpinnerLoader';
import RegisterView from './views/RegisterView';
import UsefulInfoView from './views/UsefulInfoView';
import ContactsView from './views/ContactsView/';
import { authOperations, authSelectors } from 'redux/auth';
import Skeleton from 'components/Skeleton';

// import PrivateRoute from './routes/PrivateRoute';
// import PublicRoute from './routes/PublicRoute';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const email = useSelector(authSelectors.getEmail);
  const isFetchingCurrentUser = useSelector(
    authSelectors.getIsFetchingCurrentUser,
  );
  const ErrorUnauthorized = useSelector(authSelectors.getErrorUnauthorized);

  const handleSignOutBtnClick = () => {
    dispatch(authOperations.logOut());
  };

  useEffect(() => {
    if (ErrorUnauthorized === 'Not authorized') {
      dispatch(authOperations.refreshToken());
    }
    if (!ErrorUnauthorized) {
      dispatch(authOperations.fetchCurrentUser());
    }
  }, [dispatch, ErrorUnauthorized]);

  return (
    <>
      <ToastContainer autoClose={3000} />
      {isFetchingCurrentUser ? (
        <Skeleton />
      ) : (
        <>
          <BrowserRouter>
            <Header
              isLoggedIn={isLoggedIn}
              userEmail={email}
              handleSignOutBtnClick={handleSignOutBtnClick}
            />
            <div className="content">
              <Switch>
                <Suspense fallback={<SpinnerLoader />}>
                  <Route path="/register" restricted component={RegisterView} />
                  <Route
                    exact
                    path="/"
                    component={HomeView}
                    redirectTo="/register"
                    restricted
                  />
                  <Route
                    exact
                    path="/test"
                    component={TestView}
                    redirectTo="/register"
                    restricted
                  />
                  <Route
                    exact
                    path="/materials"
                    component={UsefulInfoView}
                    redirectTo="/register"
                    restricted
                  />
                  <Route path="/contacts" component={ContactsView} />
                </Suspense>
              </Switch>
            </div>
            <Footer />
          </BrowserRouter>
        </>
      )}
    </>
  );
}
export default App;
