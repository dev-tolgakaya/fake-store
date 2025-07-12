"use client";

import Link from "next/link";
import styled from "styled-components";

const StyledLogo = styled(Link)`
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.logoColor};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.logoHover};
  }
`;

export default function Logo() {
  return <StyledLogo href="/">FakeStore</StyledLogo>;
}
