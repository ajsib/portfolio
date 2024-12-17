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
  transition: transform 0.1s ease-out;
  padding-top: ${HEADER_HEIGHT}px;
`;

const menuContentStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  font-family: 'Inter', sans-serif;

  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 12px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-bottom: 16px;
      font-size: 18px;

      a {
        text-decoration: none;
        color: var(--color-text);
        transition: color 0.2s ease, transform 0.2s ease;

        &:hover {
          color: var(--color-link);
          transform: translateX(5px);
        }
      }

      &.active {
        a {
          font-weight: 700;
          color: var(--color-primary);
        }
      }
    }
  }

  .divider {
    height: 1px;
    background-color: var(--color-border);
    margin: 20px 0;
  }

  .secondary-links {
    margin-top: auto;

    .muted-link {
      font-size: 16px;
      color: var(--color-muted);
    }
  }
`;

const DesktopSideMenu: React.FC<DesktopSideMenuProps> = ({ isMenuOpen }) => {
  return (
    <div css={desktopSideMenuStyles(isMenuOpen)}>
<div css={menuContentStyles}>
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

        <div>
          <h3 className="section-title">Explore</h3>
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

        <div className="divider" />

        <div className="secondary-links">
          <a href="/terms" className="muted-link">Terms of Use</a>
          <br />
          <a href="/privacy" className="muted-link">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default DesktopSideMenu;
