/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState,
    //  ChangeEvent,
      useCallback } from 'react';
import Head from 'next/head';
import Header from '@/components/Shared/Header';
import Footer from '@/components/Shared/Footer';
import PaperContent from '@/components/Shared/PaperContent';
import DesktopSideMenu from '@/components/Shared/Header/DesktopSideMenu';
import MobileSideMenu from '@/components/Shared/Header/MobileSideMenu';
import { MOBILE_MENU_HEIGHT, HEADER_HEIGHT, DESKTOP_MENU_WIDTH } from '@/components/Shared/Header/styles';

// Types
interface AzureFile {
  name: string;
  url: string;
}

interface FileNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileNode[];
  url?: string; // for files
}

interface FileTreeProps {
  node: FileNode;
}

interface ContainerStyleProps {
  isMenuOpen: boolean;
  isMobile: boolean;
}

// Styles
const containerStyle = ({ isMenuOpen, isMobile }: ContainerStyleProps) => css`
  background-color: var(--bg-B1);
  min-height: calc(100vh - ${HEADER_HEIGHT}px - 4rem);
  transition: margin-left 0.3s ease-out, margin-top 0.3s ease-out;
  margin-left: ${isMenuOpen && !isMobile ? `${DESKTOP_MENU_WIDTH}px` : '0'};
  margin-top: ${isMenuOpen && isMobile ? `${MOBILE_MENU_HEIGHT - HEADER_HEIGHT}px` : '0'};
  padding-bottom: 4rem;
  z-index: 2;
  position: relative;
`;

const paperContentStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const fileTreeStyle = css`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 1.5rem;

  ul {
    list-style: none;
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }
  
  li {
    margin: 0.5rem 0;
    padding: 0.3rem 0;
    transition: all 0.2s ease;
    border-radius: 4px;
  }
`;

const directoryItemStyle = css`
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const fileItemStyle = css`
  display: flex;
  align-items: center;
  padding: 0.3rem 0.5rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const buttonStyle = css`
  color: black;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 0.8rem;
  margin-bottom: 1.2rem;
  font-weight: 500;
  transition: background-color 0.2s ease, transform 0.1s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const fileButtonStyle = css`
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  text-decoration: none;
  padding: 0.2rem 0.5rem;
  font-size: 0.85rem;
  margin-left: 0.7rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    text-decoration: underline;
  }
`;

const uploadFormStyle = css`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const uploadControlsStyle = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 0.8rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const uploadStatusStyle = (isError: boolean) => css`
  margin-top: 1rem;
  padding: 0.8rem;
  border-radius: 4px;
  background-color: ${isError ? 'rgba(220, 38, 38, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
  color: ${isError ? 'rgb(248, 113, 113)' : 'rgb(52, 211, 153)'};
  font-size: 0.9rem;
`;

const iconStyle = css`
  margin-right: 0.5rem;
  font-size: 1.1rem;
`;

// Helper functions
function buildTree(files: AzureFile[]): FileNode {
  const root: FileNode = { name: 'videoProject', path: '', isDirectory: true, children: [] };

  for (const file of files) {
    // Split file name by '/' to form folder structure.
    const parts = file.name.split('/');
    let current = root;
    let currentPath = '';
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const existing = current.children?.find(child => child.name === part);
      
      if (i === parts.length - 1) {
        // File node
        if (existing) {
          existing.url = file.url;
        } else {
          current.children = current.children || [];
          current.children.push({
            name: part,
            path: currentPath,
            isDirectory: false,
            url: file.url,
          });
        }
      } else {
        // Directory node
        if (existing && existing.isDirectory) {
          current = existing;
        } else {
          const newDir: FileNode = { 
            name: part, 
            path: currentPath, 
            isDirectory: true, 
            children: [] 
          };
          current.children = current.children || [];
          current.children.push(newDir);
          current = newDir;
        }
      }
    }
  }
  return root;
}

// Components
const FileTree: React.FC<FileTreeProps> = ({ node }) => {
  const [expanded, setExpanded] = useState(false);

  const handleDownload = async (filePath: string) => {
    try {
      window.open(`/api/video/downloadFile?filePath=${encodeURIComponent(filePath)}`, '_blank');
    } catch (err) {
      console.error('Failed to download file:', err);
    }
  };

  if (node.isDirectory) {
    return (
      <li>
        <div 
          css={directoryItemStyle}
          onClick={() => setExpanded(!expanded)}
        >
          <span css={iconStyle}>{expanded ? '📂' : '📁'}</span>
          <span>{node.name}</span>
        </div>
        {expanded && node.children && (
          <ul>
            {node.children
              .sort((a, b) => {
                // Sort directories first, then files
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;
                return a.name.localeCompare(b.name);
              })
              .map(child => (
                <FileTree key={child.path} node={child} />
              ))}
          </ul>
        )}
      </li>
    );
  }
  
  return (
    <li css={fileItemStyle}>
      <span css={iconStyle}>📄</span>
      <span>{node.name}</span>
      <button 
        onClick={() => handleDownload(node.path)} 
        css={fileButtonStyle}
      >
        Download
      </button>
    </li>
  );
};

const VideoProjectExplorer: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [fileTree, setFileTree] = useState<FileNode | null>(null);
  const [uploading,
    //  setUploading
    ] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch files from the Azure Blob Storage API endpoint
  const fetchFiles = useCallback(async () => {
    try {
      setFileTree(null); // Set to null while loading
      const res = await fetch('/api/video/getFiles');
      if (!res.ok) throw new Error('Failed to fetch files');
      const files: AzureFile[] = await res.json();
      const tree = buildTree(files);
      setFileTree(tree);
    } catch (err) {
      console.error(err);
      setUploadMessage('Failed to fetch files');
      setUploadError(true);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // Handle file/folder upload
//   const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;
    
//     setUploading(true);
//     setUploadMessage('Uploading files...');
//     setUploadError(false);
    
//     const formData = new FormData();

//     // Append each file with directory structure included in name
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       let filePath: string;
      
//       // For folder upload, use webkitRelativePath
//       if ('webkitRelativePath' in file && file.webkitRelativePath) {
//         filePath = file.webkitRelativePath;
//       } else {
//         // For individual files, just use the filename
//         filePath = file.name;
//       }
      
//       formData.append('file', file, filePath);
//     }
    
//     try {
//       const res = await fetch('/api/video/upload', {
//         method: 'POST',
//         body: formData,
//       });
      
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'Upload failed');
//       }
      
//       const data = await res.json();
//       setUploadMessage(data.message || 'Files uploaded successfully');
//       setUploadError(false);
      
//       // Refresh file list after a short delay
//       setTimeout(() => {
//         fetchFiles();
//         setUploading(false);
//       }, 1000);
//     } catch (err) {
//       console.error(err);
//       setUploadMessage(err instanceof Error ? err.message : 'Upload failed');
//       setUploadError(true);
//       setUploading(false);
//     }
//   };

  const handleDownloadAll = () => {
    window.open('/api/video/downloadAll', '_blank');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Head>
        <title>CISC 497 Video Project Explorer</title>
      </Head>

      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <DesktopSideMenu isMenuOpen={isMenuOpen && !isMobile} />
      <MobileSideMenu isMenuOpen={isMenuOpen && isMobile} />

      <div css={containerStyle({ isMenuOpen, isMobile })}>
       <div css={paperContentStyle}>
         <PaperContent>
          <h1>📁 CISC 497 Video Project Explorer</h1>

          {/* Upload Form */}
          <div css={uploadFormStyle}>
            <h2>Upload Files</h2>
            <div css={uploadControlsStyle}>
              {/* <div>
                <input
                  type="file"
                  id="upload"
                  name="upload"
                  multiple
                  webkitdirectory="true"
                  onChange={handleUpload}
                  css={css`margin-right: 1rem;`}
                />
              </div> */}
              
              <button 
                onClick={handleDownloadAll} 
                css={buttonStyle}
                disabled={uploading}
              >
                📥 Download All Files
              </button>
            </div>
            
            {uploadMessage && (
              <div css={uploadStatusStyle(uploadError)}>
                {uploadMessage}
              </div>
            )}
          </div>

          {/* Display File Tree */}
          <div css={fileTreeStyle}>
            <h2>Project Files</h2>
            {fileTree ? (
              <ul>
                <FileTree node={fileTree} />
              </ul>
            ) : (
              <div css={css`padding: 1rem 0;`}>
                Loading files...
              </div>
            )}
          </div>
        </PaperContent>
      </div>

      <Footer isMenuOpen={isMenuOpen} isMobile={isMobile} />
    </div>
    </div>
  );
};

export default VideoProjectExplorer;