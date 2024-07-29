/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from 'react';

const cardStyle = css`
  width: 100%; /* Make card take up full width of its grid cell */
  height: 100%; /* Make card take up full height of its grid cell */
  background-color: var(--card-background-color);
  color: var(--text-color);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const thumbnailStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const iconStyle = css`
  margin-right: 0.5rem;
`;

const titleStyle = css`
  font-size: 1.5rem;
  font-weight: 700;
`;

interface CardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  [key: string]: any;
}

const Card: React.FC<CardProps> = ({ title, icon, children, ...props }) => {
  return (
    <div css={cardStyle} {...props}>
      <div css={thumbnailStyle}>
        <span css={iconStyle}>{icon}</span>
        <span css={titleStyle}>{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;