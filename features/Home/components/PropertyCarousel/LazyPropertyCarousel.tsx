import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import { Box, IconButton, HStack, Heading, Text, Button, Flex, Spinner, Center } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import PropertyCard from '@/features/common/modules/PropertyCard';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';

interface LazyPropertyCarouselProps {
  title: string;
  description?: string;
  fetchUrl: string;
  viewAllLink?: string;
  showViewAll?: boolean;
  autoplay?: boolean;
  initialLimit?: number;
  loadMoreLimit?: number;
}

const LazyPropertyCarousel: React.FC<LazyPropertyCarouselProps> = ({
  title,
  description,
  fetchUrl,
  viewAllLink = '/properties',
  showViewAll = true,
  autoplay = true,
  initialLimit = 6,
  loadMoreLimit = 6,
}) => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const hasLoadedRef = useRef(false);
  const isLoadingRef = useRef(false);
  const loadMoreCallbackRef = useRef<() => void>();

  // Initial load
  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    
    const loadInitialProperties = async () => {
      try {
        setLoading(true);
        const url = new URL(fetchUrl, window.location.origin);
        url.searchParams.set('limit', initialLimit.toString());
        url.searchParams.set('page', '1');
        
        const response = await fetch(url.toString());
        const data = await response.json();
        
        if (response.ok && data.properties) {
          const transformed = data.properties.map((property: any) => ({
            ...property,
            images: Array.isArray(property.images) ? property.images : [],
          }));
          setProperties(transformed);
          setTotal(data.total || 0);
          setHasMore((data.total || 0) > transformed.length);
        }
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialProperties();
  }, [fetchUrl, initialLimit]);

  // Load more properties
  const loadMoreProperties = useCallback(async () => {
    if (isLoadingRef.current || !hasMore || loadingMore) return;
    
    isLoadingRef.current = true;
    setLoadingMore(true);

    try {
      const nextPage = currentPage + 1;
      const url = new URL(fetchUrl, window.location.origin);
      url.searchParams.set('limit', loadMoreLimit.toString());
      url.searchParams.set('page', nextPage.toString());
      
      const response = await fetch(url.toString());
      const data = await response.json();
      
      if (response.ok && data.properties && data.properties.length > 0) {
        const transformed = data.properties.map((property: any) => ({
          ...property,
          images: Array.isArray(property.images) ? property.images : [],
        }));
        setProperties(prev => {
          const newProperties = [...prev, ...transformed];
          const newTotal = data.total || total;
          setTotal(newTotal);
          setHasMore(newProperties.length < newTotal);
          return newProperties;
        });
        setCurrentPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more properties:', error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
      isLoadingRef.current = false;
    }
  }, [fetchUrl, loadMoreLimit, currentPage, hasMore, loadingMore, total]);

  // Store the latest loadMoreProperties in a ref to avoid recreating observer
  useEffect(() => {
    loadMoreCallbackRef.current = loadMoreProperties;
  }, [loadMoreProperties]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!hasMore || properties.length === 0) return;

    const currentRef = loadMoreRef.current;
    if (!currentRef) return;

    let observer: IntersectionObserver | null = null;

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (!currentRef || !hasMore) return;

      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && hasMore && !loadingMore && !isLoadingRef.current) {
            // Use the ref to get the latest callback
            if (loadMoreCallbackRef.current) {
              loadMoreCallbackRef.current();
            }
          }
        },
        {
          rootMargin: '200px', // Start loading 200px before the element comes into view (reduced for mobile)
          threshold: 0.01,
        }
      );

      observer.observe(currentRef);
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore, loadingMore, properties.length]);

  if (loading && properties.length === 0) {
    return (
      <Box py={12} px={{ base: 4, md: 8 }}>
        <Box maxW="1400px" margin="0 auto">
          <Center py={12}>
            <Spinner size="xl" color="blue.500" />
          </Center>
        </Box>
      </Box>
    );
  }

  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <Box py={12} px={{ base: 4, md: 8 }}>
      <Box maxW="1400px" margin="0 auto">
        <Flex
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          mb={8}
          direction={{ base: 'column', md: 'row' }}
          gap={4}
        >
          <Box>
            <Heading
              size="xl"
              mb={2}
              fontWeight="bold"
              color="gray.800"
              fontFamily="'Playfair Display', serif"
            >
              {title}
            </Heading>
            {description && (
              <Text color="gray.600" fontSize="lg" maxW="600px" fontFamily="'Playfair Display', serif">
                {description}
              </Text>
            )}
          </Box>
          {showViewAll && (
            <HStack spacing={4}>
              <Link href={viewAllLink}>
                <Button variant="ghost" size="sm" colorScheme="blue" fontFamily="'Playfair Display', serif">
                  View all
                </Button>
              </Link>
              <HStack spacing={2}>
                <IconButton
                  aria-label="Previous"
                  icon={<ChevronLeftIcon />}
                  size="sm"
                  variant="outline"
                  borderRadius="full"
                  onClick={() => swiper?.slidePrev()}
                />
                <IconButton
                  aria-label="Next"
                  icon={<ChevronRightIcon />}
                  size="sm"
                  variant="outline"
                  borderRadius="full"
                  onClick={() => swiper?.slideNext()}
                />
              </HStack>
            </HStack>
          )}
        </Flex>

        <Box
          sx={{
            '.property-carousel-swiper': {
              width: '100%',
              '& .swiper-slide': {
                height: 'auto',
                display: 'flex',
              },
            },
          }}
        >
          <Swiper
            onSwiper={setSwiper}
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
            autoplay={
              autoplay && properties.length > 1
                ? {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            loop={false}
            navigation={false}
            className="property-carousel-swiper"
            watchSlidesProgress={true}
          >
            {properties.map((property, index) => {
              const propertyId = property.id || property.externalID || `property-${index}`;
              return (
                <SwiperSlide key={propertyId} style={{ height: 'auto' }}>
                  <PropertyCard {...property} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>

        {/* Lazy load trigger - Only show when there are properties and more to load */}
        {properties.length > 0 && hasMore && (
          <Box 
            ref={loadMoreRef} 
            h="50px" 
            mt={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {loadingMore && (
              <Spinner size="md" color="blue.500" thickness="3px" />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LazyPropertyCarousel;

