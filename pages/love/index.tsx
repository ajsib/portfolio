/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CardContent from '@/components/Pages/Love/CardContent';
import CreateLetter from '@/components/Pages/Love/CreateLetter';
import { loveTheme } from '@/components/Pages/Love/theme';
import Head from 'next/head';
import LoadingState from '@/components/Pages/Love/LoadingState';
import PasswordGate from '@/components/Pages/Love/PasswordGate';

interface LetterMeta {
  datestamp: string;
  title: string;
  author: string;
}

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const staggeredFadeIn = (index: number) => css`
  opacity: 0;
  animation: ${fadeIn} 0.4s ease-out forwards;
  animation-delay: ${0.1 + index * 0.05}s;
`;

const containerStyle = css`
  min-height: 100vh;
  padding: 0.75rem;
  font-family: ${loveTheme.fonts.body};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  background:
    radial-gradient(circle at 50% 20%, #fff0f3 0%, #fdecef 100%),
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 10 10'><circle cx='1' cy='1' r='0.4' fill='%23f5d6da' /></svg>");
  background-size: cover, 40px 40px;
  background-repeat: repeat;
  background-blend-mode: overlay;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), transparent 40%);
    z-index: -1;
  }
`;

const headingStyle = css`
  font-family: ${loveTheme.fonts.heading};
  font-size: 2.4rem;
  color: ${loveTheme.colors.text};
  text-align: center;
  margin-bottom: 4rem;
  margin-top: 3.5rem;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 480px) {
    margin-top: 6.5rem;
  }
`;

const buttonStyle = css`
  background: ${loveTheme.colors.primary};
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  appearance: none;
  animation: ${fadeInScale} 0.5s ease-out;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover, &:focus {
    background: ${loveTheme.colors.primary} !important;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15) !important;
    transform: translateY(-2px) !important;
  }
  
  &:active {
    transform: translateY(1px) !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1) !important;
  }
`;

const gridStyle = css`
  width: 100%;
  max-width: 600px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const cardStyle = css`
  background: linear-gradient(145deg, #ffffff, #fdf4f4);
  border-radius: 12px;
  border: 1px solid ${loveTheme.colors.border};
  padding: 1.5rem 1.25rem;
  box-shadow:
    inset 0 0 0 1px #ffffff,
    0 2px 6px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;
  cursor: pointer;
  font-family: ${loveTheme.fonts.body};
  background-size: 20px 20px;
  background-image: repeating-linear-gradient(
    to bottom,
    #f9ecec,
    #f9ecec 19px,
    #f7dcdc 20px
  );
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow:
      inset 0 0 0 1px #ffffff,
      0 8px 16px rgba(0, 0, 0, 0.08);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 12px;
    background: radial-gradient(circle at 50% 100%, rgba(0, 0, 0, 0.05), transparent 70%);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  h3 {
    font-family: ${loveTheme.fonts.heading};
    font-size: 1.25rem;
    margin: 0;
    color: ${loveTheme.colors.text};
  }

  small {
    font-size: 0.95rem;
    color: #6e5858;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }

  .stamp {
    position: absolute;
    top: 12px;
    right: 12px;
    color: ${loveTheme.colors.primary};
    opacity: 0.6;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &:hover .stamp {
    opacity: 0.8;
    transform: scale(1.1);
  }

  .initials {
    position: absolute;
    bottom: 10px;
    right: 14px;
    font-size: 0.85rem;
    font-weight: bold;
    color: #b68c8c;
    font-family: ${loveTheme.fonts.heading};
    opacity: 0.4;
    letter-spacing: 1px;
  }
`;

const identityPromptStyle = css`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: ${fadeInScale} 0.6s ease-out;

  button {
    background: ${loveTheme.colors.accent};
    border: none;
    border-radius: 12px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: ${loveTheme.colors.text};
    cursor: pointer;
    width: 200px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
      transform: translateY(1px);
    }
  }
`;

const illustrationStyle = css`
  position: absolute;
  top: -60px;
  left: -40px;
  width: 300px;
  opacity: 0.08;
  pointer-events: none;
  z-index: 0;
  animation: ${fadeIn} 1s ease-out;
`;

const toolbarWrapper = css`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 10;
  animation: ${fadeIn} 0.5s ease-out;
`;

const toolbarStyle = css`
  background: #ffffffdd;
  border: 1px solid ${loveTheme.colors.border};
  border-radius: 12px;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  color: ${loveTheme.colors.text};
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
  
  &:hover {
    background: #ffffff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  }
`;

const dropdownStyle = css`
  margin-top: 0.5rem;
  user-select: none;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  border: 1px solid ${loveTheme.colors.border};
  animation: ${fadeInScale} 0.3s ease-out;

  button {
    background: transparent;
    border: none;
    display: block;
    width: calc(100% - 1.5rem);
    padding: 0.75rem 1rem;
    margin: 0.5rem auto;
    text-align: left;
    font-weight: bold;
    color: ${loveTheme.colors.text};
    font-family: ${loveTheme.fonts.body};
    font-size: 0.95rem;
    transition: background 0.15s ease;

    &:hover {
      background: ${loveTheme.colors.accent};
    }
  }
`;

// Page transition container
const pageTransitionStyle = css`
  width: 100%;
  animation: ${fadeInScale} 0.5s ease-out;
`;

// Initial page loading animation
const initialLoadingStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #fff8f8, #fff0f3);
  z-index: 100;
  animation: ${keyframes`
    0% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
  `} 1.5s forwards;
`;


function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function LoveLettersPage() {
  const router = useRouter();
  const { datestamp } = router.query;

  const [letters, setLetters] = useState<LetterMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [author, setAuthor] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchLetters = async () => {
    try {
      const res = await fetch('/api/letters/getAll');
      const data = await res.json();
      setLetters(data.letters || []);
  
      // Add a small delay before removing the loading state
      setTimeout(() => {
        setLoading(false);
      }, 800); // Slightly longer for better animation view
    } catch (error) {
      console.error('Failed to fetch letters:', error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Handle initial page loading animation
    setTimeout(() => {
      setInitialLoading(false);
    }, 1500);
    
    setLoading(true);
    const stored = localStorage.getItem('user');
    if (stored) setAuthor(stored);
    fetchLetters();
  }, []);

  const handleSelectAuthor = (name: string) => {
    localStorage.setItem('user', name);
    setAuthor(name);
  };

  const handleSelectLetter = (stamp: string) => {
    setLoading(true);
    router.push({ pathname: '/love', query: { datestamp: stamp } });
    // Add delay to show loading state before navigating
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  const clearSelection = () => {
    setLoading(true);
    router.push('/love');
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  if (initialLoading) {
    return (
      <div css={initialLoadingStyle}>
        <LoadingState message="Welcome to Love Letters" />
      </div>
    );
  }

  if (!author) {
    return (
      <div css={containerStyle}>
        <h1 css={headingStyle}>Who Are You?</h1>
        <div css={identityPromptStyle}>
          <button onClick={() => handleSelectAuthor('Aidan')}>I am Aidan</button>
          <button onClick={() => handleSelectAuthor('Clothilde')}>I am Clothilde</button>
        </div>
      </div>
    );
  }

  return (
    <PasswordGate>
      <Head>
        <title>Love Letters</title>
        <link rel="icon" type="image/png" href="/love-assets/love-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f8e1e1" />
        <meta name="description" content="A heartfelt collection of digital love letters." />
      </Head>
      <div css={containerStyle}>
        {/* Top-right toolbar */}
        <div css={toolbarWrapper}>
          <div css={toolbarStyle} onClick={() => setShowDropdown(!showDropdown)}>
            💖 {author}
          </div>
          {showDropdown && (
            <div css={dropdownStyle}>
              {['Aidan', 'Clothilde'].map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    localStorage.setItem('user', name);
                    setAuthor(name);
                    setShowDropdown(false);
                  }}
                >
                  I am {name}
                </button>
              ))}
            </div>
          )}
        </div>
    
        {/* Illustration */}
        <div css={illustrationStyle}>
          <svg viewBox="0 0 300 300" fill="none">
            <path
              d="M150 0C93.0 0 50 50 50 100s50 100 100 150c50-50 100-100 100-150S207 0 150 0z"
              fill="gray"
              opacity="0.2"
              filter="blur(12px)"
            />
          </svg>
        </div>
    
        <h1 css={headingStyle}>Love Letters</h1>
    
        {loading ? (
          <LoadingState />
        ) : (
          <div css={pageTransitionStyle}>
            {datestamp ? (
                <>
  <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center; /* center children horizontally */
      width: 100%;
    `}
  >
    <CardContent datestamp={datestamp as string} onBack={clearSelection} />
  </div>
</>

            
            ) : creating ? (
                <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center; /* center children horizontally */
      width: 100%;
    `}
  >  
              <CreateLetter
                onCancel={() => setCreating(false)}
                onSuccess={(newStamp) => {
                  setCreating(false);
                  setLoading(true);
                  fetchLetters();
                  setTimeout(() => {
                    router.push({ pathname: '/love', query: { datestamp: newStamp } });
                    setLoading(false);
                  }, 600);
                }}
              />
              </div>
            ) : (
                <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: center; /* center children horizontally */
                  width: 100%;
                `}
              >
              
                <button css={buttonStyle} onClick={() => setCreating(true)}>
                  ✍️ Write a New Letter
                </button>
    
                <div css={gridStyle}>
                  {letters.map((letter, index) => (
                    <div
                      css={[cardStyle, staggeredFadeIn(index)]}
                      key={letter.datestamp}
                      onClick={() => handleSelectLetter(letter.datestamp)}
                    >
                      <div className="stamp">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                          width="24"
                          height="24"
                        >
                          <path
                            d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                          />
                        </svg>
                      </div>
                      <h3>{letter.title}</h3>
                      <small>By {letter.author}</small>
                      <div className="meta">
                        <small>{formatDate(letter.datestamp)}</small>
                      </div>
                      <div className="initials">{getInitials(letter.author)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PasswordGate>
  );
}