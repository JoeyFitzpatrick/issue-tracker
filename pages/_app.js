import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../scss/custom.scss"
import '../styles.css'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}