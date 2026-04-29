export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "https://api.mitranesia.id";

export interface ClientMerchantPackage {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ClientMerchant {
  id: string;
  name: string;
  slug: string;
  category: string;
  logoUrl: string;
  bepMonths: number;
  isTopMerchant?: boolean;
  isOfficialPartner?: boolean;
  rating?: number;
  type: string;
  images?: Array<{ id: string; label?: string | null; url: string }>;
  packages: ClientMerchantPackage[];
  minPrice: number;
  maxPrice: number;
}

export interface ClientInsightArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  readTime: string;
  content: string[];
}

export interface ClientCarouselSlide {
  id: string;
  title: string;
  image: string;
  tag: string;
  icon: string;
  highlight: string;
  description: string;
  color: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ClientMerchantFilters {
  categories: string[];
  types: string[];
  minPrice: number;
  maxPrice: number;
}

export interface ClientHomeResponse {
  carouselSlides: ClientCarouselSlide[];
  topMerchants: ClientMerchant[];
  recommendedMerchants: ClientMerchant[];
  otherMerchants: ClientMerchant[];
  featuredInsight: ClientInsightArticle | null;
  recentInsights: ClientInsightArticle[];
  merchantFilters: ClientMerchantFilters;
}

export interface ClientMerchantListResponse {
  data: ClientMerchant[];
  meta: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
  filters: ClientMerchantFilters;
}

export interface ClientAuthUser {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientAuthResponse {
  access_token: string;
  token_type: string;
  user: ClientAuthUser;
}

export interface DetailResponse<T> {
  data: T;
}

function buildHeaders(token?: string, hasBody = false) {
  const headers: Record<string, string> = {};
  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export function buildApiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildApiUrl(path), init);
  if (!response.ok) {
    const text = (await response.text()) || response.statusText;
    throw new Error(text);
  }
  return response.json() as Promise<T>;
}

export async function postJson<T>(path: string, body: unknown, token?: string, method = "POST"): Promise<T> {
  return fetchJson<T>(path, {
    method,
    headers: buildHeaders(token, true),
    body: JSON.stringify(body),
  });
}
