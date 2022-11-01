import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserLoggedIn = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Navigate replace to='/' /> : <Outlet />;
};

export default UserLoggedIn;
