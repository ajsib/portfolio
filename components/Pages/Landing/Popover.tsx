/** @jsxImportSource @emotion/react */
// components/UI/Popover.tsx
import React, { ReactNode } from 'react';
import { css } from '@emotion/react';

const popoverStyles = css`
  position: relative;
  display: inline-block;

  .popover-content {
    visibility: hidden;
    width: 400px; /* Fixed width for the popover */
    background-color: var(--color-component-bg);
    color: var(--color-text);
    text-align: left;
    border: 1px solid var(--color-border);
    padding: 15px;
    // border-radius: 8px;
    position: absolute;
    z-index: 1000;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    line-height: 1.6;
    opacity: 0;
    transition: opacity 0.3s;
    white-space: normal;
    overflow: hidden; /* Hide any overflow */
    // box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

    display: flex; /* Flexbox layout to align image and text */
    align-items: flex-start;

    &:hover {
      visibility: visible;
      opacity: 1;
    }
  }

  &:hover .popover-content {
    visibility: visible;
    opacity: 1;
  }

  .popover-content img {
    margin-right: 15px;
    max-width: 100px; /* Limit image width */
    height: auto;
    flex-shrink: 0;
  }

  .popover-content .text-content {
    flex-grow: 1;
  }

  .popover-content::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--color-component-bg) transparent transparent transparent;
  }

  &[data-position="top"] .popover-content {
    bottom: auto;
    top: 125%;
  }
`;

interface PopoverProps {
  children: ReactNode;
  title: string;
  description: string;
  imageUrl?: string;
}

const Popover: React.FC<PopoverProps> = ({ children, title, description, imageUrl }) => {
  return (
    <span css={popoverStyles}>
      {children}
      <span className="popover-content">
        {imageUrl && <img src={imageUrl} alt={title} />}
        <div className="text-content">
          <h3 style={{ fontSize: '16px', margin: '0 0 10px 0', color: 'var(--color-primary)' }}>{title}</h3>
          <p style={{ margin: 0 }}>{description}</p>
        </div>
      </span>
    </span>
  );
};

export default Popover;
