/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

interface AdmonitionProps {
  type: "note" | "warning" | "tip";
  children: React.ReactNode;
}

const Admonition: React.FC<AdmonitionProps> = ({ type, children }) => {
  const colors = {
    note: "var(--color-information)",
    warning: "var(--color-warning)",
    tip: "var(--color-success)",
  };

  const style = css`
    background-color: ${colors[type]}20;
    border-left: 4px solid ${colors[type]};
    padding: 1rem;
    margin: 1rem 0;
    border-radius: var(--border-radius-small);
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-primary);
  `;

  return <div css={style}>{children}</div>;
};

export default Admonition;
