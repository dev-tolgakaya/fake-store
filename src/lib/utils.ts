type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: { rate: number };
  category: string;
};

export type Filters = {
  sort?: string;
  category?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
};

export const onlyNumberReplace = (value = ""): string => {
  return value.replace(/[^0-9]/g, "");
};

export function buildQueryString(filters: Filters): string {
  const params = new URLSearchParams();

  if (filters.sort) params.append("sort", filters.sort);
  if (filters.category) params.append("category", filters.category);
  if (filters.search) params.append("search", filters.search);
  if (filters.minPrice) params.append("minPrice", filters.minPrice);
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

  return `/products?${params.toString()}`;
}

export const extractQueryFilters = (query: any) => {
  return {
    page: Number(query.page ?? "1"),
    sort: (query.sort ?? "asc") as "asc" | "desc",
    category: (query.category ?? "") as string,
    search: (query.search ?? "").toString().toLowerCase(),
    minPrice: Number(query.minPrice ?? "0"),
    maxPrice: Number(query.maxPrice ?? "999999"),
  };
};

export const filterAndSortProducts = (
  products: Product[],
  { category, search, minPrice, maxPrice, sort }: ReturnType<typeof extractQueryFilters>
): Product[] => {
  let filtered = [...products];

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(search)
    );
  }

  filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  filtered.sort((a, b) =>
    sort === "asc" ? a.price - b.price : b.price - a.price
  );

  return filtered;
};

export const paginate = (products: Product[], page: number, limit: number) => {
  const start = (page - 1) * limit;
  return products.slice(start, start + limit);
};
