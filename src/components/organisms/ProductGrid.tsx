"use client";

import styled from "styled-components";

const Grid = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.background.secondary};
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 0.5rem;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default Grid;
