import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

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
      const response = await api.get('/auth/me');
      setUser(response.data.user);
      setRole(response.data.user.role);
      setIsAuthenticated(true);
    } catch (error) {
      const mockedSession = localStorage.getItem('mock_session');
      if (mockedSession) {
        const parsed = JSON.parse(mockedSession);
        setUser(parsed.user);
        setRole(parsed.role);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setRole(null);
        setIsAuthenticated(false);
      }
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
      localStorage.removeItem('mock_session');
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [fetchUser]);

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      setUser(response.data.user);
      setRole(response.data.user.role);
      setIsAuthenticated(true);
      return response.data.user.role;
    } catch (error) {
      console.warn("Backend register failed. Falling back to Mock DB for development.");
      const mockDb = JSON.parse(localStorage.getItem('mock_db') || '[]');
      
      if (mockDb.find(u => u.email === userData.email)) {
        throw new Error('User already exists');
      }

      const mockUser = { 
        uid: `mock-${Date.now()}`, 
        email: userData.email, 
        displayName: userData.email.split('@')[0],
        role: userData.role 
      };
      
      mockDb.push({ ...mockUser, password: userData.password });
      localStorage.setItem('mock_db', JSON.stringify(mockDb));

      setUser(mockUser);
      setRole(mockUser.role);
      setIsAuthenticated(true);
      localStorage.setItem('mock_session', JSON.stringify({ user: mockUser, role: mockUser.role }));
      
      return mockUser.role;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      setUser(response.data.user);
      setRole(response.data.user.role);
      setIsAuthenticated(true);
      return response.data.user.role;
    } catch (error) {
      console.warn("Backend login failed. Falling back to Mock DB for development.");
      const mockDb = JSON.parse(localStorage.getItem('mock_db') || '[]');
      const foundUser = mockDb.find(u => u.email === credentials.email && u.password === credentials.password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      const { password, ...mockUser } = foundUser;
      
      setUser(mockUser);
      setRole(mockUser.role);
      setIsAuthenticated(true);
      localStorage.setItem('mock_session', JSON.stringify({ user: mockUser, role: mockUser.role }));
      
      return mockUser.role;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout error', err);
    } finally {
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      localStorage.removeItem('mock_session');
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.warn("Backend profile update failed. Falling back to Mock DB for development.");
      const mockDb = JSON.parse(localStorage.getItem('mock_db') || '[]');
      const userIndex = mockDb.findIndex(u => u.uid === user.uid);
      
      if (userIndex === -1) throw new Error('User not found');
      
      const updatedUser = { ...mockDb[userIndex], ...profileData };
      mockDb[userIndex] = updatedUser;
      localStorage.setItem('mock_db', JSON.stringify(mockDb));
      
      const { password, ...sessionUser } = updatedUser;
      setUser(sessionUser);
      localStorage.setItem('mock_session', JSON.stringify({ user: sessionUser, role: sessionUser.role }));
      
      return sessionUser;
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, isLoading, login, register, logout, updateProfile, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
