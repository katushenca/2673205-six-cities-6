/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  resolve: {
    alias: {
      '@MainPage': path.resolve(__dirname, 'src/pages/main-page'),
      '@LoginPage': path.resolve(__dirname, 'src/pages/login-page'),
      '@OfferPage': path.resolve(__dirname, 'src/pages/offer-page'),
      '@NonFoundPage': path.resolve(__dirname, 'src/pages/non-found-page'),
      '@FavoritePage': path.resolve(__dirname, 'src/pages/favorites-page'),
      '@PrivateRoute': path.resolve(__dirname, 'src/components/private-route'),
      '@OffersCard': path.resolve(__dirname, 'src/components/offers-card'),
      '@OffersList': path.resolve(__dirname, 'src/components/offers-list'),
      '@PageTitle': path.resolve(__dirname, 'src/components/page-title'),
      '@ReviewForm': path.resolve(__dirname, 'src/components/review-form'),
    }
  }
});
