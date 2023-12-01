import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { AppProps } from 'next/app';

const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div >
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
