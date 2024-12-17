/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { MOBILE_MENU_HEIGHT, HEADER_HEIGHT } from './styles';

interface MobileSideMenuProps {
  isMenuOpen: boolean;
}

const mobileSideMenuStyles = (isMenuOpen: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${MOBILE_MENU_HEIGHT}px;
  background-color: var(--color-component-bg);
  z-index: 999;
  transform: translateY(${isMenuOpen ? '0' : `-${MOBILE_MENU_HEIGHT}px`});
  transition: transform 0.1s ease-out;
  padding-top: ${HEADER_HEIGHT}px;
  border-bottom: 1px solid var(--color-border);

  display: flex;
  flex-direction: column;
`;

const topNavigationStyles = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  padding: 8px 0;

  a {
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-primary);
    font-family: 'Inter', sans-serif;
    transition: color 0.1s ease;

    &:hover {
      color: var(--color-link);
    }
  }
`;

const linkListStyles = css`
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    margin: 10px 0;

    a {
      text-decoration: none;
      font-size: 16px;
      font-family: 'Inter', sans-serif;
      color: var(--color-text);
      transition: color 0.2s ease;

      &:hover {
        color: var(--color-link);
      }
    }
  }
`;

const MobileSideMenu: React.FC<MobileSideMenuProps> = ({ isMenuOpen }) => {
  return (
    <nav css={mobileSideMenuStyles(isMenuOpen)} aria-label="Mobile Navigation">
      {/* Top Navigation Links */}
      <div css={topNavigationStyles}>
        <a href="/work" aria-label="Work">Work</a>
        <a href="/studio" aria-label="Studio">Studio</a>
        <a href="/insights" aria-label="Insights">Insights</a>
        <a href="/connect" aria-label="Connect">Connect</a>
      </div>

      {/* Secondary Links */}
      <div css={linkListStyles}>
        <ul>
          <li>
            <a href="/gallery" aria-label="Gallery App">Gallery</a>
          </li>
          <li>
            <a href="/task-tracker" aria-label="Task Tracker">Task Tracker</a>
          </li>
          <li>
            <a href="/code-lab" aria-label="Code Lab">Code Lab</a>
          </li>
          <li>
            <a href="/changelog" aria-label="Changelog">Changelog</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileSideMenu;
