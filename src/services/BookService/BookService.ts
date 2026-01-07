import { HttpService, type APIResponse } from "../HttpService";
import type { Book, BookListQueryParams } from "./Models/Book";

export const getBookList = async (query?: BookListQueryParams) => {
  const { data } = await HttpService.get<Book[]>('books/', { params: query });
  return data;
};

export const getBookDetail = async (id: number) => {
  const { data } = await HttpService.get<Book>(`books/${id}`);
  return data;
};

export const createBook = async (form: Partial<Book>) => {
  const { data } = await HttpService.post('books/', form);
  return data;
};

export const updateBook = async (id: number, form: Partial<Book>) => {
  const { data } = await HttpService.put(`books/${id}`, form);
  return data;
};