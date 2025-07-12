import { GetServerSideProps } from "next";
import ProductCard from "@/components/molecules/ProductCard";
import ProductGrid from "@/components/organisms/ProductGrid";
import SearchAndFilterBar from "@/components/molecules/SearchAndFilterBar";
import Pagination from "@/components/molecules/Pagination";
import api from "@/lib/api";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  buildQueryString,
  extractQueryFilters,
  filterAndSortProducts,
  paginate,
} from "@/lib/utils";
import NotFoundMessage from "@/components/atoms/NotFound";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: { rate: number };
  category: string;
};

type Props = {
  products: Product[];
  categories: string[];
  currentPage: number;
  totalPages: number;
  filters: {
    sort: string;
    category: string;
    search: string;
    minPrice: string;
    maxPrice: string;
  };
};

export default function ProductsPage({
  products,
  categories,
  currentPage,
  totalPages,
  filters,
}: Props) {
  const { sort, category, search, minPrice, maxPrice } = filters;

  const dynamicTitle = category
    ? `${category}  | FakeStore`
    : "Tüm Ürünler | FakeStore";

  return (
    <>
      <Head>
        <title>{dynamicTitle}</title>
        <meta property="og:title" content={dynamicTitle} />
      </Head>
      <div style={{ padding: "2rem" }}>
        <SearchAndFilterBar
          initialSearch={search}
          sort={sort}
          category={category}
          categories={categories}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
        {products.length === 0 ? (
          <NotFoundMessage />
        ) : (
          <ProductGrid>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                rating={product.rating.rate}
              />
            ))}
          </ProductGrid>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={buildQueryString({
            sort,
            category,
            search,
            minPrice,
            maxPrice,
          })}
        />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, locale = "tr" } = context;
  const filters = extractQueryFilters(query);
  const limit = 10;

  const { data: rawProducts } = await api.get<Product[]>("/products");

  const categories = Array.from(new Set(rawProducts.map((p) => p.category)));

  const filteredProducts = filterAndSortProducts(rawProducts, filters);
  const paginatedProducts = paginate(filteredProducts, filters.page, limit);

  if (paginatedProducts.length === 0 && filters.page !== 1) {
    return {
      redirect: {
        destination: "/products?page=1",
        permanent: false,
      },
    };
  }

  return {
    props: {
      products: paginatedProducts,
      categories,
      currentPage: filters.page,
      totalPages: Math.ceil(filteredProducts.length / limit),
      filters: {
        sort: filters.sort,
        category: filters.category,
        search: filters.search,
        minPrice: query.minPrice ?? "",
        maxPrice: query.maxPrice ?? "",
      },
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
