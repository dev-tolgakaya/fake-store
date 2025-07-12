"use client";

import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const LanguageDropdown = styled.div`
  position: relative;
  cursor: pointer;
`;

const LanguageButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.input.border};
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: ${({ theme }) => theme.input.background};
  user-select: none;
  color: ${({ theme }) => theme.input.text};

  &:hover {
    border-color: ${({ theme }) => theme.secondaryText};
  }
`;

const LanguageList = styled.ul<{ visible: boolean }>`
  position: absolute;
  top: 110%;
  left: 0;
  background: ${({ theme }) => theme.input.background};
  border: 1px solid ${({ theme }) => theme.input.border};
  border-radius: 6px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  list-style: none;
  padding: 0.5rem 0;
  min-width: 120px;
  display: ${({ visible }) => (visible ? "block" : "none")};
  z-index: 999;
`;

const LanguageItem = styled.li`
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.input.text};

  &:hover {
    background-color: ${({ theme }) => theme.secondaryBgHover};
  }
`;

const languages = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const handleSelectLanguage = (langCode: string) => {
    setDropdownOpen(false);
    router.push(router.asPath, router.asPath, { locale: langCode });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <LanguageDropdown ref={dropdownRef}>
      <LanguageButton onClick={() => setDropdownOpen((prev) => !prev)}>
        <span>{currentLang.flag}</span>
        <span>{currentLang.label}</span>
      </LanguageButton>
      <LanguageList visible={dropdownOpen}>
        {languages.map((lang) => (
          <LanguageItem
            key={lang.code}
            onClick={() => handleSelectLanguage(lang.code)}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </LanguageItem>
        ))}
      </LanguageList>
    </LanguageDropdown>
  );
};

export default LanguageSelector;
