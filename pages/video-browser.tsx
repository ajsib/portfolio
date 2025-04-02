/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Shared/Header';
import Footer from '@/components/Shared/Footer';
import PaperContent from '@/components/Shared/PaperContent';
import DesktopSideMenu from '@/components/Shared/Header/DesktopSideMenu';
import MobileSideMenu from '@/components/Shared/Header/MobileSideMenu';
import { MOBILE_MENU_HEIGHT, HEADER_HEIGHT, DESKTOP_MENU_WIDTH } from '@/components/Shared/Header/styles';
import path from 'path';
import fs from 'fs';

type FileNode = {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileNode[];
};

const containerStyle = (isMenuOpen: boolean, isMobile: boolean) => css`
  background-color: var(--bg-B1);
  overflow-y: hidden;
  transition: padding-left 0.2s ease-out, padding-top 0.2s ease-out;
  padding-left: ${isMenuOpen && !isMobile ? `${DESKTOP_MENU_WIDTH / 2}px` : '0'};
  padding-top: ${isMenuOpen && isMobile ? `${(MOBILE_MENU_HEIGHT - HEADER_HEIGHT) / 3}px` : '0'};
  padding-bottom: 4rem;
  z-index: 2;
`;

const listStyle = css`
  ul {
    list-style: none;
    padding-left: 1.2rem;
  }

  li {
    margin: 0.3rem 0;
    cursor: pointer;
  }

  a {
    color: var(--text-P1);
    text-decoration: none;
  }
`;

const FileTree: React.FC<{ node: FileNode }> = ({ node }) => {
  const [expanded, setExpanded] = useState(false);

  if (node.isDirectory) {
    return (
      <li>
        <strong onClick={() => setExpanded(!expanded)}>
          {expanded ? '📂' : '📁'} {node.name}
        </strong>
        {expanded && node.children && (
          <ul>
            {node.children.map((child) => (
              <FileTree key={child.path} node={child} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      📄 <a href={`/videoProject/${node.path}`} target="_blank" rel="noopener noreferrer">{node.name}</a>
    </li>
  );
};

const VideoBrowser = ({ fileTree }: { fileTree: FileNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Head>
        <title>Video Project Explorer</title>
      </Head>

      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <DesktopSideMenu isMenuOpen={isMenuOpen && !isMobile} />
      <MobileSideMenu isMenuOpen={isMenuOpen && isMobile} />

      <div css={containerStyle(isMenuOpen, isMobile)}>
        <PaperContent>
          <h1>📁 Video Project Explorer</h1>
          <div css={listStyle}>
            <ul>
              <FileTree node={fileTree} />
            </ul>
          </div>
        </PaperContent>
      </div>

      <Footer isMenuOpen={isMenuOpen} isMobile={isMobile} />
    </div>
  );
};

export async function getStaticProps() {
  const baseDir = path.join(process.cwd(), 'public', 'videoProject');

  const walkDir = (dirPath: string, relativePath = ''): FileNode => {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    return {
      name: path.basename(dirPath),
      path: relativePath,
      isDirectory: true,
      children: entries.map((entry) => {
        const fullPath = path.join(dirPath, entry.name);
        const entryRelPath = path.join(relativePath, entry.name);

        if (entry.isDirectory()) {
          return walkDir(fullPath, entryRelPath);
        }

        return {
          name: entry.name,
          path: entryRelPath.replace(/\\/g, '/'), // Ensure URLs are web-safe
          isDirectory: false,
        };
      }),
    };
  };

  const fileTree = walkDir(baseDir);

  return {
    props: {
      fileTree,
    },
  };
}

export default VideoBrowser;
