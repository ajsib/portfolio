/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode, useState } from "react";

const codeBlockStyle = css`
  position: relative;
  background-color: #eee;
  color: var(--text-primary);
  padding: 1rem;
  border-radius: var(--border-radius-large);
  overflow-x: auto;
  font-size: 0.9rem;
  margin: 1rem 0;
  font-family: "Courier New", Courier, monospace;
`;

const copyButtonStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #444;
  color: #fff;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius-small);
  cursor: pointer;
  font-size: 0.75rem;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

const CodeBlock = ({ children }: { children: ReactNode }) => {
  const [copied, setCopied] = useState(false);

  const codeString = Array.isArray(children)
    ? children.join("")
    : String(children);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div css={codeBlockStyle}>
      <button css={copyButtonStyle} onClick={handleCopy}>
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
