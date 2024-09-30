/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/UI/icons/logo';
import Hamburger from '@/components/UI/icons/hamburger';
import ProfileIcon from '@/components/UI/icons/profile';
import SideMenu from './SideMenu';
import { useHeaderContext } from './HeaderContext';

const paddingVertical = 10;
const paddingHorizontal = 18;
const logoMargin = 18;
const fontSizeBase = 18;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled, headerHeight } = useHeaderContext();

  const toggleMenu = () => {
    console.log('Menu toggled');
    setIsMenuOpen((prevState) => !prevState);
  };

  // Dynamic styles based on scroll position
  const headerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${headerHeight}px;
    padding: ${paddingVertical}px ${paddingHorizontal}px;
    background-color: var(--color-component-bg);
    border-bottom: 1px solid var(--color-border);
    user-select: none;
    transition: height 0.2s ease;
    position: fixed;
    top: 0;
    left: 0;      /* Ensure header starts from the left */
    right: 0;     /* Ensure header stretches to the right */
    width: 100%;
    z-index: 1000;
  `;

  const leftContainerStyles = css`
    display: flex;
    align-items: center;
  `;

  const logoContainerStyles = css`
    display: flex;
    align-items: center;
    height: 100%;

    svg {
      height: ${isScrolled ? fontSizeBase * 1.5 : fontSizeBase * 2}px;
      width: auto;
      margin: 0 ${logoMargin}px;
      transition: height 0.2s ease;
    }

    h1 {
      font-size: ${isScrolled ? fontSizeBase * 1.5 : fontSizeBase * 1.75}px;
      color: var(--color-primary);
      margin: 0;
      transition: font-size 0.2s ease;
    }
  `;

  const hamburgerStyles = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: ${logoMargin}px;
  `;

  const navStyles = css`
    display: flex;
    align-items: center;
  `;

  // New styles for the links container
  const linksContainerStyles = css`
    display: flex;
    align-items: center;

    /* Hide the links when screen width is below 1000px */
    @media (max-width: 1000px) {
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

  const profileContainerStyles = css`
    display: flex;
    align-items: center;
    margin-left: ${paddingHorizontal}px;

    &::before {
      content: '';
      display: block;
      width: 1px;
      height: 24px;
      background-color: var(--color-text);
      margin-right: ${paddingHorizontal}px;
    }

    button {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      background-color: transparent;
      cursor: pointer;
      font-size: ${fontSizeBase}px;
      color: var(--color-primary);
      transition: background-color 0.2s ease-in-out;
      border: none;

      &:hover {
        background-color: var(--color-hover-bg);
      }

      svg {
        margin-right: 6px;
      }
    }
  `;

  return (
    <>
      <header css={headerStyles}>
        <div css={leftContainerStyles}>
          <div css={hamburgerStyles} onClick={toggleMenu}>
            <Hamburger isOpen={isMenuOpen} size="28px" />
          </div>
          <div css={logoContainerStyles}>
            <Logo color="var(--color-primary)" />
            <h1>Aidan Sibley</h1>
          </div>
        </div>
        <nav css={navStyles}>
          {/* Wrap the links in the linksContainerStyles */}
          <div css={linksContainerStyles}>
            <Link href="/my-story">My Story</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/resume">Resume</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div css={profileContainerStyles}>
            <button>
              <ProfileIcon size="20px" color="var(--color-primary)" />
              Sign In
            </button>
          </div>
        </nav>
      </header>
      {isMenuOpen && <SideMenu />} {/* Conditionally render the SideMenu */}
    </>
  );
};

export default Header;
