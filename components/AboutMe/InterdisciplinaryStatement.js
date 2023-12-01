import React from 'react';
import styled from '@emotion/styled';

const Statement = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #FFF0CE;
  color: #0C356A;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
`;

const CreativeStatement = () => (
  <Statement>
    Creative Interdisciplinary Passion becomes <b>Data-Driven</ b> Full-Stack <b>Development</b>.
  </Statement>
);

export default CreativeStatement;
