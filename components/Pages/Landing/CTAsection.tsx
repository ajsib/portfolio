/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const ctaSectionStyles = css`
  padding: 60px 20px;
  text-align: center;
  border-top: 1px solid var(--color-border);
  align-items: center;


  h2 {
    font-size: 28px;
    font-family: 'Merriweather', serif;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    font-family: 'Inter', sans-serif;
    color: var(--color-text);
    margin-bottom: 30px;
    line-height: 1.6;
  }

  .cta-button {
    display: inline-block;
    padding: 12px 24px;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    color: #fff;
    background-color: var(--color-primary);
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease, transform 0.2s ease;
    border-radius: 0; /* No rounded corners for a professional look */

    &:hover {
      background-color: var(--color-link);
      transform: scale(1.05);
    }

    &:focus {
      outline: 2px solid var(--color-primary-hover);
      outline-offset: 4px;
    }
  }

  .highlight {
    display: inline-block;
    margin-top: 20px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    color: var(--color-muted);
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .cta-button {
      width: 100%;
      padding: 15px;
    }
  }
`;

const CallToAction = () => {
  const handleHighlight = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const emailLink = event.currentTarget;
    emailLink.classList.add('highlighted');
    setTimeout(() => emailLink.classList.remove('highlighted'), 2000);
    window.location.href = emailLink.href; // Proceed to mailto link
  };

  return (
    <section css={ctaSectionStyles}>
      <h2>Let&apos;s Build Something Together</h2>
      <p>
        Whether you&apos;re looking for a technical leader, a solution architect, or a collaborator to bring your vision to life, I&apos;m here to help. Let&apos;s connect and make it happen.
      </p>
      <a
        href="mailto:contact@ajsibley.com?subject=Let's%20Collaborate!"
        className="cta-button"
        onClick={handleHighlight}
      >
        Get in Touch
      </a>
    </section>
  );
};

export default CallToAction;
