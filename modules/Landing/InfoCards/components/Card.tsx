// modules/Landing/InfoCards/components/Card.tsx
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const cardStyle = css`
  background-color: var(--card-background-color);
  color: var(--text-color);
  width: 200px;
  height: 300px;
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: transform 0.3s;
`;

const Card = ({ children }: { children: React.ReactNode }) => {
    return (
        <div css={cardStyle}>
            {children}
        </div>
    );
};

export default Card;
