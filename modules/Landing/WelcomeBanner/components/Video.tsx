// @/modules/Landing/WelcomeBanner/components/Video.tsx
/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from 'react';
import { css } from "@emotion/react";

const videoStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startScrollTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const videoElement = videoRef.current;
      if (!videoElement) return;

      videoElement.currentTime = 0;  // Ensure we start at the beginning on each load
      videoElement.play();

      const autoPauseTime = setTimeout(() => {
        if (startScrollTimeRef.current === null) {  // Only pause if scrolling hasn't started
          videoElement.pause();
        }
      }, 2500);  // Pause at 2.5 seconds if no scroll has happened

      const handleScroll = () => {
        if (startScrollTimeRef.current === null) {
          startScrollTimeRef.current = videoElement.currentTime;
          videoElement.pause();
        }
        const scrollY = window.scrollY;
        const vh = window.innerHeight / 100;
        const maxScroll = 300 * vh;
        const scrollFraction = Math.min(scrollY / maxScroll, 1);

        if (!isNaN(videoElement.duration)) {
          const adjustedDuration = videoElement.duration - startScrollTimeRef.current;
          const targetTime = startScrollTimeRef.current + scrollFraction * adjustedDuration;
          videoElement.currentTime = Math.min(targetTime, videoElement.duration);
        }
      };

      window.addEventListener('scroll', handleScroll);

      fetch('/assets/head.mp4')
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          videoElement.src = url;
        });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(autoPauseTime);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    loadGSAP();
  }, []);

  return <video ref={videoRef} css={videoStyle} muted loop />;
};

export default Video;
