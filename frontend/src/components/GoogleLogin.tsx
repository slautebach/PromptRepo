import { Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

export function GoogleLogin() {
  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      colorScheme="blue"
      size="lg"
      width="100%"
      maxWidth="300px"
    >
      Sign in with Google
    </Button>
  );
} 