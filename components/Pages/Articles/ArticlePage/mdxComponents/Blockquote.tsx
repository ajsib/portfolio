/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const blockquoteStyle = css`
  background-color: var(--background-alternate);
  border-left: 4px solid var(--primary-color);
  padding: 1rem 1rem;
  margin: 1rem 0;
  // font-style: italic;
  border-radius: var(--border-radius-large);
`;

const Blockquote = (props: any) => <blockquote css={blockquoteStyle} {...props} />;

export default Blockquote;
