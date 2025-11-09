import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { usePropertyFormat } from '@/features/common/Hooks/usePropertyFormat';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  HStack,
  Icon,
  Badge,
  Divider,
  VStack,
} from '@chakra-ui/react';
import { TbMapPin, TbEye, TbHeart } from 'react-icons/tb';
import { FiInfo, FiUser, FiPhone } from 'react-icons/fi';
import DefaultLayout from '@/features/Layout/DefaultLayout';
import PropertyImageGallery from '@/features/Property/components/PropertyImageGallery/PropertyImageGallery';
import PropertyBreadcrumbs from '@/features/Property/components/PropertyBreadcrumbs/PropertyBreadcrumbs';
import ContactAgent from '@/features/Property/components/ContactAgent/ContactAgent';
import { getProperty } from '@/features/Property/API/getProperty';
import { useAuth } from '@/contexts/AuthContext';

const PropertyDetail = ({
  property,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isAuthenticated } = useAuth();
  const {
    address,
    propertyType,
    price,
    title,
    rooms,
    baths,
    purpose,
    sqSize,
    externalID,
    photos,
    description,
    amenities,
  } = usePropertyFormat(property);

  const images = photos as string[];
  
  // Get property metadata
  const propertyCity = property.city || '';
  const propertyState = property.state || '';
  const lotSize = property.area_size ? `${property.area_size} ${property.area_unit || 'sq ft'}` : sqSize;
  const updatedDate = property.updated_at 
    ? new Date(property.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  
  // Get owner information
  const ownerName = property.owner_name || '';
  const ownerNumber = property.owner_number || '';

  return (
    <DefaultLayout title={title} description={description}>
      <Box bg="white" minH="100vh">
        <Box maxWidth="1400px" margin="0 auto" px={{ base: 4, md: 8 }} py={8}>
          {/* Breadcrumbs */}
          <PropertyBreadcrumbs city={propertyCity} state={propertyState} />

          {/* Main Content Grid */}
          {/* @ts-ignore - Chakra UI Grid type complexity */}
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
            {/* Left Column - Images and Details */}
            <GridItem>
              {/* Image Gallery */}
              <PropertyImageGallery photos={images} propertyId={property.id || externalID} />

              {/* Property Details */}
              <Box mt={6}>
                {/* Price */}
                <HStack spacing={2} mb={4} align="baseline">
                  <Text fontSize="3xl" fontWeight="700" fontFamily="'Playfair Display', serif">
                    ₹ {parseFloat(price.replace(/[^0-9.]/g, '') || '0').toLocaleString('en-IN')}
                  </Text>
                  <Icon as={FiInfo} color="gray.500" cursor="pointer" />
                </HStack>

                {/* Title */}
                <Text
                  fontSize="2xl"
                  fontWeight="600"
                  mb={4}
                  fontFamily="'Playfair Display', serif"
                  color="gray.800"
                >
                  {title}
                </Text>

                {/* Lot Size and Location */}
                <HStack spacing={4} mb={4} color="gray.600" fontSize="sm">
                  {lotSize && (
                    <Text>
                      <strong>{lotSize}</strong> lot
                    </Text>
                  )}
                  <HStack spacing={1}>
                    <Icon as={TbMapPin} />
                    <Text>
                      {propertyCity}{propertyState ? `, ${propertyState}` : ''}
                    </Text>
                  </HStack>
                </HStack>

                {/* Engagement Metrics */}
                <HStack spacing={6} mb={6} fontSize="sm" color="gray.600">
                  <Text>Updated: {updatedDate}</Text>
                  <HStack spacing={1}>
                    <Icon as={TbEye} />
                    <Text>1,722</Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Icon as={TbHeart} />
                    <Text>118</Text>
                  </HStack>
                </HStack>

                {/* Description */}
                <Box mt={8}>
                  <Text fontSize="lg" fontWeight="600" mb={3} fontFamily="'Playfair Display', serif">
                    Description
                  </Text>
                  {description ? (
                    <Box
                      color="gray.700"
                      lineHeight="1.8"
                      fontSize="md"
                      dangerouslySetInnerHTML={{ __html: description }}
                      sx={{
                        '& p': {
                          marginBottom: '1em',
                          '&:last-child': {
                            marginBottom: 0,
                          },
                        },
                        '& h1, & h2, & h3, & h4, & h5, & h6': {
                          fontWeight: 600,
                          marginTop: '1.5em',
                          marginBottom: '0.5em',
                          fontFamily: "'Playfair Display', serif",
                        },
                        '& ul, & ol': {
                          marginLeft: '1.5em',
                          marginBottom: '1em',
                        },
                        '& li': {
                          marginBottom: '0.5em',
                        },
                        '& a': {
                          color: 'blue.600',
                          textDecoration: 'underline',
                          '&:hover': {
                            color: 'blue.700',
                          },
                        },
                        '& strong, & b': {
                          fontWeight: 600,
                        },
                        '& em, & i': {
                          fontStyle: 'italic',
                        },
                      }}
                    />
                  ) : (
                    <Text color="gray.700" lineHeight="1.8" fontSize="md">
                      No description available.
                    </Text>
                  )}
                </Box>

                {/* Amenities */}
                {amenities && amenities.length > 0 && (
                  <Box mt={8}>
                    <Text fontSize="lg" fontWeight="600" mb={3} fontFamily="'Playfair Display', serif">
                      Amenities
                    </Text>
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
                      {amenities.map((item: string) => (
                        <HStack key={item} spacing={2}>
                          <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                          <Text color="gray.700">{item}</Text>
                        </HStack>
                      ))}
                    </SimpleGrid>
                  </Box>
                )}

                {/* Property Stats */}
                <Box mt={8} p={6} bg="gray.50" borderRadius="lg">
                  <SimpleGrid columns={{ base: 2, sm: rooms !== null && baths !== null ? 4 : 3 }} spacing={4}>
                    {rooms !== null && rooms !== undefined && (
                      <Box>
                        <Text fontSize="xs" color="gray.600" mb={1}>
                          Bedrooms
                        </Text>
                        <Text fontSize="xl" fontWeight="600">
                          {rooms}
                        </Text>
                      </Box>
                    )}
                    {baths !== null && baths !== undefined && (
                      <Box>
                        <Text fontSize="xs" color="gray.600" mb={1}>
                          Bathrooms
                        </Text>
                        <Text fontSize="xl" fontWeight="600">
                          {baths}
                        </Text>
                      </Box>
                    )}
                    <Box>
                      <Text fontSize="xs" color="gray.600" mb={1}>
                        Type
                      </Text>
                      <Text fontSize="xl" fontWeight="600">
                        {propertyType || 'N/A'}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="xs" color="gray.600" mb={1}>
                        Status
                      </Text>
                      <Badge colorScheme="green" fontSize="md" px={2} py={1}>
                        {purpose || 'Available'}
                      </Badge>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* Owner Details - Admin Only */}
                {isAuthenticated && (ownerName || ownerNumber) && (
                  <Box mt={8} p={6} border="2px solid" borderColor="gray.200" borderRadius="lg" bg="white">
                    <HStack spacing={3} mb={4}>
                      <Icon as={FiUser} boxSize={5} color="gray.700" />
                      <Text fontSize="lg" fontWeight="600" fontFamily="'Playfair Display', serif" color="gray.800">
                        Owner Details
                      </Text>
                      <Badge colorScheme="blue" fontSize="xs" ml={2}>
                        Admin Only
                      </Badge>
                    </HStack>
                    <Divider mb={4} />
                    <VStack align="stretch" spacing={3}>
                      {ownerName && (
                        <HStack spacing={3}>
                          <Icon as={FiUser} color="gray.600" />
                          <Box>
                            <Text fontSize="xs" color="gray.600" mb={0.5}>
                              Owner Name
                            </Text>
                            <Text fontSize="md" fontWeight="500" color="gray.900">
                              {ownerName}
                            </Text>
                          </Box>
                        </HStack>
                      )}
                      {ownerNumber && (
                        <HStack spacing={3}>
                          <Icon as={FiPhone} color="gray.600" />
                          <Box>
                            <Text fontSize="xs" color="gray.600" mb={0.5}>
                              Contact Number
                            </Text>
                            <Text fontSize="md" fontWeight="500" color="gray.900">
                              {ownerNumber}
                            </Text>
                          </Box>
                        </HStack>
                      )}
                    </VStack>
                  </Box>
                )}
              </Box>
            </GridItem>

            {/* Right Column - Contact Agent */}
            <GridItem>
              <Box position={{ base: 'static', lg: 'sticky' }} top={8}>
                <ContactAgent propertyTitle={title} />
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default PropertyDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  
  try {
    const property = await getProperty(id!);
    return {
      props: { property },
    };
  } catch (error) {
    console.error('Error fetching property:', error);
    return {
      notFound: true,
    };
  }
};
