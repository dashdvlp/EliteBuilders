import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  email: string;
  githubUrl?: string;
  portfolioUrl?: string;
  cvUrl?: string;
}

interface UserContextType {
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = (email: string) => {
    setIsLoggedIn(true);
    setUser({ email });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...profile });
    }
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, user, login, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 