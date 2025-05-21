import { Box, Container, Heading, VStack, Text, Button } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useRouter } from 'next/router';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <Container maxW="container.lg" py={10}>
        <VStack spacing={8} align="stretch">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Heading>Dashboard</Heading>
            <Button colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
          
          <Box p={6} borderWidth={1} borderRadius={8} boxShadow="lg">
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Welcome, {user?.name || user?.email}!</Heading>
              <Text>You are now logged in to Prompt Repo.</Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </ProtectedRoute>
  );
} 