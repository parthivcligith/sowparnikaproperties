import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import HeroSection from '@/features/Home/components/HeroSection/HeroSection';
import Marquee from '@/features/Home/components/Marquee/Marquee';
import DefaultLayout from '@/features/Layout/DefaultLayout';
import FeatureHighlights from '@/features/Home/components/FeatureHighlights/FeatureHighlights';
import WeeklyHighlight from '@/features/Home/components/WeeklyHighlight/WeeklyHighlight';
import PopularSearches from '@/features/Home/components/PopularSearches/PopularSearches';

// Lazy load heavy components
const PropertyCarousel = dynamic(() => import('@/features/Home/components/PropertyCarousel/PropertyCarousel'), {
  loading: () => <Box p={8} textAlign="center">Loading properties...</Box>,
  ssr: false,
});

const Partners = dynamic(() => import('@/features/Home/components/Partners'), {
  ssr: false,
});

const Testimonials = dynamic(() => import('@/features/Home/components/Testimonials'), {
  ssr: false,
});

export default function Home() {
  const [trendingProperties, setTrendingProperties] = useState<any[]>([]);
  const [newProperties, setNewProperties] = useState<any[]>([]);
  const [popularProperties, setPopularProperties] = useState<any[]>([]);
  const [featuredProperty, setFeaturedProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      // Fetch featured properties (featured=true, status=active)
      const featuredResponse = await fetch('/api/get-properties?status=active&featured=true&limit=10&sortBy=created_at&sortOrder=desc');
      const featuredData = await featuredResponse.json();

      // Fetch new properties (recently added)
      const newResponse = await fetch('/api/get-properties?status=active&limit=10&sortBy=created_at&sortOrder=desc');
      const newData = await newResponse.json();

      // Fetch popular properties (could be by views or random for now)
      const popularResponse = await fetch('/api/get-properties?status=active&limit=10');
      const popularData = await popularResponse.json();

      if (featuredResponse.ok && featuredData.properties) {
        const transformed = featuredData.properties.map((property: any) => ({
          ...property,
          images: Array.isArray(property.images) ? property.images : [],
        }));
        setTrendingProperties(transformed);
      }

      if (newResponse.ok && newData.properties) {
        const transformed = newData.properties.map((property: any) => ({
          ...property,
          images: Array.isArray(property.images) ? property.images : [],
        }));
        setNewProperties(transformed);
      }

      if (popularResponse.ok && popularData.properties) {
        const transformed = popularData.properties.map((property: any) => ({
          ...property,
          images: Array.isArray(property.images) ? property.images : [],
        }));
        setPopularProperties(transformed);
      }

      // Set featured property for weekly highlight (use first featured property)
      if (featuredResponse.ok && featuredData.properties && featuredData.properties.length > 0) {
        setFeaturedProperty(featuredData.properties[0]);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sowparnikaproperties.com';
  
  // Structured Data for Homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Sowparnika Properties',
    description: 'Your trusted gateway to real estate in Kakkanad, Kochi. Find verified properties, expert consultation, and full-service support for buying, renting, or investing in quality real estate.',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/logo.png`,
    telephone: '+91 9446211417',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kakkanad',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
      postalCode: '682030'
    },
    areaServed: {
      '@type': 'City',
      name: 'Kakkanad, Kochi'
    },
    priceRange: '$$',
    sameAs: [
      // Add social media links here if available
    ]
  };

  return (
    <DefaultLayout
      title="Sowparnika Properties - Premium Real Estate in Kakkanad, Kochi | Buy, Rent, Invest"
      description="Sowparnika Properties - Your trusted gateway to real estate in Kakkanad, Kochi. Find verified properties, expert consultation, and full-service support for buying, renting, or investing in quality real estate. Browse houses, villas, flats, plots, and commercial buildings."
      keywords="real estate Kakkanad, properties Kochi, houses for sale Kakkanad, villas Kochi, flats Kakkanad, plots for sale, land Kakkanad, commercial buildings Kochi, property dealers Kakkanad, real estate agents Kochi, Sowparnika Properties"
      image="/logo.png"
      structuredData={structuredData}
    >
      <Box>
        <HeroSection />
        
        {/* Marquee */}
        <Marquee
          items={[
            'Luxury Properties',
            'Prime Locations',
            'Exclusive Listings',
            'World-Class Amenities',
            'Premium Real Estate',
            'Elite Properties',
            'Signature Homes',
            'Luxury Living',
            'Premium Investment',
            'Exclusive Estates',
            'Luxury Villas',
            'Prime Real Estate',
          ]}
          speed={40}
          direction="left"
        />

        {/* Feature Highlights */}
        <FeatureHighlights />
        
        {/* Featured Properties */}
        {!loading && trendingProperties.length > 0 && (
          <Box 
            bg="white"
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              bg: 'linear-gradient(to right, transparent, luxury.200, transparent)',
            }}
          >
            <PropertyCarousel
              title="Featured Properties"
              description="Discover the homes that are capturing attention in the market. This curated selection showcases the most sought-after properties available right now."
              properties={trendingProperties}
              viewAllLink="/properties?featured=true&sortBy=created_at&sortOrder=desc"
            />
          </Box>
        )}

        {/* Divider */}
        {trendingProperties.length > 0 && newProperties.length > 0 && (
          <Box 
            h="1px" 
            bg="linear-gradient(to right, transparent, luxury.200, luxury.300, luxury.200, transparent)"
          />
        )}

        {/* New To The Market */}
        {!loading && newProperties.length > 0 && (
          <Box 
            bg="linear-gradient(to bottom, #fafafa 0%, #f5f5f5 100%)"
            position="relative"
          >
            <PropertyCarousel
              title="New To The Market"
              properties={newProperties}
              viewAllLink="/properties?sortBy=created_at&sortOrder=desc"
            />
          </Box>
        )}

        {/* Homes You'll Love */}
        {!loading && popularProperties.length > 0 && (
          <Box 
            bg="white"
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              bg: 'linear-gradient(to right, transparent, luxury.200, transparent)',
            }}
          >
            <PropertyCarousel
              title="Homes You'll Love"
              properties={popularProperties}
              viewAllLink="/properties"
            />
          </Box>
        )}

        {/* Weekly Highlight */}
        {!loading && featuredProperty && (
          <WeeklyHighlight property={featuredProperty} />
        )}

        {/* Popular Searches */}
        <PopularSearches />

        {/* Partners */}
        <Partners />
        
        {/* Testimonials */}
        <Testimonials />
      </Box>
    </DefaultLayout>
  );
}
