import { Routes, Route, Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/authSlice';
import { useSelector } from 'react-redux'
import Login from '../pages/login'
import Navigation from '../components/Navigation'

const AppRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <Navigation /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;