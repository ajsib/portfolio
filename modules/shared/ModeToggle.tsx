/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTheme } from '@/contexts/ThemeContext';

const buttonStyle = css`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  background: var(--background-color);
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: var(--hover-background-color);
    color: var(--hover-text-color);
  }
`;

const ModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button css={buttonStyle} onClick={toggleTheme}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
};

export default ModeToggle;
