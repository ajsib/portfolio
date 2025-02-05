/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const inlineCodeStyle = css`
  font-family: "Courier New", Courier, monospace;
  background-color: #eee;
  color: var(--text-primary);
  padding: 0.2rem 0.3rem;
  border-radius: var(--border-radius-small);
  margin: 0 0.1rem;
`;

const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code css={inlineCodeStyle}>{children}</code>
);

export default InlineCode;
