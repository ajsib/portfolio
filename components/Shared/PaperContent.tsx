/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { HEADER_HEIGHT } from '@/components/Shared/Header/styles';

const paperWidth = 1400; // Maximum width for large screens
const paddingLarge = 64; // Padding for large screens
const paddingSmall = 16; // Padding for small screens

const PaperContent = ({ children }: { children: ReactNode }) => {
  const paperStyles = css`
    max-width: ${paperWidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${HEADER_HEIGHT + 32}px ${paddingLarge}px 32px;
    background-color: var(--bg-component); /* Light/Dark mode adaptable component background */
    border-left: 1px solid var(--border-color); /* Light/Dark adaptable border */
    border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    box-sizing: border-box;
    border-radius: var(--radius-default);
    transition: padding 0.3s ease, max-width 0.3s ease;

    /* Typography Styles */
    h1,
    h2,
    h3 {
      color: var(--color-primary); /* Heading primary color */
      margin-top: 16px;
    }

    p {
      color: var(--text-T2); /* Standard text color */
      line-height: 1.6;
    }

    hr {
      border: none;
      border-bottom: 1px solid var(--border-color); /* Divider color */
      margin: 24px 0;
    }

    /* Responsive Styles */
    @media (max-width: 1000px) {
      padding: ${HEADER_HEIGHT + 24}px ${paddingSmall}px 24px;
      border-left: none;
      border-right: none;
      border-bottom: 1px solid var(--border-color);
    }

    @media (max-width: 600px) {
      padding: ${HEADER_HEIGHT + 16}px 12px 16px;
    }
  `;

  return <div css={paperStyles}>{children}</div>;
};

export default PaperContent;
