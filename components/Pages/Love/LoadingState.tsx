/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { loveTheme } from './theme';

// Pulse animation for the heart
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.15);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
`;

// Fade in animation for the container
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Float animation for the heart
const float = keyframes`
  0% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.05);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
`;

// Sparkle dots animation
const sparkle = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
`;

// Container with background overlay
const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  padding: 2rem;
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    // background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%);
    border-radius: 16px;
    z-index: -1;
  }
`;

// Heart style with combined animations
const heartStyle = css`
  width: 64px;
  height: 64px;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  animation: ${pulse} 1.2s infinite ease-in-out, ${float} 3s infinite ease-in-out;
  transform-origin: center;
  position: relative;

  path {
    fill: ${loveTheme.colors.primary};
    stroke: none;
  }
`;

// Text style for loading message
const textStyle = css`
  font-family: ${loveTheme.fonts.body};
  color: ${loveTheme.colors.text};
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  animation: ${fadeIn} 0.8s ease-out;
  letter-spacing: 0.5px;
`;

// Sparkle dots styles
const sparkleDotsContainer = css`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const sparkleDot = (delay: string, top: string, left: string) => css`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${loveTheme.colors.accent};
  top: ${top};
  left: ${left};
  animation: ${sparkle} 2s infinite ease-out;
  animation-delay: ${delay};
  opacity: 0;
`;

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({ message = "Loading love letters..." }: LoadingStateProps) => {
  return (
    <div css={containerStyle} aria-label="Loading" role="status">
      {/* Sparkle dots */}
      <div css={sparkleDotsContainer}>
        <div css={sparkleDot('0s', '25%', '30%')}></div>
        <div css={sparkleDot('0.3s', '40%', '65%')}></div>
        <div css={sparkleDot('0.6s', '60%', '35%')}></div>
        <div css={sparkleDot('0.9s', '30%', '70%')}></div>
        <div css={sparkleDot('1.2s', '70%', '50%')}></div>
        <div css={sparkleDot('1.5s', '50%', '25%')}></div>
      </div>
      
      {/* Animated heart */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        css={heartStyle}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={loveTheme.colors.primary} />
            <stop offset="100%" stopColor={loveTheme.colors.primaryDark || '#c94e6b'} />
          </linearGradient>
        </defs>
        <rect width="256" height="256" fill="none" />
        <path
          d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"
          fill="url(#heartGradient)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
          stroke="#ffffff"
        />
      </svg>
      
      {/* Loading message */}
      <div css={textStyle}>{message}</div>
    </div>
  );
};

export default LoadingState;