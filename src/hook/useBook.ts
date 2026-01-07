import { useMutation, useQuery } from "react-query";

import {
  getBookList,
  getBookDetail,
  updateBook,
  createBook,
  borrowBook,
  returnBook,
} from "services/BookService";
import type { BookListQueryParams } from "services/BookService/Models";
import { successAlert } from "utils/dialogs";

export function useGetBookList(query?: BookListQueryParams) {
  const {
    data: bookList,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery(["book-list"], async () => await getBookList(query));

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
  } = useMutation(({ form }: any) => createBook(form), {
    onSuccess: async () => {
      await successAlert({
        title: "Success",
        text: "Your information has been saved",
      });
    },
  });
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
  } = useMutation(({ form }: any) => updateBook(id, form), {
    onSuccess: async () => {
      await successAlert({
        title: "Success",
        text: "Your information has been saved",
      });
    },
  });
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

export function useBorrowBook() {
  const {
    mutateAsync: borrow,
    isLoading: borroweBookLoading,
    isSuccess,
  } = useMutation(({ id }: any) => borrowBook(id), {
    onSuccess: async () => {
      await successAlert({
        title: "Success",
        text: "This Book is Borrow",
      });
    },
  });
  async function submitBorrowBook(id: number) {
    const data = await borrow({ id });
    return data;
  }
  return {
    submitBorrowBook,
    borroweBookLoading,
    isSuccess,
  };
}

export function useReturnBook() {
  const {
    mutateAsync: returnThisBook,
    isLoading: returnBookLoading,
    isSuccess,
  } = useMutation(({ id }: any) => returnBook(id), {
    onSuccess: async () => {
      await successAlert({
        title: "Success",
        text: "Your Book is Rerturn",
      });
    },
  });
  async function submitReturnBook(id: number) {
    const data = await returnThisBook({ id });
    return data;
  }
  return {
    submitReturnBook,
    returnBookLoading,
    isSuccess,
  };
}
