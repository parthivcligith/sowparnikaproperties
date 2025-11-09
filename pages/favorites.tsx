import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Button,
  useToast,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { FiHeart, FiHome, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import DefaultLayout from '@/features/Layout/DefaultLayout';
import PropertyCard from '@/features/common/modules/PropertyCard';

interface Property {
  id: string;
  title: string;
  property_type: string;
  price: number;
  images: string[];
  [key: string]: any;
}

const FavoritesPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();
  const toast = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?returnUrl=/favorites');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated && favorites.length > 0) {
      fetchFavoriteProperties();
    } else if (isAuthenticated && favorites.length === 0) {
      setProperties([]);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites, isAuthenticated]);

  const fetchFavoriteProperties = async () => {
    try {
      setLoading(true);
      // Fetch all properties and filter by favorites
      const response = await fetch(`/api/get-properties?status=active&limit=1000`);
      const data = await response.json();

      if (response.ok && data.properties) {
        // Filter properties to only include favorites
        const favoriteProperties = data.properties.filter((property: Property) =>
          favorites.includes(property.id)
        );
        setProperties(favoriteProperties);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch favorite properties',
          status: 'error',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error fetching favorite properties:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch favorite properties',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DefaultLayout title="Loading..." description="Loading">
        <Box p={8} textAlign="center">Loading...</Box>
      </DefaultLayout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DefaultLayout 
      title="My Favorites - Saved Properties | Sowparnika Properties"
      description="View your saved favorite properties. Access your personalized property list and continue your search for the perfect home in Kakkanad, Kochi."
      keywords="favorite properties, saved properties, property wishlist, real estate favorites"
      noindex={true}
    >
      <Box bg="white" minH="100vh" py={12} pb={{ base: 24, md: 12 }}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
              <Box>
                <Heading
                  size="xl"
                  mb={3}
                  color="gray.900"
                  fontFamily="'Playfair Display', serif"
                  fontWeight="700"
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                >
                  My Favorites
                </Heading>
                <Text color="gray.600" fontSize="sm" letterSpacing="0.1em">
                  {properties.length} {properties.length === 1 ? 'property' : 'properties'} saved
                </Text>
              </Box>
              <Flex gap={3} flexWrap="wrap">
                <Link href="/">
                  <Button
                    leftIcon={<FiHome />}
                    variant="outline"
                    borderColor="gray.900"
                    color="gray.900"
                    borderRadius="0"
                    _hover={{
                      bg: 'gray.900',
                      color: 'white',
                    }}
                    fontFamily="'Playfair Display', serif"
                    fontWeight="600"
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                  >
                    Go to Home
                  </Button>
                </Link>
                <Link href="/properties">
                  <Button
                    leftIcon={<FiArrowLeft />}
                    variant="outline"
                    borderColor="gray.900"
                    color="gray.900"
                    borderRadius="0"
                    _hover={{
                      bg: 'gray.900',
                      color: 'white',
                    }}
                    fontFamily="'Playfair Display', serif"
                    fontWeight="600"
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                  >
                    Browse Properties
                  </Button>
                </Link>
              </Flex>
            </Flex>

            {/* Properties Grid */}
            {loading ? (
              <Box p={8} textAlign="center">
                <Text color="gray.900">Loading favorite properties...</Text>
              </Box>
            ) : properties.length === 0 ? (
              <Box
                p={12}
                textAlign="center"
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="lg"
                bg="gray.50"
              >
                <IconButton
                  aria-label="Empty favorites"
                  icon={<FiHeart />}
                  size="xl"
                  variant="ghost"
                  color="gray.400"
                  mb={4}
                  isRound
                />
                <Heading
                  as="h3"
                  size="lg"
                  mb={2}
                  color="gray.900"
                  fontFamily="'Playfair Display', serif"
                >
                  No Favorites Yet
                </Heading>
                <Text color="gray.600" mb={6}>
                  Start exploring properties and add them to your favorites to see them here.
                </Text>
                <Link href="/properties">
                  <Button
                    bg="gray.900"
                    color="white"
                    borderRadius="0"
                    fontWeight="600"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    _hover={{
                      bg: 'gray.800',
                    }}
                  >
                    Browse Properties
                  </Button>
                </Link>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
                {properties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </SimpleGrid>
            )}
          </VStack>
        </Container>
      </Box>
    </DefaultLayout>
  );
};

export default FavoritesPage;

