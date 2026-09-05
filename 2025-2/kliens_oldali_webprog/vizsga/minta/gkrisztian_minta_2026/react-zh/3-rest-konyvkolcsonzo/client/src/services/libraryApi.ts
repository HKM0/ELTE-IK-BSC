import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type Borrow, type BorrowForm, type ApiTag, type Book, type ListResponse } from '../entities';

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3032' }),
  tagTypes: ['Books', 'Borrows'] as ApiTag[],
  endpoints: (builder) => ({
    // GET = builder.query | POST, PATCH: builder.mutation
    getBooks: builder.query<ListResponse<Book>, void>({
      // GET http://localhost:3032/book
      query: () => "/books",
      providesTags: ["Books"]
    }),

    // POST /books/:id/borrows
    borrowBook: builder.mutation<Borrow, {bookId: number; form: BorrowForm}>({
      query: ({ bookId, form}) => ({
        url: `/books/${bookId}/borrows`,
        method: "POST",
        body: form
      }),
      invalidatesTags: ["Books", "Borrows"]
    }),

    // GET /borrows
    getBorrows: builder.query<ListResponse<Borrow>, void>({
      query: () => '/borrows',
      providesTags: ["Borrows"]
    }),

    returnBook: builder.mutation<Borrow, { borrowId: number, returnedAt: string}>({
      query: ({ borrowId, returnedAt}) => ({
        url: `/borrows/${borrowId}`,
        method: "PATCH",
        body: { returnedAt }
      }),
      invalidatesTags: ["Books", "Borrows"]
    })

  }),
});

// use<getBooks>Query
export const { useGetBooksQuery, useBorrowBookMutation, useGetBorrowsQuery, useReturnBookMutation } = libraryApi;