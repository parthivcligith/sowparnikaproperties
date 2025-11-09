import React from 'react';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface PropertyBreadcrumbsProps {
  city?: string;
  state?: string;
}

const PropertyBreadcrumbs: React.FC<PropertyBreadcrumbsProps> = ({ city, state }) => {

  return (
    <Box mb={6}>
      <Breadcrumb
        separator={<ChevronRightIcon color="gray.500" />}
        fontSize="sm"
        color="gray.600"
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/">
            ← Back to Home Page
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/properties">
            ← Back to search
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/properties">
            Real Estate
          </BreadcrumbLink>
        </BreadcrumbItem>
        {state && (
          <BreadcrumbItem>
            <Text>{state}</Text>
          </BreadcrumbItem>
        )}
        {city && (
          <BreadcrumbItem isCurrentPage>
            <Text>{city}</Text>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
    </Box>
  );
};

export default PropertyBreadcrumbs;

