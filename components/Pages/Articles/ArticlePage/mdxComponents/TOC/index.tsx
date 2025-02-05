/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import SideView from "./SideView";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const tocStyle = css`
  background-color: #fcfcfc;
  border: 1px solid #e2e2e2;
  padding: 1rem 1.25rem;
  margin: 2rem 0;
  border-radius: 4px;

  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
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
    transition: color 0.2s ease;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const TOC: React.FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [showSideView, setShowSideView] = useState(false);

  useEffect(() => {
    // Extract only H1 and H2 headings
    const extractedHeadings = Array.from(document.querySelectorAll("h1, h2")).map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName.replace("H", ""), 10),
    }));
    setHeadings(extractedHeadings);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const tocElement = document.querySelector("[data-toc]");

      if (!tocElement) return;

      const tocPosition = tocElement.getBoundingClientRect().top;
      const shouldShow = tocPosition < -160; // Show after scrolling 10rem past the TOC section
      setShowSideView(shouldShow);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!headings.length) return null; // If no headings, don't render TOC

  return (
    <>
      <div css={tocStyle} data-toc>
        <h4>Table of Contents</h4>
        <ul>
          {headings.map((heading) => (
            <li key={heading.id} className={`level-${heading.level}`}>
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Render the SideView when scrolling past the TOC */}
      <SideView headings={headings} />
    </>
  );
};

export default TOC;
