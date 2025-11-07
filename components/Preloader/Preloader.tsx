import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Image, keyframes } from '@chakra-ui/react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 500);
    }
  }, [progress, onComplete]);

  const fadeOut = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
  `;

  return (
    <>
      {isVisible && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={9999}
          bgGradient="linear(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          animation={!isVisible ? `${fadeOut} 0.5s ease-out forwards` : 'none'}
        >
          <Box
            position="relative"
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            {/* Animated Background Pattern */}
            <Box
              position="absolute"
              width="200%"
              height="200%"
              top="-50%"
              left="-50%"
              backgroundImage="radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)"
              backgroundSize="50px 50px"
              animation="float 20s ease-in-out infinite"
              sx={{
                '@keyframes float': {
                  '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
                  '50%': { transform: 'translate(-20px, -20px) rotate(180deg)' },
                },
              }}
            />

            {/* Logo Animation */}
            <Box
              mb={8}
              position="relative"
              sx={{
                animation: 'logoFadeIn 0.8s ease-out',
                '@keyframes logoFadeIn': {
                  '0%': { opacity: 0, transform: 'scale(0.8)' },
                  '100%': { opacity: 1, transform: 'scale(1)' },
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-20px',
                  left: '-20px',
                  right: '-20px',
                  bottom: '-20px',
                  borderRadius: '50%',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
                  animation: 'pulse 2s ease-in-out infinite',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '-40px',
                  left: '-40px',
                  right: '-40px',
                  bottom: '-40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  animation: 'pulse 2s ease-in-out infinite 0.5s',
                },
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
                  '50%': { opacity: 0.6, transform: 'scale(1.1)' },
                },
              }}
            >
              <Image
                src="/logo.png"
                alt="Sowparnika Properties"
                height="120px"
                width="auto"
                objectFit="contain"
                filter="drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))"
              />
            </Box>

            {/* Company Name */}
            <Text
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              fontWeight="bold"
              color="white"
              mb={12}
              fontFamily="'Playfair Display', serif"
              letterSpacing="0.1em"
              textAlign="center"
              textShadow="0 0 20px rgba(59, 130, 246, 0.5)"
              sx={{
                animation: 'textFadeIn 0.8s ease-out 0.3s both',
                '@keyframes textFadeIn': {
                  '0%': { opacity: 0, transform: 'translateY(20px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              SOWPARNIKA PROPERTIES
            </Text>

            {/* Progress Bar */}
            <Box width={{ base: '80%', md: '400px' }} mb={4}>
              <Box
                height="2px"
                bg="rgba(255, 255, 255, 0.1)"
                borderRadius="full"
                overflow="hidden"
                position="relative"
              >
                <Box
                  height="100%"
                  width={`${progress}%`}
                  bgGradient="linear(90deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%)"
                  borderRadius="full"
                  boxShadow="0 0 10px rgba(59, 130, 246, 0.8)"
                  transition="width 0.3s ease-out"
                />
                <Box
                  position="absolute"
                  top="50%"
                  left={`${progress}%`}
                  transform="translate(-50%, -50%)"
                  width="12px"
                  height="12px"
                  borderRadius="full"
                  bg="white"
                  boxShadow="0 0 15px rgba(59, 130, 246, 1)"
                  transition="left 0.3s ease-out"
                  sx={{
                    animation: 'glow 1.5s ease-in-out infinite',
                    '@keyframes glow': {
                      '0%, 100%': { boxShadow: '0 0 15px rgba(59, 130, 246, 1)' },
                      '50%': { boxShadow: '0 0 25px rgba(59, 130, 246, 1), 0 0 35px rgba(59, 130, 246, 0.8)' },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Progress Percentage */}
            <Text
              fontSize="sm"
              color="rgba(255, 255, 255, 0.7)"
              fontFamily="'Playfair Display', serif"
              letterSpacing="0.1em"
              sx={{
                animation: 'fadeIn 0.8s ease-out 0.5s both',
                '@keyframes fadeIn': {
                  '0%': { opacity: 0 },
                  '100%': { opacity: 1 },
                },
              }}
            >
              {Math.round(progress)}%
            </Text>

            {/* Loading Text */}
            <Text
              fontSize="xs"
              color="rgba(255, 255, 255, 0.5)"
              mt={8}
              fontFamily="'Playfair Display', serif"
              letterSpacing="0.2em"
              textTransform="uppercase"
              sx={{
                animation: 'fadeIn 0.8s ease-out 0.7s both',
                '@keyframes fadeIn': {
                  '0%': { opacity: 0 },
                  '100%': { opacity: 1 },
                },
              }}
            >
              Loading Excellence...
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Preloader;

