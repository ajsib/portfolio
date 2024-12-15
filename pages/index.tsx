/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Shared/Header';
import PaperContent from '@/components/Shared/PaperContent';
import HeroSection from '@/components/Pages/Landing/HeroSection';
import AboutMe from '@/components/Pages/Landing/AboutMe';
import Timeline from '@/components/Pages/Landing/Timeline';
import Services from '@/components/Pages/Landing/ServicesSection';
import CallToAction from '@/components/Pages/Landing/CTAsection';
import DesktopSideMenu from '@/components/Shared/Header/DesktopSideMenu';

const containerStyle = (isMenuOpen: boolean) => css`
  min-height: 100vh;
  background-color: var(--color-background);
  padding-left: ${isMenuOpen ? '300px' : '0'};
  transition: padding-left 0.1s ease-out;
  z-index: 2;
`;

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Head>
        <title>Portfolio - Aidan Sibley</title>
      </Head>
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <DesktopSideMenu isMenuOpen={isMenuOpen} />
      <div css={containerStyle(isMenuOpen)}>
        <PaperContent>
          <HeroSection />
          <AboutMe />
          <Timeline />
          <Services />
          <CallToAction />
        </PaperContent>
      </div>
    </div>
  );
};

export default Home;
