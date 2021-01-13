import React, { useEffect, Suspense } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../redux/actions';
import { PrivateRoute, NonAuthRoute } from '../functions/PrivatePublicRoures';
import loading from '../../public/img/loading.gif';

const SignIn = React.lazy(() => import('./Authorization/SignIn'));
const Registration = React.lazy(() => import('./Authorization/Registration'));
const NotFound = React.lazy(() => import('./NotFound/NotFound'));
const Main = React.lazy(() => import('./Main/Main'));

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userData);
  const { userLoading } = useSelector((state) => state);

  useEffect(() => {
    if (isAuthenticated === null) {
      loadUser()(dispatch);
    }
  }, []);

  if (userLoading === 'requested') {
    return (<img className="loading-img" src={loading} alt="loading" />);
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<img className="loading-img" src={loading} alt="loading" />}>
        <Switch>
          <PrivateRoute exact path="/">
            <Main />
          </PrivateRoute>
          <NonAuthRoute path="/signup">
            <Registration />
          </NonAuthRoute>
          <NonAuthRoute path="/login">
            <SignIn/>
          </NonAuthRoute>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
