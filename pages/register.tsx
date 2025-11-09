import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  Link,
} from '@chakra-ui/react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import DefaultLayout from '@/features/Layout/DefaultLayout';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { register } = useAuth();
  const router = useRouter();

  // Get reCAPTCHA site key from environment variable
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate captcha
    if (!recaptchaValue) {
      setError('Please complete the reCAPTCHA verification.');
      return;
    }

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setRecaptchaValue(null);
      }
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setRecaptchaValue(null);
      }
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setRecaptchaValue(null);
      }
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setRecaptchaValue(null);
      }
      return;
    }

    setIsLoading(true);

    const result = await register(username, email, password);
    
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
      // Reset captcha on error
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setRecaptchaValue(null);
      }
    }
    
    setIsLoading(false);
  };

  return (
    <DefaultLayout 
      title="Register - Create Account | Sowparnika Properties"
      description="Create a free account with Sowparnika Properties to save favorite properties, get personalized recommendations, and access exclusive features."
      keywords="register, create account, property account, real estate registration"
      noindex={true}
    >
      <Box bg="white" minH="100vh" display="flex" alignItems="center" justifyContent="center" py={16}>
        <Container maxW="md">
          <Box
            p={12}
            borderWidth="2px"
            borderColor="gray.900"
            borderRadius="0"
            backgroundColor="white"
            sx={{
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                border: '1px solid',
                borderColor: 'gray.300',
                zIndex: -1,
              },
            }}
          >
            <VStack spacing={8} align="stretch">
              <Box textAlign="center">
                <Heading 
                  size="xl" 
                  color="gray.900"
                  fontFamily="'Playfair Display', serif"
                  fontWeight="700"
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                  mb={2}
                >
                  Register
                </Heading>
                <Text color="gray.900" fontSize="sm" letterSpacing="0.1em">
                  Create your account
                </Text>
              </Box>

              {error && (
                <Alert status="error" borderRadius="0" border="1px solid" borderColor="red.500">
                  <AlertIcon />
                  <Text color="gray.900">{error}</Text>
                </Alert>
              )}

              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <VStack spacing={6}>
                  <FormControl isRequired>
                    <FormLabel color="gray.900" fontWeight="600" fontSize="sm" letterSpacing="0.05em" textTransform="uppercase">
                      Username
                    </FormLabel>
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose a username"
                      bg="white"
                      borderColor="gray.300"
                      color="gray.900"
                      _placeholder={{ color: 'gray.400' }}
                      _focus={{
                        borderColor: 'gray.900',
                        boxShadow: '0 0 0 1px gray.900',
                      }}
                      borderRadius="0"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="gray.900" fontWeight="600" fontSize="sm" letterSpacing="0.05em" textTransform="uppercase">
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      bg="white"
                      borderColor="gray.300"
                      color="gray.900"
                      _placeholder={{ color: 'gray.400' }}
                      _focus={{
                        borderColor: 'gray.900',
                        boxShadow: '0 0 0 1px gray.900',
                      }}
                      borderRadius="0"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="gray.900" fontWeight="600" fontSize="sm" letterSpacing="0.05em" textTransform="uppercase">
                      Password
                    </FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password (min 6 characters)"
                      bg="white"
                      borderColor="gray.300"
                      color="gray.900"
                      _placeholder={{ color: 'gray.400' }}
                      _focus={{
                        borderColor: 'gray.900',
                        boxShadow: '0 0 0 1px gray.900',
                      }}
                      borderRadius="0"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="gray.900" fontWeight="600" fontSize="sm" letterSpacing="0.05em" textTransform="uppercase">
                      Confirm Password
                    </FormLabel>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      bg="white"
                      borderColor="gray.300"
                      color="gray.900"
                      _placeholder={{ color: 'gray.400' }}
                      _focus={{
                        borderColor: 'gray.900',
                        boxShadow: '0 0 0 1px gray.900',
                      }}
                      borderRadius="0"
                    />
                  </FormControl>

                  {/* reCAPTCHA */}
                  {recaptchaSiteKey && (
                    <Box display="flex" justifyContent="center" width="100%">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={recaptchaSiteKey}
                        onChange={(value) => setRecaptchaValue(value)}
                        onExpired={() => setRecaptchaValue(null)}
                        onError={() => setRecaptchaValue(null)}
                      />
                    </Box>
                  )}

                  <Button
                    type="submit"
                    width="full"
                    isLoading={isLoading}
                    loadingText="Registering..."
                    bg="gray.900"
                    color="white"
                    borderRadius="0"
                    fontWeight="600"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    _hover={{
                      bg: 'gray.800',
                    }}
                    py={6}
                    isDisabled={!recaptchaValue && !!recaptchaSiteKey}
                  >
                    Register
                  </Button>

                  <Box textAlign="center" pt={2}>
                    <Text color="gray.600" fontSize="sm">
                      Already have an account?{' '}
                      <Text
                        as="a"
                        href="/login"
                        color="gray.900"
                        fontWeight="600"
                        textDecoration="underline"
                        _hover={{ color: 'gray.700' }}
                      >
                        Login here
                      </Text>
                    </Text>
                  </Box>
                </VStack>
              </form>
            </VStack>
          </Box>
        </Container>
      </Box>
    </DefaultLayout>
  );
};

export default RegisterPage;

