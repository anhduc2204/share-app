import {useGetBookshelf, useGetBooksHistory } from "./book.hook";


export const useBookCaseData = (tabId: number) => {

  const {
    data,
    error,
    refetch,
    isFetching,
  } = 
    tabId === 0 ? useGetBookshelf({ page: 1, page_size: 1000 })
    : tabId === 1 ? useGetBooksHistory({ page: 1, page_size: 1000 }) : {};

  return {
    books: data?.data || null,
    error,
    refetch,
    isLoading: isFetching
  };
};
// export const useListBook = (tabId: number) => {

//   const {
//     data,
//     error,
//     refetch,
//     isFetching,
//   } = 
//     tabId === 0 ? useGetBookshelf({ page: 1, page_size: 1000 })
//     : tabId === 1 ? useGetBooksHistory({ page: 1, page_size: 1000 }) : {};

//   return {
//     books: data?.data || null,
//     error,
//     refetch,
//     isLoading: isFetching
//   };
// };