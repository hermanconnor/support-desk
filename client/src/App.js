import { Route, Routes } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
