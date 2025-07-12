"use client";

import styled from "styled-components";
import Logo from "@/components/atoms/Logo";
import CartBadge from "@/components/atoms/CardBadge";
import LanguageSelector from "@/components/atoms/LanguageSelector";
import ThemeToggleDropdown from "@/components/atoms/ThemeToggleDropdown";

const Wrapper = styled.header`
  width: 100%;
  padding: 1rem 2rem;
 background-color: ${({ theme }) => theme.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.productCard.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  position: relative;
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

type Props = {
  toggleTheme: () => void;
  isDarkMode: boolean;
};

const Header = ({ toggleTheme, isDarkMode }: Props) => {
  return (
    <Wrapper>
      <Logo />
      <RightSide>
        <LanguageSelector />
         <ThemeToggleDropdown
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
        <CartBadge />
      </RightSide>
    </Wrapper>
  );
};

export default Header;
