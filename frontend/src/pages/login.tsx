import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import { GoogleLogin } from '../components/GoogleLogin';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading>Welcome to Prompt Repo</Heading>
        <Box
          p={8}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          width="100%"
          textAlign="center"
        >
          <VStack spacing={4}>
            <Heading size="md">Sign in with your Google account</Heading>
            <GoogleLogin />
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
} 