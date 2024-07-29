// pages/_app.tsx
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ModeToggle from '@/modules/shared/ModeToggle';
import '../styles/globals.styles.css';
import '../styles/themes.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <ModeToggle />
    </ThemeProvider>
  );
}

export default MyApp;
