/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const headlineFontSize = '36px';
const subHeadlineFontSize = '22px';
const paragraphFontSize = '16px';
const mainTitleFontSize = '32px';
const subTitleFontSize = '20px';
const quoteFontSize = '24px';
const highlightedTextFontSize = '18px';

export const heroSectionStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
  padding: 80px 20px;
  background-color: var(--color-component-bg);
  text-align: left;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px 20px;
  }

  .image-container {
    flex: 1;
    display: flex;
    justify-content: center; /* Center image horizontally */
    align-items: center; /* Align image vertically */
    margin-bottom: 20px;

    img {
      border-radius: 50%; /* Circular image */
    }

    @media (max-width: 768px) {
      justify-content: center; /* Ensure image stays centered on smaller screens */
    }
  }

  .text-container {
    flex: 1;
    max-width: 680px; /* Optional: Limit text width for readability */
    padding-left: 40px;

    @media (max-width: 768px) {
      padding-left: 0;
      text-align: center; /* Center-align text for mobile */
    }

    h1 {
      font-size: ${headlineFontSize};
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--color-primary);
      // font-family: 'Inter', sans-serif;
      font-family: 'Merriweather', serif;

      @media (max-width: 768px) {
        font-size: 30px; /* Slightly smaller headline for mobile */
      }
    }

    h2 {
      font-size: ${subHeadlineFontSize};
      font-weight: 400;
      margin-bottom: 24px;
      color: var(--color-secondary);
      font-family: 'Inter', sans-serif;

      @media (max-width: 768px) {
        font-size: 22px;
      }
    }

    p {
      font-size: ${paragraphFontSize};
      text-align: left;
      line-height: 1.5;
      color: var(--color-text);
      font-family: 'Source Sans Pro', sans-serif;

      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
`;

export const aboutMeSectionStyles = css`
  padding: 60px 20px;
  background-color: var(--color-component-bg);

  .title {
    font-size: ${mainTitleFontSize};
    font-family: 'Merriweather', serif;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 30px;
    text-align: left;

    @media (max-width: 768px) {
      text-align: center; /* Center-align title for smaller screens */
      font-size: 28px; /* Slightly smaller font size */
    }
  }

  .quote {
    font-size: ${quoteFontSize};
    font-family: 'Inter', sans-serif;
    font-style: italic;
    font-weight: 400;
    color: var(--color-secondary);
    text-align: center;
    margin: 40px 0;

    @media (max-width: 768px) {
      font-size: 20px;
      margin: 30px 0;
    }
  }

  .paragraph {
    font-size: ${paragraphFontSize};
    font-family: 'Source Sans Pro', sans-serif;
    color: var(--color-text);
    line-height: 1.6;
    margin-bottom: 20px;
    text-align: justify;

    @media (max-width: 768px) {
      font-size: 14px;
      text-align: left; /* Adjust alignment for smaller screens */
    }
  }

  .section-title {
    font-size: ${subTitleFontSize};
    font-family: 'Merriweather', serif;
    font-weight: 700;
    color: var(--color-primary);
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: left;

    @media (max-width: 768px) {
      font-size: 18px;
      text-align: center;
    }
  }

.highlight-box {
  display: flex; /* Enables flexbox for vertical centering */
  align-items: center; /* Vertically centers content */
  justify-content: center; /* Horizontally centers content (optional, for complete centering) */
  background-color: var(--color-background);
  padding: 20px;
  border-left: 4px solid var(--color-primary);
  margin-bottom: 30px;

  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 20px;
  }
}

.highlighted-text {
  font-size: ${highlightedTextFontSize};
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: var(--color-primary);
  text-align: left; /* Center-align text */
  margin: 0; /* Reset margin for better alignment */

  @media (max-width: 768px) {
    font-size: 16px;
  }
}


  .asymmetric-layout {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column; /* Stack text blocks vertically */
    }
  }

  .text-block {
    flex: 1 1 45%;
    margin-bottom: 30px;

    &:nth-of-type(odd) {
      margin-right: 5%;
    }

    @media (max-width: 768px) {
      flex: 1 1 100%; /* Full width for smaller screens */
      margin-right: 0; /* Remove side margins */
    }
  }
`;

export const timelineContainerStyles = css`
  position: relative;
  padding: 0 20px 60px;
  background-color: var(--color-component-bg);
  display: flex;
  justify-content: center;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background-color: var(--color-border);

    @media (max-width: 700px) {
      /* On mobile, shift the line to the left for a unified, simpler layout */
      left: 30px;
      transform: none;
    }
  }
`;


export const servicesSectionStyles = css`
  padding: 80px 20px;
  background-color: var(--color-component-bg);
  text-align: center;

  h2 {
    font-size: 32px;
    font-family: 'Merriweather', serif;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 30px;
  }

  p {
    font-size: 18px;
    font-family: 'Inter', sans-serif;
    color: var(--color-text);
    margin-bottom: 60px;
    line-height: 1.6;
  }

  .services-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;

    .service-card {
      flex: 0 1 calc(33.333% - 20px);
      max-width: 300px;
      padding: 20px;
      border: 1px solid var(--color-border);
      text-align: left;
      position: relative;
      transition: box-shadow 0.3s ease, max-height 0.3s ease;
      min-height: 300px;
      max-height: 1000px;
      overflow: hidden;
      cursor: pointer;

    //   &:hover {
    //     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    //   }

      .icon {
        font-size: 36px;
        color: var(--color-primary);
        margin-bottom: 15px;
      }

      h3 {
        font-size: 20px;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        margin-bottom: 15px;
      }

      p {
        font-size: 16px;
        line-height: 1.6;
        color: var(--color-secondary);
        margin-bottom: 40px;
      }

      .expand-toggle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-family: 'Inter', sans-serif;
        color: var(--color-primary);
        margin-top: auto;
        position: absolute;
        bottom: 20px;
        left: 20px;
        right: 20px;
        pointer-events: none;

        span {
          pointer-events: auto;
          transition: color 0.3s ease;
        }

        svg {
          transition: transform 0.3s ease;
        }

        &.expanded svg {
          transform: rotate(90deg);
        }
      }

      &:hover .expand-toggle span {
        text-decoration: underline;
      }

      .expanded-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease, opacity 0.3s ease;
        opacity: 0;

        &.visible {
          max-height: 400px; /* Adjust as needed */
          opacity: 1;
        }

        .divider {
          margin: 15px 0;
          border-top: 1px solid var(--color-border);
          opacity: 0.5;
        }

        p {
          margin-top: 15px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: var(--color-secondary);
          line-height: 1.5;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .services-grid {
      flex-direction: column;
      align-items: center;

      .service-card {
        flex: 0 1 100%;
        max-width: 100%;
      }
    }
  }
`;


export const ctaSectionStyles = css`
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