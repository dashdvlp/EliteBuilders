import React, { createContext, useContext, useState, ReactNode } from 'react';
import { api } from '../api/client';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  provider?: 'google' | 'github';
  githubUsername?: string;
  portfolioUrl?: string;
  cvUrl?: string;
}

interface ProfileData {
  githubUsername?: string;
  portfolioUrl?: string;
  cv?: File;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, profileData?: ProfileData) => Promise<void>;
  loginWithOAuth: (provider: 'google' | 'github', code: string) => Promise<void>;
  updateProfile: (data: ProfileData) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, profileData?: ProfileData) => {
    try {
      setIsLoading(true);
      const response = await api.login(email);
      
      if (profileData) {
        await updateProfile(profileData);
      }
      
      setUser(response.data.user);
      localStorage.setItem('auth_token', response.data.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithOAuth = async (provider: 'google' | 'github', code: string) => {
    try {
      setIsLoading(true);
      const response = await api.loginWithOAuth(provider, code);
      setUser(response.data.user);
      localStorage.setItem('auth_token', response.data.token);
    } catch (error) {
      console.error('OAuth login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: ProfileData) => {
    try {
      setIsLoading(true);
      
      // Create FormData if there's a CV file
      if (data.cv) {
        const formData = new FormData();
        formData.append('cv', data.cv);
        if (data.githubUsername) formData.append('githubUsername', data.githubUsername);
        if (data.portfolioUrl) formData.append('portfolioUrl', data.portfolioUrl);
        
        const response = await api.updateUserProfile(user!.id, formData);
        setUser(response.data);
      } else {
        const response = await api.updateUserProfile(user!.id, data);
        setUser(response.data);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    api.logout().catch(console.error);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, loginWithOAuth, updateProfile, logout }}>
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