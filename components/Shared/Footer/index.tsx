/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Logo from '@/components/UI/icons/logo';
import { DESKTOP_MENU_WIDTH } from '@/components/Shared/Header/styles';

const footerStyles = (isMenuOpen: boolean, isMobile: boolean) => css`
  position: relative;
//   background-color: var(--color-component-bg);
  color: var(--color-text);
  padding: 60px 20px;
  margin-top: 4rem;
  margin-left: 120px;
  margin-right: 120px;
  padding-left: ${isMenuOpen && !isMobile ? `${(DESKTOP_MENU_WIDTH) / 2}px` : '0px'};
  display: flex;
  flex-direction: column;
  gap: 40px;
  transition: padding-left 0.2s ease-out;

  .footer-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  .footer-column {
    h3 {
      font-size: 18px;
      font-family: 'Merriweather', serif;
      font-weight: 700;
      margin-bottom: 20px;
      color: var(--color-primary);
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 12px;

        a {
          text-decoration: none;
          font-size: 16px;
          font-family: 'Inter', sans-serif;
          color: var(--color-text);
          transition: color 0.3s ease;

          &:hover {
            color: var(--color-link);
          }
        }
      }
    }
  }

  .social-links {
    display: flex;
    gap: 20px;

    a {
      font-size: 18px;
      color: var(--color-text);
      transition: color 0.3s ease;

      &:hover {
        color: var(--color-link);
      }
    }
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--color-border);
    padding-top: 20px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 10px;
    }

    .copyright {
      font-size: 14px;
      color: var(--color-muted);
    }
  }

  .watermark-container {
    position: absolute;
    top: -100px; /* Slightly overflowing above the footer */
    right: -100px; /* Slightly overflowing to the right */
    width: 450px; /* Larger size for impactful appearance */
    height: 450px;
    pointer-events: none; /* Ensures it doesn't interfere with clicks */
    z-index: 0;
    opacity: 0.1;

    svg {
      width: 100%;
      height: 100%;
      fill: var(--color-alt-bg);
    }

    @media (max-width: 768px) {
      display: none; /* Hide watermark on small screens */
    }
  }
`;

const Footer = ({ isMenuOpen, isMobile }: { isMenuOpen: boolean; isMobile: boolean }) => {
  return (
    <footer css={footerStyles(isMenuOpen, isMobile)}>
      {/* Watermark Logo */}
      <div className="watermark-container">
        <Logo />
      </div>

      {/* Main Footer Content */}
      <div className="footer-grid">
        <div className="footer-column">
          <h3>Work</h3>
          <ul>
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/products">Flagship Products</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Studio</h3>
          <ul>
            <li><a href="/studio">Explore the Studio</a></li>
            <li><a href="/studio/tools">Creative Tools</a></li>
            <li><a href="/studio/ideas">Imaginative Workflows</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Insights</h3>
          <ul>
            <li><a href="/insights">Blog</a></li>
            <li><a href="/insights/tutorials">Tutorials</a></li>
            <li><a href="/insights/thoughts">Thought Leadership</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Connect</h3>
          <ul>
            <li><a href="/connect">Get in Touch</a></li>
            <li><a href="/connect/services">Consulting Services</a></li>
            <li><a href="/connect/partnerships">Partnerships</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <div className="copyright">
          © {new Date().getFullYear()} Aidan Sibley. All Rights Reserved.
        </div>
        <div className="social-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
