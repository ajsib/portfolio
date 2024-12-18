/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { HEADER_HEIGHT } from '@/components/Shared/Header/styles';

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
  border-right: 1px solid var(--color-border);
  z-index: 1;
  transform: translateX(${isMenuOpen ? '0' : '-100%'});
  transition: transform 0.2s ease-out;
  padding-top: ${HEADER_HEIGHT + 18}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
`;

const menuContentStyles = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;

  /* Section Titles */
  .section-title {
    font-size: 18px;
    font-weight: 700;
    font-family: 'Source Sans Pro', sans-serif;
    color: var(--color-primary);
    margin-bottom: 10px;
    padding-left: 20px;
  }

  /* Navigation List */
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: 0;

      a {
        text-decoration: none;
        font-size: 16px;
        font-weight: 400;
        color: var(--color-text);
        display: block;
        padding: 14px 20px; /* Taller padding for accessibility */
        border-left: 4px solid transparent; /* Default border */
        transition: color 0.3s ease, border-left 0.3s ease, background-color 0.3s ease;

        &:hover {
          color: var(--color-primary);
          border-left: 4px solid var(--color-primary);
          background-color: var(--color-alt-bg);
        }
      }

      &.active a {
        font-weight: 600;
        color: var(--color-primary);
        border-left: 4px solid var(--color-primary);
        background-color: var(--color-alt-bg);
      }
    }
  }

  /* Dividers */
  .divider {
    height: 1px;
    background-color: var(--color-border);
    margin: 16px 0;
    opacity: 0.6;
  }

  /* Bottom Buttons */
.bottom-links {
  display: flex;
  justify-content: space-between; /* Space links evenly */ 
  align-items: center;
  padding: 16px 20px; /* Padding for spacing */ 
  border-top: 1px solid var(--color-border); /* Optional separator */ 
  padding: 20px 50px;
  margin-top: auto; /* Pushes this section to the bottom */ 

  a {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-muted);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-primary);
      text-decoration: underline;
    }
  }
}
  }
`;

const DesktopSideMenu: React.FC<DesktopSideMenuProps> = ({ isMenuOpen }) => {
  return (
    <div css={desktopSideMenuStyles(isMenuOpen)}>
      <div css={menuContentStyles}>
        {/* Main Navigation */}
        <div>
          <h3 className="section-title">Navigation</h3>
          <ul>
            <li><a href="/work">Work</a></li>
            <li><a href="/studio">Studio</a></li>
            <li><a href="/insights">Insights</a></li>
            <li><a href="/connect">Connect</a></li>
          </ul>
        </div>

        <div className="divider" />

        {/* Explore Section */}
        <div>
          <h3 className="section-title">Explore</h3>
          <ul>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/task-tracker">Task Tracker</a></li>
            <li><a href="/code-lab">Code Lab</a></li>
            <li><a href="/changelog">Changelog</a></li>
          </ul>
        </div>

        <div className="divider" />

        {/* Bottom Section with Sign In and Sign Up */}
        <div className="bottom-links">
          <a href="/sign-in">Sign In</a>
          <a href="/sign-up">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default DesktopSideMenu;