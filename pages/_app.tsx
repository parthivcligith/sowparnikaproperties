import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import Head from 'next/head';
import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import theme from '@/lib/theme';
import Preloader from '@/components/Preloader/Preloader';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Configure NProgress to match old money theme
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 100,
      minimum: 0.08,
      easing: 'ease',
      speed: 400,
    });

    const handleRouteChangeStart = () => {
      NProgress.start();
    };

    const handleRouteChangeComplete = () => {
      NProgress.done(false);
    };

    const handleRouteChangeError = () => {
      NProgress.done(false);
    };

    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      Router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <FavoritesProvider>
            {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
            {!isLoading && <Component {...pageProps} />}
          </FavoritesProvider>
        </AuthProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}
