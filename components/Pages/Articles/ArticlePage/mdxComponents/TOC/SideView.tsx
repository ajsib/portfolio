/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

interface SideViewProps {
  headings: { id: string; text: string; level: number }[];
}

const sideViewStyle = css`
  position: fixed;
  top: 10rem;
  left: -250px; /* Retracted position */
  width: 250px;
  height: auto;
  max-height: 80vh;
  padding: 1rem;
  background-color: #fcfcfc;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: left 0.4s ease;
  opacity: 0.95;
  z-index: 11;

  &:hover {
    left: 0; /* Slide fully into view */
  }

  &.demo {
    left: 0; /* Initial demonstration position */
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
    text-transform: uppercase;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0.4rem 0;
    padding-left: 0.5rem;
  }

  li.level-2 {
    margin-left: 1rem;
  }

  a {
    color: var(--color-link);
    text-decoration: none;
    font-size: 0.95rem;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const SideView: React.FC<SideViewProps> = ({ headings }) => {
  const [demoState, setDemoState] = useState(true);

  useEffect(() => {
    // Slide out as a demo for 3 seconds, then retract
    const timeout = setTimeout(() => {
      setDemoState(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return ReactDOM.createPortal(
    <div css={sideViewStyle} className={demoState ? "demo" : ""}>
      <h4>Table of Contents</h4>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} className={`level-${heading.level}`}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </div>,
    document.body
  );
};

export default SideView;
