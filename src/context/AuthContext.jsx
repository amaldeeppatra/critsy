// context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (JWT in localStorage)
    const token = localStorage.getItem('jwt');
    
    if (token) {
      // In a real app, you'd validate the token with your backend
      try {
        // For now, we'll just set isAuthenticated to true if token exists
        setUser({ token });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token', error);
        logout();
      }
    }
    
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('jwt', token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const signup = async (userData) => {
    // In a real app, you'd make an API call to register the user
    // and receive a token
    const fakeToken = 'fake-jwt-token';
    login(userData, fakeToken);
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        loading, 
        login, 
        signup, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);