/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Banner from "./Banner";
import { useCustomComponents } from "./mdxComponents";

// Interface for metadata
interface Metadata {
  title: string;
  description: string;
  author: string;
  date: string;
  lastUpdated: string;
}

interface Props {
  content: MDXRemoteSerializeResult;
  metadata: Metadata;
  slugPath: string[];
  hasBanner: boolean;
}

/* -----------------------------------
   Styles with Updated Variables
----------------------------------- */
const pageStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 4rem;
  padding: 0 2rem;
  font-family: 'Inter', sans-serif;
  color: var(--text-T2);
  line-height: 1.6;

  @media (min-width: 768px) {
    padding: 0 3rem;
  }
  @media (min-width: 1024px) {
    padding: 0 5rem;
  }

  a {
    color: var(--link-color);
    text-decoration: none;
  }

  a:hover {
    color: var(--link-hover-color);
    text-decoration: underline;
  }
`;

const subHeaderStyle = css`
  background-color: var(--bg-B2);
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 10;
  margin-bottom: 2rem;
`;

const subHeaderContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  @media (min-width: 1024px) {
    padding: 0 5rem;
  }
`;

const breadcrumbsStyle = css`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  nav {
    display: flex;
    align-items: center;
    font-size: 1rem;

    a {
      color: var(--link-color);
      text-decoration: none;
      margin-right: 0.5rem;
    }

    a:hover {
      text-decoration: underline;
    }

    span.separator {
      margin: 0 0.5rem;
      color: var(--text-T4);
    }

    span.current {
      color: var(--text-T1);
    }
  }
`;

const metaInfoStyle = css`
  color: var(--text-T5);
  font-size: 0.9rem;
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const contentStyle = css`
  color: var(--text-T2);
  font-size: 1rem;
  line-height: 1.8;

  p {
    margin-bottom: 1.5rem;
    text-align: justify;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-primary);
    margin-top: 2rem;
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  h2 {
    padding-top: 80px;
    margin-top: -80px;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 1.5rem auto;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
    overflow-x: auto;
  }

  hr {
    border: none;
    height: 1px;
    background: var(--border-color);
    margin: 2rem 0;
  }
`;

export default function ArticlePage({
  content,
  metadata,
  slugPath,
  hasBanner,
}: Props) {
  return (
    <div>
      {/* Top Header */}
      {/* <Header /> */}

      {/* Banner Section */}
      <Banner
        folderName={slugPath.join("/")}
        title={metadata.title}
        description={metadata.description}
        hasBanner={hasBanner}
      />

      {/* Sub Header Section */}
      <div css={subHeaderStyle}>
        <div css={subHeaderContainer}>
          {/* Breadcrumbs Section */}
          <div css={breadcrumbsStyle}>
            <nav>
              <Link href="/">Home</Link>
              <span className="separator">/</span>

              {slugPath.map((segment, index) => {
                const isLast = index === slugPath.length - 1;
                const path = `/a/${slugPath.slice(0, index + 1).join("/")}`;

                return (
                  <span key={index}>
                    {!isLast ? (
                      <>
                        <Link href={path}>{segment.replace(/-/g, " ")}</Link>
                        <span className="separator">/</span>
                      </>
                    ) : (
                      <span className="current">{segment.replace(/-/g, " ")}</span>
                    )}
                  </span>
                );
              })}
            </nav>
          </div>

          {/* Meta Info (Author, Date, etc.) */}
          <div css={metaInfoStyle}>
            <p>
              <strong>Author:</strong> {metadata.author} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <strong>Date:</strong> {metadata.date} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <strong>Last Updated:</strong> {metadata.lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Main Article Page Content */}
      <div css={pageStyle}>
        <main css={contentStyle}>
          <MDXRemote {...content} components={useCustomComponents()} />
        </main>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
