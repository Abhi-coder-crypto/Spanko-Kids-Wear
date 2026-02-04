import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

// Fetch all categories
export function useCategories() {
  return useQuery({
    queryKey: [api.categories.list.path],
    queryFn: async () => {
      const res = await fetch(api.categories.list.path);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return api.categories.list.responses[200].parse(await res.json());
    },
  });
}

// Fetch products with filters
export function useProducts(filters?: {
  category?: string;
  isNew?: boolean;
  isTrending?: boolean;
  hasDeal?: boolean;
}) {
  // Convert boolean filters to string "true" if present, as expected by query params often
  const queryParams: Record<string, string> = {};
  if (filters?.category) queryParams.category = filters.category;
  if (filters?.isNew) queryParams.isNew = "true";
  if (filters?.isTrending) queryParams.isTrending = "true";
  if (filters?.hasDeal) queryParams.hasDeal = "true";

  const url = buildUrl(api.products.list.path);
  // buildUrl handles path params, we need to append query string manually if using fetch directly
  // or rely on a helper. Here we'll just construct the URL object.
  const fetchUrl = new URL(url, window.location.origin);
  Object.entries(queryParams).forEach(([k, v]) => fetchUrl.searchParams.append(k, v));

  return useQuery({
    queryKey: [api.products.list.path, filters],
    queryFn: async () => {
      const res = await fetch(fetchUrl.toString());
      if (!res.ok) throw new Error("Failed to fetch products");
      return api.products.list.responses[200].parse(await res.json());
    },
  });
}

// Fetch single product
export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      return api.products.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
