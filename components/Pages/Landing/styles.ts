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
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background-color: var(--bg-component);
  text-align: left;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px 20px;
  }

  .image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    img {
      border-radius: var(--radius-default);
    }

    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  .text-container {
    flex: 1;
    max-width: 680px;
    padding-left: 40px;

    @media (max-width: 768px) {
      padding-left: 0;
      text-align: center;
    }

    h1 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--color-primary);
      font-family: 'Merriweather', serif;

      @media (max-width: 768px) {
        font-size: 30px;
      }
    }

    h2 {
      font-size: 24px;
      font-weight: 400;
      margin-bottom: 24px;
      color: var(--color-secondary);
      font-family: 'Inter', sans-serif;

      @media (max-width: 768px) {
        font-size: 22px;
      }
    }

    p {
      font-size: 18px;
      line-height: 1.6;
      color: var(--text-T2);
      font-family: 'Source Sans Pro', sans-serif;

      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
`;


export const aboutMeSectionStyles = css`
  padding: 60px 20px;
  background-color: var(--bg-component);

  .title {
    font-size: 32px;
    font-family: 'Merriweather', serif;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 30px;
    text-align: left;

    @media (max-width: 768px) {
      text-align: center;
      font-size: 28px;
    }
  }

  .quote {
    font-size: 20px;
    font-family: 'Inter', sans-serif;
    font-style: italic;
    font-weight: 400;
    color: var(--color-secondary);
    text-align: center;
    margin: 40px 0;

    @media (max-width: 768px) {
      font-size: 18px;
      margin: 30px 0;
    }
  }

  .paragraph {
    font-size: 16px;
    font-family: 'Source Sans Pro', sans-serif;
    color: var(--text-T2);
    line-height: 1.6;
    margin-bottom: 20px;
    text-align: justify;

    @media (max-width: 768px) {
      font-size: 14px;
      text-align: left;
    }
  }

  .section-title {
    font-size: 24px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-B2);
    padding: 20px;
    border-left: 4px solid var(--color-primary);
    margin-bottom: 30px;

    @media (max-width: 768px) {
      padding: 15px;
      margin-bottom: 20px;
    }
  }

  .highlighted-text {
    font-size: 18px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    color: var(--color-primary);
    text-align: left;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  .asymmetric-layout {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .text-block {
    flex: 1 1 45%;
    margin-bottom: 30px;

    &:nth-of-type(odd) {
      margin-right: 5%;
    }

    @media (max-width: 768px) {
      flex: 1 1 100%;
      margin-right: 0;
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
  background-color: var(--bg-component);
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
    color: var(--text-T2);
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
      border: 1px solid var(--border-color);
      text-align: left;
      position: relative;
      transition: box-shadow 0.3s ease, max-height 0.3s ease;
      min-height: 300px;
      overflow: hidden;
      cursor: pointer;
      background-color: var(--bg-component);

      &:hover {
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
      }

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
        color: var(--text-T3);
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
          max-height: 400px;
          opacity: 1;
        }

        .divider {
          margin: 15px 0;
          border-top: 1px solid var(--border-color);
          opacity: 0.5;
        }

        p {
          margin-top: 15px;
          font-size: 14px;
          color: var(--text-T4);
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
