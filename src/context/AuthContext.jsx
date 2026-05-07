import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { getRole, getToken, logout as clearStoredAuth, setAuthSession } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(getRole());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = getToken();
      if (!token) {
        throw new Error('No token');
      }
      const response = await api.get('/auth/me');
      setUser(response.data);
      setRole(response.data.role);
      setAuthSession(token, response.data.role);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      clearStoredAuth();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const bootstrapTimer = window.setTimeout(() => {
      fetchUser();
    }, 0);

    const handleUnauthorized = () => {
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      clearStoredAuth();
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.clearTimeout(bootstrapTimer);
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [fetchUser]);

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      setAuthSession(response.data.token, response.data.user.role);
      if (import.meta.env.DEV) {
        console.info('Auth token received:', response.data.token);
      }
      setUser(response.data.user);
      setRole(response.data.user.role);
      setIsAuthenticated(true);
      return response.data.user.role;
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  };

  const signup = async (credentials) => {
    try {
      const response = await api.post('/auth/register', credentials);
      setAuthSession(response.data.token, response.data.user.role);
      if (import.meta.env.DEV) {
        console.info('Auth token received:', response.data.token);
      }
      setUser(response.data.user);
      setRole(response.data.user.role);
      setIsAuthenticated(true);
      return response.data.user.role;
    } catch (error) {
      console.error('Signup error', error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    clearStoredAuth();
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, isLoading, login, signup, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
