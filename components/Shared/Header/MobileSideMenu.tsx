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
  transition: transform 0.2s ease-out;
  padding-top: ${HEADER_HEIGHT}px;
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

const topNavStyles = css`
  background-color: var(--color-background);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-border);

  a {
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-primary);
    font-family: 'Inter', sans-serif;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-link);
    }
  }
`;

const secondaryNavStyles = css`
  flex: 1;
  background-color: var(--color-alt-bg);
  overflow-y: auto;
  padding: 10px 0;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 8px 20px;

    a {
      text-decoration: none;
      font-size: 14px;
      color: var(--color-text);
      font-family: 'Inter', sans-serif;
      transition: color 0.2s ease;

      &:hover {
        color: var(--color-link);
        text-decoration: underline;
      }
    }
  }

  h4 {
    margin: 12px 20px 8px;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-muted);
    text-transform: uppercase;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 4px;
  }
`;

const MobileSideMenu: React.FC<MobileSideMenuProps> = ({ isMenuOpen }) => {
  return (
    <nav css={mobileSideMenuStyles(isMenuOpen)} aria-label="Mobile Navigation">
      {/* Top Navigation */}
      <div css={topNavStyles}>
        <a href="/work" aria-label="Work">Work</a>
        <a href="/studio" aria-label="Studio">Studio</a>
        <a href="/insights" aria-label="Insights">Insights</a>
        <a href="/connect" aria-label="Connect">Connect</a>
      </div>

      {/* Secondary Links */}
      <div css={secondaryNavStyles}>
        <h4>Explore</h4>
        <ul>
          <li><a href="/gallery" aria-label="Gallery App">Gallery</a></li>
          <li><a href="/task-tracker" aria-label="Task Tracker">Task Tracker</a></li>
          <li><a href="/code-lab" aria-label="Code Lab">Code Lab</a></li>
          <li><a href="/changelog" aria-label="Changelog">Changelog</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileSideMenu;