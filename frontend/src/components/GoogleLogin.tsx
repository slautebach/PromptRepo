import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function GoogleLogin() {
  const { login } = useAuth();
  const toast = useToast();

  React.useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleButton')!,
        { theme: 'outline', size: 'large' }
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = async (response: any) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
      console.log('Environment variables:', {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      });
      console.log('Sending request to:', apiUrl);
      console.log('Request payload:', { token: response.credential });
      
      try {
        const result = await axios.post(apiUrl, {
          token: response.credential,
        });
        console.log('Response:', result.data);
        await login(result.data.token);
        toast({
          title: 'Login successful',
          status: 'success',
          duration: 3000,
        });
      } catch (error: any) {
        console.error('Detailed error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers
          }
        });
        throw error;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <div id="googleButton" style={{ width: '100%', maxWidth: '300px' }} />
  );
} 