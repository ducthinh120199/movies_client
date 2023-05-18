import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectError } from '../redux/authSlice';
import type { AppDispatch } from '../redux'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  let authError = useSelector(selectError);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payload = { email: email, password: password }
    dispatch(login(payload));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>{authError}</div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;