/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from "next/image";
import React from "react";

/**
 * BannerProps:
 * - folderName: The article folder name (to locate banner.jpg if it exists)
 * - title: Title of the article
 * - description: Short description or tagline
 * - hasBanner: Boolean indicating if banner.jpg was found
 */
interface BannerProps {
  folderName: string;
  title: string;
  description: string;
  hasBanner: boolean;
}

/* 
  1) Shared Container Styles
  - Position relative for overlay text
  - Height ensures enough space to display the banner or fallback
*/
const bannerContainer = css`
  user-select: none;
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* 
  2) Text Overlay
  - Positioned above the background
  - Styled for center alignment and readability
*/
const textOverlay = css`
  color: var(--text-T1);
  position: absolute;
  z-index: 2;
  margin-top: 2rem;
  text-align: center;
  color: #fff;
  padding: 1rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    font-weight: 800;
    margin: 0;
  }
`;

/* 
  3) Banner Image CSS
  - If banner.jpg exists, we display the image behind the overlay
  - Includes the gradient overlay
*/
const imageBackground = (folderName: string) => css`
  position: relative;
  width: 100%;
  height: 100%;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8) 0%, 
      rgba(0, 0, 0, 0.6) 30%, 
      rgba(0, 0, 0, 0.4) 100%  
    );
    z-index: 1;
  }
`;

/* 
  4) Two-Tone Fallback Background
  - Left is primary color, right is secondary color with a curve
*/
const fallbackBackground = css`
  width: 100%;
  height: 100%;
  background: var(--color-primary);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 70%; /* Portion of secondary color */
    height: 100%;
    background: var(--color-accent);

    /* Corporate curve effect */
    clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
  }
`;

export default function Banner({
  folderName,
  title,
  description,
  hasBanner,
}: BannerProps) {
  const bannerImageName = `${folderName.replace(/\//g, "-")}-banner.jpg`;
  console.log(bannerImageName)
  const imageUrl = `/calwc-esc/images/articles/${bannerImageName}`;

  return (
    <div css={bannerContainer}>
      {/* Text Overlay */}
      <div css={textOverlay}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      {hasBanner ? (
        /* If banner.jpg exists */
        <div css={imageBackground(folderName)}>
          <Image
            alt="Banner"
            src={imageUrl}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      ) : (
        /* Fallback Two-Tone Background */
        <div css={fallbackBackground} />
      )}
    </div>
  );
}
