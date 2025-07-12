"use client";

import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

type Props = {
  toggleTheme: () => void;
  isDarkMode: boolean;
};

const DropdownWrapper = styled.div`
  position: relative;
  font-size: 0.9rem;
`;

const ToggleButton = styled.button`
  padding: 0.5rem 0.9rem;
  background: ${({ theme }) => theme.secondaryBg};
  color: ${({ theme }) => theme.tertiaryText};
  border: 1px solid ${({ theme }) => theme.secondaryBgHover};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.secondaryBgHover};
  }
`;

const Menu = styled.ul<{ visible: boolean }>`
  position: absolute;
  top: 110%;
  right: 0;
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.productCard.border};
  border-radius: 8px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  display: ${({ visible }) => (visible ? "block" : "none")};
  z-index: 99;
  min-width: 150px;
`;

const MenuItem = styled.li`
  padding: 0.6rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${({ theme }) => theme.text};
  transition: background 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryBgHover};
  }
`;

const ThemeToggleDropdown = ({ toggleTheme, isDarkMode }: Props) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownWrapper ref={dropdownRef}>
      <ToggleButton onClick={() => setOpen((prev) => !prev)}>
        {isDarkMode ? "🌙" : "🌞"}
      </ToggleButton>
      <Menu visible={open}>
        <MenuItem
          onClick={() => {
            if (isDarkMode) toggleTheme();
            setOpen(false);
          }}
        >
          🌞 Light Mode
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (!isDarkMode) toggleTheme();
            setOpen(false);
          }}
        >
          🌙 Dark Mode
        </MenuItem>
      </Menu>
    </DropdownWrapper>
  );
};

export default ThemeToggleDropdown;
