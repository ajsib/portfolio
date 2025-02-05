/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Shared/Header';
import PaperContent from '@/components/Shared/PaperContent';
import HeroSection from '@/components/Pages/Landing/HeroSection';
import AboutMe from '@/components/Pages/Landing/AboutMe';
import Timeline from '@/components/Pages/Landing/Timeline';
import Services from '@/components/Pages/Landing/ServicesSection';
import CallToAction from '@/components/Pages/Landing/CTAsection';
import Footer from '@/components/Shared/Footer';
import DesktopSideMenu from '@/components/Shared/Header/DesktopSideMenu';
import MobileSideMenu from '@/components/Shared/Header/MobileSideMenu';
import { MOBILE_MENU_HEIGHT, HEADER_HEIGHT, DESKTOP_MENU_WIDTH } from '@/components/Shared/Header/styles';

const containerStyle = (isMenuOpen: boolean, isMobile: boolean) => css`
  background-color: var(--bg-B1); /* Light/Dark mode adaptable background */
  overflow-y: hidden;
  transition: padding-left 0.2s ease-out, padding-top 0.2s ease-out;
  padding-left: ${isMenuOpen && !isMobile ? `${DESKTOP_MENU_WIDTH / 2}px` : '0'};
  padding-top: ${isMenuOpen && isMobile ? `${(MOBILE_MENU_HEIGHT - HEADER_HEIGHT) / 3}px` : '0'};
  padding-bottom: 4rem;
  z-index: 2;
`;

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    handleResize(); // Initial check on mount
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Head>
        <title>Portfolio - Aidan Sibley</title>
      </Head>

      {/* Header and Side Menus */}
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <DesktopSideMenu isMenuOpen={isMenuOpen && !isMobile} />
      <MobileSideMenu isMenuOpen={isMenuOpen && isMobile} />

      {/* Main Content */}
      <div css={containerStyle(isMenuOpen, isMobile)}>
        <PaperContent>
          <HeroSection />
          <AboutMe />
          <Timeline />
          <Services />
          <CallToAction />
        </PaperContent>
      </div>

      {/* Footer */}
      <Footer isMenuOpen={isMenuOpen} isMobile={isMobile} />
    </div>
  );
};

export default Home;
