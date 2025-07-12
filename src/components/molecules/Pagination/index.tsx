"use client";

import styled from "styled-components";
import Link from "next/link";

const PaginationWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: end;
`;

const PageLink = styled(Link)<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.pagination.border};
  border-radius: 6px;
  background: ${({ $active, theme }) =>
    $active ? theme.pagination.activeBg : theme.pagination.inactiveBg};
  color: ${({ $active, theme }) =>
    $active ? theme.pagination.activeText : theme.pagination.inactiveText};
  text-decoration: none;
`;

type Props = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationWrapper>
      {pages.map((page) => (
        <PageLink
          key={page}
          href={`${baseUrl}&page=${page}`}
          $active={page === currentPage}
        >
          {page}
        </PageLink>
      ))}
    </PaginationWrapper>
  );
}
