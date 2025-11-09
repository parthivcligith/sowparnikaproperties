# Sowparnika Properties - Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Features](#features)
4. [Architecture](#architecture)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Key Components](#key-components)
8. [Authentication & Authorization](#authentication--authorization)
9. [Deployment](#deployment)

---

## 🎯 Project Overview

**Sowparnika Properties** is a modern, full-featured real estate platform built with Next.js and TypeScript. It provides a comprehensive solution for property listings, search, filtering, user management, and admin controls.

---

## 🛠 Technology Stack

### **Frontend Framework & Core**
- **Next.js 13+** - React framework with SSR/SSG capabilities
- **React 18+** - UI library
- **TypeScript** - Type-safe JavaScript
- **Chakra UI** - Component library and design system

### **Styling & UI**
- **Chakra UI** - Primary component library
- **CSS-in-JS** - Styled components via Chakra UI
- **Custom Theme** - Extended Chakra theme with luxury color palettes
- **Responsive Design** - Mobile-first approach

### **State Management**
- **React Context API** - Global state management
  - `AuthContext` - User authentication state
  - `FavoritesContext` - User favorites management
- **React Hooks** - `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`, `useLayoutEffect`

### **Backend & Database**
- **Supabase** - Backend-as-a-Service (PostgreSQL database)
- **Next.js API Routes** - Serverless API endpoints
- **PostgreSQL** - Relational database

### **Routing & Navigation**
- **Next.js Router** - Client-side routing
- **URL Query Parameters** - Filter and search state management

### **Form Handling & Validation**
- **React Hook Form** (implicit via Chakra UI)
- **Client-side Validation**
- **Google reCAPTCHA v2** - Bot prevention

### **File Upload & Media**
- **react-dropzone** - Image upload handling
- **Supabase Storage** - Image storage (if configured)

### **Rich Text Editing**
- **react-quill** - WYSIWYG editor for property descriptions

### **Image Carousels & Sliders**
- **Swiper.js** - Touch-enabled carousels
- **Property Image Galleries**
- **Hero Section Background Slider**

### **Icons**
- **react-icons/fi** - Feather Icons
- **react-icons/tb** - Tabler Icons
- **react-icons/hi2** - Heroicons v2
- **react-icons/fa** - Font Awesome

### **Utilities**
- **js-cookie** - Cookie management
- **crypto** (Node.js) - Password hashing (SHA-256)
- **URLSearchParams** - URL query string handling
- **localStorage** - Client-side favorites storage

### **Development Tools**
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Next.js Dev Server** - Development environment

### **Performance & Optimization**
- **Next.js Image Optimization** - Automatic image optimization
- **Dynamic Imports** - Code splitting for heavy components
- **Debouncing** - Search query optimization
- **Memoization** - Performance optimization with `useMemo` and `useCallback`

---

## ✨ Features

### **1. Property Listings**
- ✅ Property search with real-time filtering
- ✅ Advanced filters:
  - Property type (House, Villa, Flat, Plot, Land, Commercial Building, Warehouse, etc.)
  - Price range (min/max)
  - BHK (bedrooms)
  - City
  - Selling type (Sale/Rent)
  - Status (Active, Pending, Sold, Rented)
  - Featured properties
- ✅ Sorting options:
  - By creation date (newest/oldest)
  - By price (low to high/high to low)
  - By area size
  - By title (A-Z/Z-A)
- ✅ Pagination (9 properties per page)
- ✅ Property cards with:
  - Image carousel
  - Price display
  - Location
  - BHK, Bathrooms, Area
  - Featured badge
  - Favorite button
  - Share button (admin only)

### **2. Property Details**
- ✅ Full property information page
- ✅ Image gallery with navigation
- ✅ Property description (HTML content)
- ✅ Amenities list
- ✅ Property statistics (BHK, Bathrooms, Area)
- ✅ Location details
- ✅ Owner information (admin only)
- ✅ Contact agent form
- ✅ Favorite button
- ✅ Share button (admin only)
- ✅ Breadcrumb navigation with "Back to Home" link

### **3. Search & Discovery**
- ✅ Global search bar in navigation
- ✅ Hero section search with:
  - BHK selection buttons (desktop)
  - Price range selector (dual-handle slider)
  - Property type dropdown
  - Location search
- ✅ Popular categories section:
  - Home
  - Plot/Land (shows both Plot and Land)
  - Villas
  - Flats
  - Commercial Buildings
- ✅ Featured properties section
- ✅ "New to Market" section
- ✅ "Homes You'll Love" section
- ✅ Weekly highlight property

### **4. User Authentication**
- ✅ User registration with:
  - Username
  - Email
  - Password
  - Google reCAPTCHA v2
- ✅ User login (common for users and admins)
- ✅ Admin login (special credentials)
- ✅ Session management (cookies)
- ✅ Protected routes
- ✅ Welcome message with username
- ✅ Logout functionality

### **5. Favorites System**
- ✅ Add/remove properties to favorites
- ✅ Favorites stored in localStorage (per user)
- ✅ Favorites page (`/favorites`)
- ✅ Favorite button on property cards
- ✅ Favorite button on property details page
- ✅ Empty state for no favorites
- ✅ Navigation link (visible when authenticated)

### **6. Admin Panel (CPANEL)**
- ✅ Admin dashboard
- ✅ Create new property listings
- ✅ Edit existing properties
- ✅ Delete properties
- ✅ Manage property listings (table view)
- ✅ Mark properties as featured
- ✅ View property requests
- ✅ Update request status
- ✅ Settings page
- ✅ Owner information management
- ✅ Property status management

### **7. Property Management**
- ✅ Create listings with:
  - Basic info (title, description, type, price)
  - Location (city, state, address)
  - Property details (BHK, bathrooms, area, floors)
  - Images (multiple uploads)
  - Amenities (checkboxes)
  - Owner information
  - Status (active, pending, sold, rented)
- ✅ Edit listings
- ✅ Delete listings
- ✅ Conditional fields:
  - BHK/Bathrooms hidden for Land, Plot, Warehouse, Commercial Building
  - Floors field only for Commercial Building
- ✅ Featured property toggle

### **8. Contact & Communication**
- ✅ Contact agent form on property pages
- ✅ Contact us page
- ✅ WhatsApp integration (direct message to +91 9446211417)
- ✅ Google reCAPTCHA v2 on all forms
- ✅ Form validation
- ✅ Success/error notifications

### **9. Sharing Features (Admin Only)**
- ✅ Share button on property cards
- ✅ Share button on property details page
- ✅ Web Share API support (mobile)
- ✅ Clipboard copy (desktop fallback)
- ✅ Toast notifications

### **10. Navigation & UI**
- ✅ Responsive navigation bars:
  - Liquid Glass Navbar (home page)
  - Standard Navbar (other pages)
  - Desktop Navigation
  - Mobile Navigation (drawer)
- ✅ Property type quick links
- ✅ Search bar in navigation
- ✅ User authentication status display
- ✅ Admin CPANEL access
- ✅ Favorites link (authenticated users)

### **11. Responsive Design**
- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop layouts
- ✅ Touch-friendly interactions
- ✅ Responsive images
- ✅ Adaptive navigation

### **12. Performance Features**
- ✅ Image lazy loading
- ✅ Code splitting
- ✅ Dynamic imports for heavy components
- ✅ Debounced search
- ✅ Optimized API calls
- ✅ Pagination for large datasets

### **13. SEO & Meta**
- ✅ Dynamic page titles
- ✅ Meta descriptions
- ✅ Semantic HTML
- ✅ Breadcrumb navigation
- ✅ Structured data ready

---

## 🏗 Architecture

### **Project Structure**
```
real-estate-main/
├── pages/
│   ├── index.tsx                    # Home page
│   ├── properties/
│   │   ├── index.tsx                # Properties listing
│   │   └── [id].tsx                 # Property details
│   ├── favorites.tsx                # Favorites page
│   ├── login.tsx                    # Login page
│   ├── register.tsx                 # Registration page
│   ├── contact.tsx                  # Contact us page
│   ├── cpanel/                      # Admin panel
│   │   ├── index.tsx                # Dashboard
│   │   ├── create-listing.tsx       # Create property
│   │   ├── edit-listing.tsx         # Edit property
│   │   ├── listings.tsx             # Manage listings
│   │   ├── property-requests.tsx    # Property requests
│   │   └── settings.tsx              # Settings
│   ├── api/                         # API routes
│   │   ├── get-properties.ts        # Fetch properties
│   │   ├── get-property.ts          # Fetch single property
│   │   ├── create-listing.ts        # Create property
│   │   ├── update-property.ts       # Update property
│   │   ├── delete-property.ts       # Delete property
│   │   ├── register.ts              # User registration
│   │   ├── user-login.ts            # User login
│   │   ├── get-property-requests.ts # Get requests
│   │   └── update-request-status.ts # Update request status
│   ├── _app.tsx                     # App wrapper
│   └── _document.tsx                 # Custom document
├── features/
│   ├── Home/                        # Home page components
│   ├── Property/                    # Property components
│   ├── common/                      # Shared components
│   └── Layout/                      # Layout components
├── contexts/
│   ├── AuthContext.tsx              # Authentication context
│   └── FavoritesContext.tsx         # Favorites context
├── lib/
│   ├── supabase.ts                  # Supabase client
│   └── theme.ts                     # Chakra UI theme
└── database-schema.sql              # Database schema
```

### **Data Flow**
1. **User Actions** → React Components
2. **State Updates** → Context API / Local State
3. **API Calls** → Next.js API Routes
4. **Database Queries** → Supabase
5. **Response** → Components → UI Update

---

## 🗄 Database Schema

### **Properties Table**
```sql
CREATE TABLE public.properties (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  property_type VARCHAR(50),
  bhk INTEGER,
  baths INTEGER,
  floors INTEGER,
  selling_type VARCHAR(20) CHECK (selling_type IN ('Sale', 'Rent')),
  price DECIMAL(12, 2),
  area_size DECIMAL(10, 2),
  area_unit VARCHAR(20),
  city VARCHAR(100),
  address TEXT,
  state VARCHAR(100),
  owner_name VARCHAR(255),
  owner_number VARCHAR(20),
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'active',
  featured BOOLEAN DEFAULT false,
  user_email VARCHAR(255),
  request_status VARCHAR(20) DEFAULT 'approved',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Users Table**
```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  user_type VARCHAR(50) DEFAULT 'user' CHECK (user_type IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Indexes**
- `idx_properties_status`
- `idx_properties_selling_type`
- `idx_properties_city`
- `idx_properties_created_at`
- `idx_properties_featured`
- `idx_users_email`
- `idx_users_username`

---

## 🔌 API Endpoints

### **GET /api/get-properties**
- **Query Parameters:**
  - `search` - Search term
  - `propertyType` - Filter by property type
  - `sellingType` - Sale or Rent
  - `minPrice`, `maxPrice` - Price range
  - `city` - City filter
  - `bhk` - Bedroom count
  - `status` - Property status
  - `featured` - Featured properties only
  - `sortBy` - Sort field
  - `sortOrder` - asc/desc
  - `page` - Page number
  - `limit` - Items per page
- **Returns:** Properties array, total count, pagination info

### **GET /api/get-property**
- **Query Parameters:**
  - `id` - Property ID
- **Returns:** Single property object

### **PUT /api/update-property**
- **Body:** Property data
- **Auth:** Required (admin)
- **Returns:** Updated property

### **POST /api/create-listing**
- **Body:** Property data
- **Auth:** Required (admin)
- **Returns:** Created property

### **DELETE /api/delete-property**
- **Query Parameters:**
  - `id` - Property ID
- **Auth:** Required (admin)
- **Returns:** Success status

### **POST /api/register**
- **Body:** username, email, password
- **Returns:** User data

### **POST /api/user-login**
- **Body:** email, password
- **Returns:** User data, isAdmin flag

### **GET /api/get-property-requests**
- **Auth:** Required (admin)
- **Returns:** Property requests array

### **PUT /api/update-request-status**
- **Body:** requestId, status
- **Auth:** Required (admin)
- **Returns:** Updated request

---

## 🧩 Key Components

### **Layout Components**
- `DefaultLayout` - Main page wrapper
- `LiquidGlassNavbar` - Home page navbar
- `StandardNavbar` - Standard page navbar
- `NavigationDesktop` - Desktop navigation
- `NavigationMobile` - Mobile navigation
- `Footer` - Site footer

### **Home Page Components**
- `HeroSection` - Hero with search
- `PropertyCarousel` - Property carousel
- `PopularSearches` - Category cards
- `FeatureHighlights` - Feature showcase
- `WeeklyHighlight` - Featured property
- `Marquee` - Scrolling text
- `Partners` - Partner logos
- `Testimonials` - Customer testimonials

### **Property Components**
- `PropertyCard` - Property card display
- `PropertyImageGallery` - Image gallery
- `PropertyBreadcrumbs` - Breadcrumb navigation
- `ContactAgent` - Contact form
- `PriceRangeSelector` - Price filter
- `SleekDropdown` - Custom dropdown

### **Common Components**
- `ContactForm` - Contact us form
- `Preloader` - Loading indicator

---

## 🔐 Authentication & Authorization

### **User Types**
1. **Guest** - No authentication
2. **User** - Registered user (can favorite properties)
3. **Admin** - Full access to CPANEL

### **Authentication Flow**
1. User registers/logs in
2. Credentials validated against database
3. Session stored in cookie (`user_session`)
4. Context provides auth state globally
5. Protected routes check authentication

### **Password Security**
- SHA-256 hashing (Node.js crypto)
- Passwords never stored in plain text
- Session-based authentication

### **Protected Routes**
- `/cpanel/*` - Admin only
- `/favorites` - Authenticated users only
- Login redirects with `returnUrl` parameter

---

## 🚀 Deployment

### **Environment Variables Required**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
```

### **Database Setup**
1. Run `database-schema.sql` in Supabase SQL Editor
2. Run `migration-add-floors-column.sql` (if needed)
3. Run `migration-add-featured-column.sql` (if needed)

### **Build & Deploy**
```bash
npm install
npm run build
npm start
```

### **Recommended Platforms**
- **Vercel** - Optimal for Next.js
- **Netlify** - Good alternative
- **AWS Amplify** - Enterprise option
- **Self-hosted** - Node.js server

---

## 📝 Additional Notes

### **Special Features**
- **Plot/Land Filtering** - Selecting "Plot" shows both Plot and Land properties
- **Commercial Land** - Separate category from regular Land
- **Featured Properties** - Special highlighting and homepage section
- **WhatsApp Integration** - Direct messaging to property owner
- **reCAPTCHA** - Bot prevention on forms
- **Responsive Dropdowns** - Portal-based positioning for overflow handling
- **URL State Management** - Filters persist in URL for sharing

### **Performance Optimizations**
- Image lazy loading
- Code splitting
- Debounced search
- Memoized components
- Optimized API queries
- Pagination

### **Browser Support**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

---

## 📞 Support & Contact

For technical support or questions about the implementation, refer to the codebase documentation or contact the development team.

---

**Last Updated:** 2024
**Version:** 1.0.0
**Framework:** Next.js 13+
**Language:** TypeScript

