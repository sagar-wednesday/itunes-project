// import React from 'react';
// import { renderProvider } from '@utils/testUtils';
// import ProtectedRoute from '../index';
import '@testing-library/jest-dom';
// import { Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
// import { SearchTrackContainer } from '@app/containers/SearchTrackContainer/index';

jest.mock('@utils/routeConstants', () => {
  return {
    dashboard: {
      route: '/',
      isProtected: true
    },
    login: {
      route: '/login',
      isProtected: false
    }
  };
});

describe('<ProtectedRoute />', () => {
  // let submitSpy;
  // beforeEach(() => {
  //   submitSpy = jest.fn();
  // });
  // it('should  render the component if user logged in and access protected route', () => {
  //   const { getByTestId } = renderProvider(
  //     <ProtectedRoute isLoggedIn={true} render={SearchTrackContainer} exact={true} path="/" />
  //   );
  //   expect(getByTestId('redirect')).toBeTruthy();
  // });
  // it('should not render component if user is not logged in', () => {
  //   renderProvider(
  //     <ProtectedRoute isLoggedIn={false} render={SearchTrackContainer} exact={true} path="/" handleLogout={submitSpy} />
  //   );
  //   expect(submitSpy).toHaveBeenCalledTimes(1);
  // });
  // it('should render component , not logged in, unprotected route', () => {
  //   const history = createBrowserHistory();
  //   renderProvider(
  //     <Router history={history}>
  //       <ProtectedRoute isLoggedIn={false} render={SearchTrackContainer} exact={true} path="/login" />
  //     </Router>
  //   );
  //   expect(history.location.pathname).toBe('/login');
  // });
  // it('should redirect to the dashboard if logged in and accessing login page(unprotected)', () => {
  //   const history = createBrowserHistory();
  //   renderProvider(
  //     <Router history={history}>
  //       <ProtectedRoute isLoggedIn={true} render={SearchTrackContainer} exact={true} path="/login" />
  //     </Router>
  //   );
  //   expect(history.location.pathname).toBe('/');
  // });
  it('should just run the protected route', () => {});
});
