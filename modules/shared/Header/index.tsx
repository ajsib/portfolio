/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

const headerStyle = (isSticky: boolean, isHidden: boolean) => css`
  position: ${isSticky ? 'sticky' : 'fixed'};
  top: ${isSticky ? (isHidden ? '-5rem' : '0') : '1rem'};
  height: 4.5rem;
  width: calc(100% - 3rem);
  background-color: var(--background-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: ${isSticky ? '0 0 10px 10px' : '10px'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: background-color 0.3s, color 0.3s, top 0.3s, border-radius 0.3s;
`;

const navStyle = css`
  display: flex;
  gap: 20px;
`;

const avatarContainerStyle = css`
  position: absolute;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
`;

const avatarImageStyle = css`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

const buttonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--text-color);
  &:hover {
    text-decoration: underline;
  }
`;

type HeaderProps = {
  threshold?: number;
};

const Header = ({ threshold = 120 }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const currentPath = router.pathname;
  const [isSticky, setIsSticky] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollTop = useRef(0);

  const routes = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/resume', label: 'Resume' },
    { path: '/projects', label: 'Projects' },
    { path: '/dev-diary', label: 'Dev Diary' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const thresholdPx = (threshold / 100) * window.innerHeight;

      if (scrollTop > thresholdPx) {
        setIsSticky(true);
        if (scrollTop > lastScrollTop.current) {
          // Scrolling down
          setIsHidden(true);
        } else {
          // Scrolling up
          setIsHidden(false);
        }
      } else {
        setIsSticky(false);
        setIsHidden(false);
      }

      lastScrollTop.current = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return (
    <header css={headerStyle(isSticky, isHidden)}>
      <nav css={navStyle}>
        {routes.map(({ path, label }) =>
          currentPath !== path && (
            <button
              key={path}
              css={buttonStyle}
              onClick={() => router.push(path)}
            >
              {label}
            </button>
          )
        )}
      </nav>
      <div css={avatarContainerStyle}>
        <Image src="/assets/avatar.png" alt="Avatar" width={56} height={56} css={avatarImageStyle} />
      </div>
      <button css={buttonStyle} onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  );
};

export default Header;
