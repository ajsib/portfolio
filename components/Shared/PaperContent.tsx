/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useHeaderContext } from '@/components/Shared/Header/HeaderContext';
import { ReactNode } from 'react';

const paperWidth = 1400; // Maximum width for large screens
const paddingLarge = 32; // Padding for large screens
const paddingSmall = 16; // Padding for small screens

const PaperContent = ({ children }: { children: ReactNode }) => {
  const { headerHeight } = useHeaderContext();

  const paperStyles = css`
    max-width: ${paperWidth}px;
    width: 100%;
    margin: 0 auto; /* Center the content horizontally */
    padding: ${headerHeight + 32}px ${paddingLarge}px 32px;
    background-color: var(--color-component-bg);
    border-left: 1px solid var(--color-border);
    border-right: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    box-sizing: border-box;
    transition: padding 0.3s ease, max-width 0.3s ease;

    /* Typography Styles */
    h1,
    h2,
    h3 {
      color: var(--color-primary);
      margin-top: 16px;
    }

    p {
      color: var(--color-text);
      line-height: 1.6;
    }

    hr {
      border: none;
      border-bottom: 1px solid var(--color-border);
      margin: 24px 0;
    }

    /* Responsive Styles */
    @media (max-width: 1000px) {
      padding: ${headerHeight + 24}px ${paddingSmall}px 24px;
      border-left: none;
      border-right: none;
      border-bottom: 1px solid var(--color-border);
    }

    @media (max-width: 600px) {
      padding: ${headerHeight + 16}px 12px 16px;
    }
  `;

  return <div css={paperStyles}>{children}</div>;
};

export default PaperContent;
