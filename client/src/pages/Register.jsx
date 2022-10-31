import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPwd: '',
  });

  const { name, email, password, confirmPwd } = formData;

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
  };

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
