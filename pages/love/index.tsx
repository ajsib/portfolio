/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CardContent from '@/components/Pages/Love/CardContent';
import CreateLetter from '@/components/Pages/Love/CreateLetter';
import { loveTheme } from '@/components/Pages/Love/theme';
import Head from 'next/head';

interface LetterMeta {
  datestamp: string;
  title: string;
  author: string;
}

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

  @media (max-width: 480px) {
    margin-top: 6.5rem; /* ✅ increases top margin on small screens */
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

  &:hover, &:focus, &:active {
    background: ${loveTheme.colors.primary} !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;
    transform: none !important;
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
`;

const toolbarWrapper = css`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 10;
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
`;

const dropdownStyle = css`
  margin-top: 0.5rem;
  user-select: none;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  border: 1px solid ${loveTheme.colors.border};

  button {
background: transparent;
border: none;
display: block;
width: calc(100% - 1.5rem);
padding: 0.75rem 1rem;
margin: 0.5rem auto; /* ✅ centers it horizontally */
text-align: left;
font-weight: bold;
color: ${loveTheme.colors.text};
font-family: ${loveTheme.fonts.body};
font-size: 0.95rem;

    &:hover {
      background: ${loveTheme.colors.accent};
    }
  }
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
  const [creating, setCreating] = useState(false);
  const [author, setAuthor] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);


  const fetchLetters = async () => {
    setLoading(true);
    const res = await fetch('/api/letters/getAll');
    const data = await res.json();
    setLetters(data.letters || []);
    setLoading(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setAuthor(stored);
    fetchLetters();
  }, []);

  const handleSelectAuthor = (name: string) => {
    localStorage.setItem('user', name);
    setAuthor(name);
  };

  const handleSelectLetter = (stamp: string) => {
    router.push({ pathname: '/love', query: { datestamp: stamp } });
  };

  const clearSelection = () => {
    router.push('/love');
  };

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
    <>
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
  
      {datestamp ? (
        <CardContent datestamp={datestamp as string} onBack={clearSelection} />
      ) : creating ? (
        <CreateLetter
          onCancel={() => setCreating(false)}
          onSuccess={(newStamp) => {
            setCreating(false);
            fetchLetters();
            router.push({ pathname: '/love', query: { datestamp: newStamp } });
          }}
        />
      ) : (
        <>
          <button css={buttonStyle} onClick={() => setCreating(true)}>
            ✍️ Write a New Letter
          </button>
  
          {loading && <p>Loading...</p>}
  
          <div css={gridStyle}>
            {letters.map((letter) => (
              <div
                css={cardStyle}
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
        </>
      )}
    </div>
    </>
  );
  
}
