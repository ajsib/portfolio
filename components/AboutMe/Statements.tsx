import React from 'react';
import styled from '@emotion/styled';

const StatementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  color: #333; // Consistent color scheme

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

const Statement = styled.div`
  background-color: #f5f5f5; // Light gray background for statements
  padding: 10px;
  border-radius:
  5px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 1rem; // Consistent font size
  `;
  
  const Emphasis = styled.span `
    font-weight: bold;
  `;
  
  const Statements = () => (
  <StatementWrapper>
    <Statement>
    I am <Emphasis>Aidan Sibley</Emphasis>
    </Statement>
    <Statement>
    An eternal learner, connecting concepts across various domains.
    </Statement>
    <Statement>
    Creative Interdisciplinary Passion becomes <Emphasis>Data-Driven</Emphasis> Full-Stack <Emphasis>Development</Emphasis>.
    </Statement>
    <Statement>
    My analytical compass
    </Statement>
    <Statement>
    My digital canvas
    </Statement>
  </StatementWrapper>
  );
  
  export default Statements;