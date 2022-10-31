import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner';
import { register, reset } from '../features/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPwd: '',
  });

  const { name, email, password, confirmPwd } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPwd) {
      return toast.error('Please enter all fields');
    }

    if (password !== confirmPwd) return toast.error('Passwords do not match');

    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Enter your name'
              className='form-control'
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='form-control'
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='form-control'
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              id='confirmPwd'
              name='confirmPwd'
              placeholder='Confirm password'
              className='form-control'
              value={confirmPwd}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
