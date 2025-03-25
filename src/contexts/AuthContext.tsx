
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: 'user' | 'host' | 'admin';
};

export type AuthSession = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
};

type AuthContextType = {
  session: AuthSession | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  verifyPhone: (phone: string, code: string) => Promise<boolean>;
  sendVerificationCode: (phone: string) => Promise<boolean>;
  linkSocialAccount: (provider: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  enableTwoFactor: () => Promise<boolean>;
  disableTwoFactor: () => Promise<boolean>;
  verifyTwoFactor: (code: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API endpoints - these would connect to your backend
const API = {
  login: async (email: string, password: string): Promise<AuthSession> => {
    // In a real app, you would make an API call to your backend
    // For demo purposes, we'll simulate a successful login
    console.log('Login attempt with:', email);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'demo@example.com' && password === 'password') {
      const user: User = {
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        avatar: 'https://i.pravatar.cc/150?u=demo',
        emailVerified: true,
        phoneVerified: false,
        role: 'user',
      };
      
      return {
        user,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  register: async (email: string, password: string, name: string): Promise<AuthSession> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Register attempt with:', email, name);
    
    const user: User = {
      id: '2',
      email,
      name,
      emailVerified: false,
      phoneVerified: false,
      role: 'user',
    };
    
    return {
      user,
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
      expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
    };
  },
  
  logout: async (): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('User logged out');
  },
  
  resetPassword: async (email: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password reset email sent to:', email);
    return true;
  },
  
  confirmResetPassword: async (token: string, newPassword: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password reset with token:', token);
    return true;
  },
  
  verifyEmail: async (token: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Email verified with token:', token);
    return true;
  },
  
  verifyPhone: async (phone: string, code: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Phone verified:', phone, 'with code:', code);
    return true;
  },
  
  sendVerificationCode: async (phone: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Verification code sent to:', phone);
    return true;
  },
  
  linkSocial: async (provider: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Social account linked:', provider);
    return true;
  },
  
  updateUserProfile: async (data: Partial<User>): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Profile updated:', data);
    return true;
  },
  
  enableTwoFactor: async (): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Two-factor authentication enabled');
    return true;
  },
  
  disableTwoFactor: async (): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Two-factor authentication disabled');
    return true;
  },
  
  verifyTwoFactor: async (code: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Two-factor code verified:', code);
    return true;
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for existing session (JWT) in localStorage
    const storedSession = localStorage.getItem('auth_session');
    
    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession) as AuthSession;
        
        // Check if the token is expired
        if (parsedSession.expiresAt && parsedSession.expiresAt > Date.now()) {
          setSession(parsedSession);
        } else {
          // Token expired, clear it
          localStorage.removeItem('auth_session');
        }
      } catch (error) {
        console.error('Failed to parse stored session:', error);
        localStorage.removeItem('auth_session');
      }
    }
    
    setLoading(false);
  }, []);

  const persistSession = (newSession: AuthSession | null) => {
    if (newSession) {
      localStorage.setItem('auth_session', JSON.stringify(newSession));
    } else {
      localStorage.removeItem('auth_session');
    }
    setSession(newSession);
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const newSession = await API.login(email, password);
      persistSession(newSession);
      toast({
        title: "Successfully signed in",
        description: `Welcome back, ${newSession.user?.name}!`,
      });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Invalid email or password",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setLoading(true);
      const newSession = await API.register(email, password, name);
      persistSession(newSession);
      toast({
        title: "Account created",
        description: "Please verify your email address to complete registration",
      });
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Could not create your account. Please try again later.",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      await API.logout();
      persistSession(null);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: "There was a problem signing you out",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      await API.resetPassword(email);
      toast({
        title: "Reset email sent",
        description: "Check your email for the reset link",
      });
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: "Could not send reset email",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    try {
      setLoading(true);
      await API.confirmResetPassword(token, newPassword);
      toast({
        title: "Password updated",
        description: "Your password has been successfully reset",
      });
      return true;
    } catch (error) {
      console.error('Password confirm reset error:', error);
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: "Could not reset your password",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      setLoading(true);
      await API.verifyEmail(token);
      
      // Update the session to reflect email verification
      if (session && session.user) {
        const updatedSession = {
          ...session,
          user: {
            ...session.user,
            emailVerified: true,
          },
        };
        persistSession(updatedSession);
      }
      
      toast({
        title: "Email verified",
        description: "Your email has been successfully verified",
      });
      return true;
    } catch (error) {
      console.error('Email verification error:', error);
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "Could not verify your email",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyPhone = async (phone: string, code: string): Promise<boolean> => {
    try {
      setLoading(true);
      await API.verifyPhone(phone, code);
      
      // Update the session to reflect phone verification
      if (session && session.user) {
        const updatedSession = {
          ...session,
          user: {
            ...session.user,
            phoneVerified: true,
          },
        };
        persistSession(updatedSession);
      }
      
      toast({
        title: "Phone verified",
        description: "Your phone number has been successfully verified",
      });
      return true;
    } catch (error) {
      console.error('Phone verification error:', error);
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "Could not verify your phone",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationCode = async (phone: string): Promise<boolean> => {
    try {
      setLoading(true);
      await API.sendVerificationCode(phone);
      toast({
        title: "Verification code sent",
        description: "Check your phone for the verification code",
      });
      return true;
    } catch (error) {
      console.error('Send verification code error:', error);
      toast({
        variant: "destructive",
        title: "Sending failed",
        description: "Could not send verification code",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const linkSocialAccount = async (provider: string): Promise<boolean> => {
    try {
      setLoading(true);
      await API.linkSocial(provider);
      toast({
        title: "Account linked",
        description: `Your ${provider} account has been linked`,
      });
      return true;
    } catch (error) {
      console.error('Social linking error:', error);
      toast({
        variant: "destructive",
        title: "Linking failed",
        description: "Could not link your social account",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      setLoading(true);
      await API.updateUserProfile(data);
      
      // Update the session with new user data
      if (session && session.user) {
        const updatedSession = {
          ...session,
          user: {
            ...session.user,
            ...data,
          },
        };
        persistSession(updatedSession);
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated",
      });
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Could not update your profile",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const enableTwoFactor = async (): Promise<boolean> => {
    try {
      setLoading(true);
      await API.enableTwoFactor();
      toast({
        title: "Two-factor enabled",
        description: "Two-factor authentication has been enabled for your account",
      });
      return true;
    } catch (error) {
      console.error('Two-factor enable error:', error);
      toast({
        variant: "destructive",
        title: "Enable failed",
        description: "Could not enable two-factor authentication",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const disableTwoFactor = async (): Promise<boolean> => {
    try {
      setLoading(true);
      await API.disableTwoFactor();
      toast({
        title: "Two-factor disabled",
        description: "Two-factor authentication has been disabled for your account",
      });
      return true;
    } catch (error) {
      console.error('Two-factor disable error:', error);
      toast({
        variant: "destructive",
        title: "Disable failed",
        description: "Could not disable two-factor authentication",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    try {
      setLoading(true);
      await API.verifyTwoFactor(code);
      toast({
        title: "Two-factor verified",
        description: "Two-factor code verified successfully",
      });
      return true;
    } catch (error) {
      console.error('Two-factor verify error:', error);
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "Invalid two-factor code",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        isAuthenticated: !!session?.user,
        signIn,
        signUp,
        signOut,
        sendPasswordResetEmail,
        resetPassword,
        verifyEmail,
        verifyPhone,
        sendVerificationCode,
        linkSocialAccount,
        updateProfile,
        enableTwoFactor,
        disableTwoFactor,
        verifyTwoFactor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
