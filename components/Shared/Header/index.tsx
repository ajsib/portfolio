/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/UI/icons/logo';
import Hamburger from '@/components/UI/icons/hamburger';

const paddingVertical = 10;
const paddingHorizontal = 18;
const logoMargin = 12;
const fontSizeBase = 18;

interface HeaderProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu, isMenuOpen }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Initial detection
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const headerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: ${paddingVertical}px ${paddingHorizontal}px;
    background-color: var(--color-component-bg);
    border-bottom: 1px solid var(--color-border);
    user-select: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
  `;

  const leftContainerStyles = css`
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
      justify-content: center;
      width: 100%;
    }
  `;

  const logoContainerStyles = css`
    display: flex;
    align-items: center;

    svg {
      height: 35px;
      width: auto;
      margin: 0 ${logoMargin}px;
      transition: height 0.2s ease;
    }

    h1 {
      font-size: 28px;
      color: var(--color-primary);
      margin: 0;
      transition: font-size 0.2s ease;

      @media (max-width: 768px) {
        font-size: ${fontSizeBase * 1.3}px;
        text-align: center;
      }
    }
  `;

  const hamburgerStyles = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    ${isMobile ? 'margin-left: auto;' : 'margin-right: auto;'}
  `;

  const navStyles = css`
    display: flex;
    align-items: center;
  `;

  const linksContainerStyles = css`
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
      display: none;
    }

    a {
      margin-left: ${paddingHorizontal}px;
      font-size: ${fontSizeBase}px;
      font-weight: 600;
      color: var(--color-secondary);
      transition: color 0.2s ease-in-out;

      &:hover,
      &:focus {
        color: var(--color-primary);
        text-decoration: underline;
      }
    }
  `;

  return (
    <>
      <header css={headerStyles}>
        <div css={leftContainerStyles}>
          {!isMobile && (
            <div css={hamburgerStyles} onClick={toggleMenu}>
              <Hamburger isOpen={isMenuOpen} size="28px" />
            </div>
          )}
          <div css={logoContainerStyles}>
            <Logo color="var(--color-primary)" />
            <h1>Aidan Sibley</h1>
          </div>
          {isMobile && (
            <div css={hamburgerStyles} onClick={toggleMenu}>
              <Hamburger isOpen={isMenuOpen} size="28px" />
            </div>
          )}
        </div>
        <nav css={navStyles}>
          <div css={linksContainerStyles}>
            <Link href="/work">Work</Link>
            <Link href="/studio">Studio</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/contact">Connect</Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
