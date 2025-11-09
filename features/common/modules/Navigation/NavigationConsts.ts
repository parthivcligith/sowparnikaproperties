import { HiCube, HiNewspaper, HiPhoneArrowUpRight, HiHome } from 'react-icons/hi2';
import { IconType } from 'react-icons/lib';

export type navigationLink = {
  title: string;
  link: string;
  icon: IconType;
};

export type propertyTypeLink = {
  title: string;
  link: string;
};

export const navigationLinks: Array<navigationLink> = [
  { title: 'Home', link: '/', icon: HiHome },
  { title: 'Properties', link: '/properties', icon: HiCube },
  { title: 'Contact', link: '/contact', icon: HiNewspaper },
  {
    title: '+91 9446211417',
    link: 'tel:+919446211417',
    icon: HiPhoneArrowUpRight,
  },
];

// Property types in a single horizontal row
// Note: Links use lowercase values that are mapped to database values in the API
export const propertyTypes: Array<propertyTypeLink> = [
  { title: 'Plot', link: '/properties?propertyType=Plot' },
  { title: 'House', link: '/properties?propertyType=House' },
  { title: 'Villas', link: '/properties?propertyType=Villa' },
  { title: 'Flats', link: '/properties?propertyType=Flat' },
  { title: 'Warehouses', link: '/properties?propertyType=Warehouse' },
  { title: 'Commercial Buildings', link: '/properties?propertyType=Commercial Building' },
  { title: 'Commercial Lands', link: '/properties?propertyType=Commercial Land' },
];
