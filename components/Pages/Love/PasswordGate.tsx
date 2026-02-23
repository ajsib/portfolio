import React, { useState, useEffect } from 'react';

type PasswordGateProps = {
  children: React.ReactNode;
};

// TOKEN_KEY is used for session storage
const TOKEN_KEY = 'auth_token';

const PasswordGate: React.FC<PasswordGateProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check for authentication token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem(TOKEN_KEY);
      if (!token) return;

      try {
        // Verify the token with the server using our new API endpoint
        const response = await fetch('/api/love-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setAuthenticated(true);
        } else {
          // Clear invalid token
          sessionStorage.removeItem(TOKEN_KEY);
        }
      } catch (err) {
        console.error('Verification error:', err);
        sessionStorage.removeItem(TOKEN_KEY);
      }
    };

    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Authenticate using our new API endpoint
      const response = await fetch('/api/love-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store the token in session storage (more secure than localStorage)
        sessionStorage.setItem(TOKEN_KEY, data.token);
        setAuthenticated(true);
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div style={overlayStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2>Enter Password</h2>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
            autoFocus
            disabled={isLoading}
          />
          <button type="submit" style={buttonStyle} disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Submit'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    );
  }

  return <>{children}</>;
};

export default PasswordGate;

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#000000ee',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const formStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  minWidth: '300px',
};

const inputStyle: React.CSSProperties = {
  padding: '0.5rem',
  fontSize: '1rem',
};

const buttonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  cursor: 'pointer',
};
