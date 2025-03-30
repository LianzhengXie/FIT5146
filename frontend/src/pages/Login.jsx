import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { API_URL, APP_NAME_TITLE, JWT_TOKEN } from '../constants';

const Login = () => {
  const [code, setCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const redirectAfterLogin = async (token) => {
    const decodedToken = jwtDecode(token);
    if (decodedToken.visit_dt_tm) {
      navigate("/home", { replace: true });
    } else {
      // if decodedToken has no visit key, redirect to '/questionnaire'
      navigate("/admin");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      code: code,
    }
    let ENDPOINT = API_URL + '/login';
    if (isAdmin) {
      body = {
        username: code,
        password: password,
      }
      ENDPOINT = API_URL + '/login-admin';
    }
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const result = await response.json()
    if (!response.ok) {
      alert(result.message);
    } else {
      // Store jwt token in local storage
      const data = result.data;
      localStorage.setItem(JWT_TOKEN, data.token);
      redirectAfterLogin(data.token)
    }
  }

  const handleOnChange = (e) => {
    const codeValue = e.target.value;
    if (codeValue === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setCode(codeValue);
  }
  const handleOnChangePass = (e) => {
    const passValue = e.target.value;
    setPassword(passValue);
  }

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem(JWT_TOKEN);
    if (token) {
      // Check if token has expired
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token has expired, remove from local storage
        localStorage.removeItem(JWT_TOKEN);
        return;
      }
      // if decodedToken has visit key, redirect to '/home'
      redirectAfterLogin(token)
    }
  }, [])

  return (
    <section className='flex flex-col '>
      {/* <!-- Navbar --> */}
      <div className='flex flex-col items-center justify-center h-16 bg-slate-500 text-black relative shadow-sm font-mono dark:text-white' role='navigation'>
        <span>{APP_NAME_TITLE} App</span>
      </div>
      {/* <!-- Form --> */}
      <form onSubmit={handleSubmit} className='absolute inset-0 flex flex-col items-center justify-center dark:bg-gray-700'>
        <div className='p-4'>
          <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code:</label>
          <input
            type="text" id="code" className="input-text"
            autoComplete='off'
            onChange={handleOnChange}
            placeholder="123456" required />
        </div>
        {
          isAdmin &&
          <div className='p-4 mb-4'>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
            <input
              type="password" id="password" className="input-text"
              autoComplete='off'
              onChange={handleOnChangePass}
              placeholder="*********" required />
          </div>
        }
        <button className="btn-primary">Login</button>
      </form>
    </section>
  )
}

export default Login
