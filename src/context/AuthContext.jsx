import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        throw new Error("No token");
      }
      const response = await api.get('/auth/me');
      setUser(response.data);
      setRole(response.data.role);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      localStorage.removeItem('jwt_token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    const handleUnauthorized = () => {
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      localStorage.removeItem('jwt_token');
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [fetchUser]);

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('jwt_token', response.data.token);
      setUser(response.data.user);
      setRole(response.data.user.role);
      setIsAuthenticated(true);
      return response.data.user.role;
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('jwt_token');
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, isLoading, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
