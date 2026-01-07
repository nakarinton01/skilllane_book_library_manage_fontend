import type { BaseQueryParams } from "services/HttpService";

export type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publication_year: number;
  image: string | null;
  created_at: Date;
  updated_at: Date;
};

type searchQuery = {
  search?: string;
};

export type BookListQueryParams = BaseQueryParams & searchQuery;
