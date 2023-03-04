import React from 'react';
import '../../Styles/Login.scss';
import TextInput from '../../Forms/TextBox';
import {useFormik} from 'formik';
import * as yup from 'yup';
import CustomButton from '../../Forms/Buttons';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {setStorage} from '../../Utitlities/Storage';

const Login = () => {
  let navigate = useNavigate();

  const validationSchema = yup.object({
    username: yup
      .string('Enter your username')
      .min(6, 'Username should be of minimum 6 characters')
      .required('Valid username is required'),
    password: yup
      .string('Enter your password')
      .min(6, 'Password should be of minimum 6 characters')
      .required('Valid password is required'),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: ({username, password}) => {
      Login(username, password);
    },
  });
  const Login = (username, password) => {
    if (
      String(username) === 'ipgautomotive' &&
      String(password) === 'carmaker'
    ) {
      setStorage('userInfo', username);
      setStorage('isLogin', true);
      navigate('/home');
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <>
      <div className='container_login'>
        <div className='login_box'>
          <div className='logo_area'>Weather Inc</div>
          <h3 data-testid='Login'>Login</h3>
          <p className='header' data-testid='welcome-notes'>
            Please enter your login information to proceed
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className='form_separator'></div>
            <TextInput
              value={formik.values.username}
              fullWidth
              type='text'
              name='username'
              testid='username'
              key='username'
              error={formik.touched.username && Boolean(formik.errors.username)}
              onChange={formik.handleChange}
              label='Username'
              errorText={formik.touched.username && formik.errors.username}
            />

            <div className='form_separator'></div>
            <TextInput
              label='Password'
              type={'password'}
              error={formik.touched.password && Boolean(formik.errors.password)}
              name='password'
              testid='password'
              key='password'
              errorText={formik.touched.password && formik.errors.password}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <div className='form_separator'></div>
            <CustomButton testid='submit-button' title='Login' />
          </form>
        </div>
        <footer>
          <p data-testid='copyright'>© 2020 - 2023 Weather inc</p>
        </footer>
      </div>
    </>
  );
};
export default Login;
