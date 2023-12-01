import React from 'react';
import styled from '@emotion/styled';

const Statement = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #0C356A;
  color: #FFF;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
`;

const LearningStatement = () => (
  <Statement>
    An eternal learner, connecting concepts across various domains.
  </Statement>
);

export default LearningStatement;
