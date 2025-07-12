"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import Button from "../../atoms/Button";
import { Formik, Form, Field, useFormikContext } from "formik";
import { useEffect } from "react";
import { onlyNumberReplace } from "@/lib/utils";
import { useTranslation } from "next-i18next";

type Props = {
  initialSearch: string;
  sort: string;
  category: string;
  categories: string[];
  minPrice: string;
  maxPrice: string;
};

const Wrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const StyledInput = styled.input`
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.input.border};
  font-size: 0.95rem;
  background: ${({ theme }) => theme.input.background};
  color: ${({ theme }) => theme.input.text};
  width: 100%;

  @media (min-width: 768px) {
    width: 25%;
  }
`;

const StyledSelect = styled.select`
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.input.border};
  font-size: 0.95rem;
  background: ${({ theme }) => theme.input.background};
  color: ${({ theme }) => theme.input.text};
  width: 100%;

  @media (min-width: 768px) {
    width: 20%;
  }
`;

function AutoRedirect({ router }: { router: any }) {
  const { values } = useFormikContext<any>();

  useEffect(() => {
    const params: Record<string, string> = {
      page: "1",
      search: values.search,
      sort: values.sort,
      category: values.category,
    };

    if (values.minPrice) params.minPrice = values.minPrice;
    if (values.maxPrice) params.maxPrice = values.maxPrice;

    const query = new URLSearchParams(params).toString();
    router.push(`/products?${query}`);
  }, [values.sort, values.category]);

  return null;
}

export default function SearchAndFilterBar({
  initialSearch,
  sort,
  category,
  categories,
  minPrice,
  maxPrice,
}: Props) {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <Formik
      initialValues={{
        search: initialSearch,
        sort,
        category,
        minPrice,
        maxPrice,
      }}
      onSubmit={(values) => {
        const params: Record<string, string> = {
          page: "1",
          sort: values.sort,
          category: values.category,
          search: values.search,
        };

        if (values.minPrice) params.minPrice = values.minPrice;
        if (values.maxPrice) params.maxPrice = values.maxPrice;

        const query = new URLSearchParams(params).toString();
        router.push(`/products?${query}`);
      }}
    >
      {({ values, setFieldValue, resetForm }) => (
        <>
          <AutoRedirect router={router} />
          <Wrapper>
            <Field
              as={StyledInput}
              name="search"
              placeholder={t("search.searchPlaceholder")}
            />
            <Field
              as={StyledInput}
              name="minPrice"
              placeholder={t("search.minPrice")}
              value={values.minPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue("minPrice", onlyNumberReplace(e.target.value))
              }
            />
            <Field
              as={StyledInput}
              name="maxPrice"
              placeholder={t("search.maxPrice")}
              value={values.maxPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue("maxPrice", onlyNumberReplace(e.target.value))
              }
            />
            <Field as={StyledSelect} name="sort">
              <option value="asc">{t("search.sortAsc")}</option>
              <option value="desc">{t("search.sortDesc")}</option>
            </Field>
            <Field as={StyledSelect} name="category">
              <option value="">{t("search.allCategories")}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Field>
            <Button type="submit">{t("search.searchBtn")}</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                resetForm();
                router.push("/products");
              }}
            >
              {t("search.clearBtn")}
            </Button>
          </Wrapper>
        </>
      )}
    </Formik>
  );
}
