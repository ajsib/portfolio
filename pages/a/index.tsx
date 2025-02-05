/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import fs from "fs";
import path from "path";
import { GetServerSideProps } from "next";
import Link from "next/link";
// import Header from "@/components/modules/LandingPages/Header";
import Banner from "@/components/Pages/Articles/ArticlePage/Banner";
// import Footer from "@/components/modules/LandingPages/Footer";

// ---------------------------------------------
// 1) Types
// ---------------------------------------------
interface ArticleDirectory {
  name: string;            // Folder name
  path: string;            // Relative path from /articles
  children: ArticleDirectory[];
  isArticle: boolean;      // True if the folder contains a main.md
}

interface Props {
  articlesTree: ArticleDirectory[];
}

// ---------------------------------------------
// 2) Styles
// ---------------------------------------------
const containerStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  line-height: 1.6;

  @media (min-width: 768px) {
    padding: 0 3rem;
  }
  @media (min-width: 1024px) {
    padding: 0 5rem;
  }
`;

const breadcrumbStyle = css`
  margin: 1rem 0;
  a {
    color: var(--color-link);
    text-decoration: none;
    margin-right: 0.5rem;
  }
  a:hover {
    text-decoration: underline;
  }

  span.separator {
    margin: 0 0.5rem;
    color: var(--text-secondary);
  }
`;

const introStyle = css`
  margin: 2rem 0;
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  p {
    color: var(--text-secondary);
  }
`;

/**
 * Tree-style list:
 * - vertical dotted line for parent
 * - horizontal connectors for each list item
 */
const treeStyle = css`
  margin-top: 2rem;
  margin-bottom: 4rem;
  ul {
    list-style: none; /* remove bullets */
    padding-left: 1rem; /* subtle left padding */
    margin: 0;
    position: relative;
    border-left: 1px dashed #cccccc; /* vertical line */
  }

  /* Remove the vertical line for the root level if desired 
     e.g., if you only want lines for nested folders
     border-left: none; 
  */

  ul ul {
    margin-left: 1rem; /* indent nested subfolders */
  }

  li {
    position: relative;
    padding-left: 1rem; /* space for horizontal line */
    margin: 0.5rem 0;   /* spacing between items */

    /* remove vertical line on the last item at each level, if desired
       also consider adjusting for deeper nestings 
    */
  }

  /* For the first item, you might want to hide the horizontal line 
     li:first-of-type::before {
       display: none;
     }
  */

  /* Link styling remains the same, no new hover or color changes */
  a {
    color: var(--color-link);
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

// ---------------------------------------------
// 3) Helper: Build a DFS-based article tree
// ---------------------------------------------
function buildArticleTree(dirPath: string, relativePath = ""): ArticleDirectory[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const result: ArticleDirectory[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subDirPath = path.join(dirPath, entry.name);
      const subRelPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

      const hasMainMD = fs.existsSync(path.join(subDirPath, "main.md"));
      const children = buildArticleTree(subDirPath, subRelPath);

      if (hasMainMD || children.length > 0) {
        result.push({
          name: entry.name,
          path: subRelPath,
          children,
          isArticle: hasMainMD,
        });
      }
    }
  }

  return result;
}

// ---------------------------------------------
// 4) Server-Side Data Fetch (getServerSideProps)
// ---------------------------------------------
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const articlesDir = path.join(process.cwd(), "articles");

    if (!fs.existsSync(articlesDir)) {
      return {
        props: {
          articlesTree: [],
        },
      };
    }

    const articlesTree = buildArticleTree(articlesDir);

    return {
      props: {
        articlesTree,
      },
    };
  } catch (error) {
    console.error("Error building articles index:", error);
    return {
      props: {
        articlesTree: [],
      },
    };
  }
};

// ---------------------------------------------
// 5) Recursive Rendering of Articles with Lines
// ---------------------------------------------
function renderArticlesTree(tree: ArticleDirectory[]) {
  return (
    <ul>
      {tree.map((node) => {
        const link = `/a/${node.path}`;
        return (
          <li key={node.path}>
            {node.isArticle ? (
              <Link href={link}>{node.name.replace(/-/g, " ")}</Link>
            ) : (
              <span>{node.name.replace(/-/g, " ")}</span>
            )}
            {node.children.length > 0 && renderArticlesTree(node.children)}
          </li>
        );
      })}
    </ul>
  );
}

// ---------------------------------------------
// 6) Main Index Component
// ---------------------------------------------
export default function ArticlesIndex({ articlesTree }: Props) {
  return (
    <div>
      {/* Optional Banner */}
      <Banner
        folderName=""
        title="Articles Index"
        description="Welcome to our nested articles index! Browse all articles recursively below."
        hasBanner={false}
      />

      {/* <Header /> */}

      {/* Main Container */}
      <div css={containerStyle}>
        {/* Breadcrumb */}
        <div css={breadcrumbStyle}>
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <span>Articles Index</span>
        </div>

        {/* Intro Section */}
        <section css={introStyle}>
          <h1>All Articles</h1>
          <p>
            This page lists all articles discovered under <code>public/articles</code>. Click an article
            to view it.
          </p>
        </section>

        {/* Articles List with the new tree styling */}
        <section css={treeStyle}>{renderArticlesTree(articlesTree)}</section>
      </div>
      {/* <Footer/> */}
    </div>
  );
}
