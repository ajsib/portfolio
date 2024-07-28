/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from 'react';
import CaretDown from '@/modules/UI/icons/CaretDown';
import Video from "./components/Video";

const bannerStyle = css`
  position: relative;
  height: 300vh;
  overflow: hidden;
`;

const videoStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const overlayStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  text-align: center;
`;

const textStyle = (isFadingOut: boolean, text: string) => css`
  color: #ddd;
  text-shadow: 0 4px black;
  animation: ${isFadingOut ? fadeOut : fadeIn} 500ms forwards;
  word-spacing: 1rem;
  ${text === "Developer & Innovator" && css`
    font-size: 2rem;
    font-weight: 500;
    text-transform: uppercase;
  `}
`;

const iconStyle = (isFadingOut: boolean) => css`
  position: fixed;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
  animation: ${isFadingOut ? fadeOut : fadeIn} 500ms forwards;
`;

const WelcomeBanner = () => {
  const [text, setText] = useState("Aidan Sibley");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [nextText, setNextText] = useState("Aidan Sibley");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight / 100;

      let newText = "Aidan Sibley";
      if (scrollY > 200 * vh) {
        newText = "";
      } else if (scrollY > 75 * vh) {
        newText = "Developer & Innovator";
      }

      if (newText !== nextText) {
        setIsFadingOut(true);
        setNextText(newText);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nextText]);

  useEffect(() => {
    if (isFadingOut) {
      const timer = setTimeout(() => {
        setText(nextText);
        setIsFadingOut(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isFadingOut, nextText]);

  return (
    <div css={bannerStyle}>
      <Video />
      <div css={overlayStyle}>
        <h1 css={textStyle(isFadingOut, text)}>{text}</h1>
      </div>
      <div css={iconStyle(nextText === "")}>
        <CaretDown />
      </div>
    </div>
  );
};

export default WelcomeBanner;
