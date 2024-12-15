/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const mobileSideMenuStyles = css`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  height: 100vh;
  background-color: var(--color-component-bg);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 999;
  transition: transform 0.3s ease;

  .menu-content {
    padding: 20px;
  }
`;

const MobileSideMenu: React.FC = () => {
  return (
    <div css={mobileSideMenuStyles}>
      <div className="menu-content">
        <p>Navigation</p>
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

export default MobileSideMenu;
