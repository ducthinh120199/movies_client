import { Middleware } from '@reduxjs/toolkit';
import { selectIsAuthenticated } from '../redux/authSlice';
import { logout } from '../services/auth';
import { RootState } from '../redux';

const authMiddleware: Middleware<{}, RootState> = ({ getState }) => (next) => (action) => {
  const isAuthenticated = selectIsAuthenticated(getState());
  
  if (!isAuthenticated && action.type !== 'auth/login/fulfilled' && action.type !== 'auth/login/pending') {
    // logout();
  }

  return next(action);
};

export default authMiddleware;