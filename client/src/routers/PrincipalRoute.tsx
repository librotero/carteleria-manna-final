import { Routes, Route } from 'react-router-dom';
import AppRouter from './AppRouter';
import AuthRouter from './AuthRouter';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import useLocalStorage from './../hooks/useLocalStorage';
import useUser from '../store/user';


const PrincipalRoute = () => {
  const [ accessToken ] = useLocalStorage();
  const { isLogged } = useUser((state) => state);

  return (
    <Routes>
      <Route
        path='/auth/*'
        element={
          <PublicRoutes isLogged={isLogged} token={accessToken}>
            <AuthRouter />
          </PublicRoutes>
        }
      />

      {<Route 
        path='/*'
        element={
          <PrivateRoutes isLogged={accessToken}>
            <AppRouter />
          </PrivateRoutes>
        }
      />}
    </Routes>
  )
}

export default PrincipalRoute
