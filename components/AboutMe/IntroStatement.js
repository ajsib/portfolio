// IntroStatement.tsx
import React from 'react';
import styled from '@emotion/styled';

const Statement = styled.div`
    font-family: 'Roboto', sans-serif;
    text-align: center;
    margin: 0;
    font-size: 2rem; // Large text for the introduction
    color: #0C356A; // Using the color from your palette

    @media (min-width: 768px) {
        text-align: left;
        font-size: 2.5rem; // Slightly larger text on bigger screens
    }
`;

const Emphasis = styled.span`
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: #0C356A; 
`;

const IntroStatement = () => (
  <Statement>
    I am <Emphasis>Aidan Sibley</Emphasis>
  </Statement>
);

export default IntroStatement;
