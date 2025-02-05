/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const ulStyle = css`
  list-style-type: disc;
  margin: 1rem 0 1rem 1.5rem;

  ul {
    list-style-type: circle;
    margin-left: 1.5rem;
  }
`;

const olStyle = css`
  list-style-type: decimal;
  margin: 1rem 0 1rem 1.5rem;

  ol {
    list-style-type: lower-alpha;
    margin-left: 1.5rem;
  }
`;

export const UnorderedList = (props: any) => <ul css={ulStyle} {...props} />;
export const OrderedList = (props: any) => <ol css={olStyle} {...props} />;
