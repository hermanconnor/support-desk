import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import Spinner from './Spinner';
// import useAuth from '../hooks/useAuth';

const PrivateRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  // const { loggedIn, checkingStatus } = useAuth();

  // if (checkingStatus) return <Spinner />;

  return user ? <Outlet /> : <Navigate replace to='/login' />;
};

export default PrivateRoutes;
