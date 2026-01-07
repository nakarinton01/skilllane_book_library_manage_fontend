import { useMutation, useQuery } from "react-query";

import { getBookList, getBookDetail, updateBook, createBook } from "services/BookService";

export function useGetBookList() {
  const {
    data: bookList,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery(["book-list"], async () => await getBookList());

  return {
    bookList,
    isLoading,
    refetch,
    isSuccess,
  };
}

export function useGetBookDetail(id: number) {
  const {
    data: bookDetail,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery(["book-detail-id"], async () => await getBookDetail(id), {
    enabled: !!id,
    cacheTime: 0,
  });

  return {
    bookDetail,
    isLoading,
    refetch,
    isSuccess,
  };
}


export function useCreateBook() {
  const {
    mutateAsync: create,
    isLoading: createBookLoading,
    isSuccess,
  } = useMutation(({ form }: any) => createBook(form), {});
  async function submitCreateBook(form: any) {
    const data = await create({ form });
    return data;
  }
  return {
    submitCreateBook,
    createBookLoading,
    isSuccess,
  };
}


export function useUpdateBook(id: number) {
  const {
    mutateAsync: update,
    isLoading: createBookLoading,
    isSuccess,
  } = useMutation(({ form }: any) => updateBook(id, form), {});
  async function submitUpdateBook(form: any) {
    const data = await update({ form });
    return data;
  }
  return {
    submitUpdateBook,
    createBookLoading,
    isSuccess,
  };
}
