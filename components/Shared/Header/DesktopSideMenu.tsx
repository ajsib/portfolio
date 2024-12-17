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
  width: 301px;
  background-color: var(--color-component-bg);
  border-right: 1px solid var(--color-border);
  z-index: 1;
  transform: translateX(${isMenuOpen ? '0' : '-100%'});
  transition: transform 0.2s ease-out;
  padding-top: ${HEADER_HEIGHT}px;
`;

const menuContentStyles = css`
  flex: 1;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Align Sign In at the bottom */

  /* Section Titles */
  .section-title {
    font-size: 18px;
    font-weight: 700;
    font-family: 'Merriweather', serif; /* Updated font */
    color: var(--color-primary);
    margin-bottom: 12px;
    text-transform: uppercase;
    padding-left: 10px;
    border-left: 4px solid var(--color-primary);
  }

  /* Navigation List */
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-bottom: 12px;

      a {
        text-decoration: none;
        font-size: 16px;
        font-weight: 400;
        color: var(--color-text);
        display: block;
        padding: 12px 20px; /* Increased padding for taller links */
        transition: color 0.2s ease, background-color 0.2s ease, border-left 0.2s ease;
        border-left: 4px solid transparent; /* Left border for hover effect */

        &:hover {
          color: var(--color-link);
          background-color: var(--color-alt-bg);
          border-left: 4px solid var(--color-primary);
        }
      }

      &.active a {
        font-weight: 600;
        color: var(--color-primary);
        background-color: var(--color-alt-bg);
        border-left: 4px solid var(--color-primary);
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

  /* Secondary Links */
  .secondary-links {
    display: flex;
    flex-direction: column;

    .muted-link {
      font-size: 14px;
      color: var(--color-muted);
      text-decoration: none;
      padding: 8px 20px;
      transition: color 0.2s ease;

      &:hover {
        color: var(--color-link);
      }
    }

    /* Sign In Link Styling */
    .sign-in {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-primary);
      text-decoration: none;
      padding: 14px 20px;
      text-align: center;
      background-color: var(--color-component-bg);
      border-top: 1px solid var(--color-border);
      transition: background-color 0.2s ease, color 0.2s ease;

      &:hover {
        background-color: var(--color-alt-bg);
        color: var(--color-link);
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
            <li>
              <a href="/work" aria-label="Work">Work</a>
            </li>
            <li>
              <a href="/studio" aria-label="Studio">Studio</a>
            </li>
            <li>
              <a href="/insights" aria-label="Insights">Insights</a>
            </li>
            <li>
              <a href="/connect" aria-label="Connect">Connect</a>
            </li>
          </ul>
        </div>

        <div className="divider" />

        {/* Explore Section */}
        <div>
          <h3 className="section-title">Explore</h3>
          <ul>
            <li>
              <a href="/gallery" aria-label="Gallery">Gallery</a>
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

        <div className="divider" />

        {/* Secondary Links */}
        <div className="secondary-links">
          <a href="/privacy" className="muted-link">Privacy Policy</a>
          <a href="/sign-in" className="sign-in">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default DesktopSideMenu;