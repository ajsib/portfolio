/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HTMLAttributes } from "react";


const tableStyle = css`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 1rem 0;
  border: var(--border-light);
  border-radius: var(--border-radius-large);
  overflow: hidden;

  thead {
    background-color: var(--background-alternate);
  }

  th,
  td {
    text-align: left;
    padding: 0.75rem;
    border-bottom: var(--border-light);
  }

  th {
    font-weight: bold;
    color: var(--text-secondary);
  }
`;

const Table = (props: HTMLAttributes<HTMLTableElement>) => <table css={tableStyle} {...props} />;

export default Table;
