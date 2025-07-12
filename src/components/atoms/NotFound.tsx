"use client";

import React from "react";
import styled from "styled-components";
import { SearchX } from "lucide-react";
import { useTranslation } from "next-i18next";

const Wrapper = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.background.secondary};
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  svg {
    width: 48px;
    height: 48px;
    stroke: ${({ theme }) => theme.text};
    opacity: 0.7;
  }
`;

const NotFoundMessage = () => {
  const { t } = useTranslation("common");

  return (
    <Wrapper>
      <IconWrapper>
        <SearchX />
      </IconWrapper>
      {t("no_products_found")}
    </Wrapper>
  );
};

export default NotFoundMessage;
