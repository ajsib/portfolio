/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useHeaderContext } from './HeaderContext';

const SideMenu = () => {
  const { headerHeight } = useHeaderContext();

  const sideMenuStyles = css`
    position: fixed;
    top: ${headerHeight}px; /* Adjusted to be below the header */
    left: 0;
    width: 250px;
    height: calc(100% - ${headerHeight}px);
    background-color: var(--color-component-bg);
    border-right: 1px solid var(--color-border);
    padding: 16px;
    box-sizing: border-box;
    overflow-y: auto;
    z-index: 999; /* Ensures it's above the rest of the content but below the header */
    transition: top 0.2s ease;
  `;

  const linkStyles = css`
    display: block;
    color: var(--color-text);
    margin: 12px 0;
    font-size: 16px;
    text-decoration: none;

    &:hover {
      color: var(--color-primary);
      text-decoration: underline;
    }
  `;

  const titleStyles = css`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
    color: var(--color-primary);
  `;

  const separatorStyles = css`
    border-bottom: 1px solid var(--color-border);
    margin: 16px 0;
  `;

  return (
    <div css={sideMenuStyles}>
      <div css={titleStyles}>Side Menu</div>
      <div>
        <a href="#" css={linkStyles}>Link 1</a>
        <a href="#" css={linkStyles}>Link 2</a>
        <a href="#" css={linkStyles}>Link 3</a>
      </div>
      <div css={separatorStyles}></div>
      <div>
        <a href="#" css={linkStyles}>Link 4</a>
        <a href="#" css={linkStyles}>Link 5</a>
      </div>
    </div>
  );
};

export default SideMenu;
