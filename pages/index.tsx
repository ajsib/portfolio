/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Head from 'next/head';
import Header from '@/components/Shared/Header';
import PaperContent from '@/components/Shared/PaperContent';
import HeroSection from '@/components/Pages/Landing/HeroSection';
import AboutMe from '@/components/Pages/Landing/AboutMe'
import Timeline from '@/components/Pages/Landing/Timeline';

const containerStyle = css`
  min-height: 100vh;
  background-color: var(--color-background);
  padding-top: ${-60}px; /* Adjust the padding to make the paper touch the header */
  position: relative;
  z-index: 0;
`;

const Home = () => {
  return (
    <div css={containerStyle}>
      <Head>
        <title>Portfolio - Aidan Sibley</title>
      </Head>
      <Header />
      <PaperContent>
        <HeroSection />
        <AboutMe />
        <Timeline />
      </PaperContent>
    </div>
  );
};

export default Home;
