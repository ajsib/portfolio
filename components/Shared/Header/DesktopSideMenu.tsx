/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface DesktopSideMenuProps {
  isMenuOpen: boolean;
}

const desktopSideMenuStyles = (isMenuOpen: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  background-color: var(--color-component-bg);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
  transform: translateX(${isMenuOpen ? '0' : '-100%'});
  transition: transform 0.1s ease-out;
  padding-top: 60px;
`;

const menuContentStyles = css`
  padding: 20px;
  ul {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: 500;
    }
  }
`;

const DesktopSideMenu: React.FC<DesktopSideMenuProps> = ({ isMenuOpen }) => {
  return (
    <div css={desktopSideMenuStyles(isMenuOpen)}>
      <div css={menuContentStyles}>
        <ul>
          <li>
            <a href="/my-story">My Story</a>
          </li>
          <li>
            <a href="/projects">Projects</a>
          </li>
          <li>
            <a href="/resume">Resume</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesktopSideMenu;
