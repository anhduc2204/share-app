import { useQuery, useMutation, useQueryClient } from "react-query";
import BookService from "../service/BookService";

type SortMode = 'ASC' | 'DESC' | string | number | boolean;

interface FilterItem {
  sort_by: string;
  sort_mode: SortMode;
}

interface FilterArrayItem {
  sort_by: string;
  sort_mode: SortMode[];
}

interface FilterParams {
  filterSort: FilterItem[];
  filterValue: FilterItem[];
  filterValueArray: FilterArrayItem[];
  page: number;
  page_size: number;
}

type ChaptersListParams = {
  book_id : Number,
  page: Number,
  page_size?: Number,
  sort_by?: string,
  sort_mode?: string
};

export enum ServerStateKeysEnum {
  login = 'loginGoogle',
  getDashboard= 'getDashboard',
  getChaptersList = 'getChaptersList',
  getChapterContentById = 'getChapterContentById',
  getBookByFriendly = 'getBookByFriendly',
  addBookshelf = 'addBookshelf',
  getBookshelf = 'getBookshelf',
  deleteBookshelfById = 'deleteBookshelfById',
  getListBookSearch = 'getListBookSearch',
  getCategoryList = 'getCategoryList',
  getHashtagList = 'getHashtagList',
  addBookHistory = 'addBookHistory',
  getBooksHistory = 'getBooksHistory',
  deleteBookHistoryById = 'deleteBookHistoryById'
}

export const useGetDashboard = () => {
  return useQuery([ServerStateKeysEnum.getChaptersList], () => BookService.getDashboard());
};

export const useGetChaptersList = (params: ChaptersListParams) => {
  params.page_size = params.page_size ? params.page_size : 10
  params.sort_by = params.sort_by ? params.sort_by : 'updated_at'
  params.sort_mode = params.sort_mode ? params.sort_mode : 'DESC'
  return useQuery(
    [ServerStateKeysEnum.getChaptersList, params],
    () => BookService.getChapterList(params),
    {
      enabled: params.book_id != null,
    }
  );
};

export const useGetChapterContentById = (params: {friendly?: string, chapter_id?: string}) => {
  return useQuery(
    [ServerStateKeysEnum.getChapterContentById, params],
    () => BookService.getChapterContentById(params),
    {
      enabled: params.friendly != null && params.chapter_id != null,
    }
  );
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => BookService.login(data), {
    onSuccess: async () => {
      queryClient.invalidateQueries(ServerStateKeysEnum.login);
    },
  });
};

export const useGetBookByFriendly = (params: {friendly: string}, withAuth?: boolean) => {
  return useQuery(
    [ServerStateKeysEnum.getBookByFriendly, params, withAuth],
    () => BookService.getBookByFriendly(params, withAuth),
    {
      enabled: !!params.friendly 
    }
  );
};

// bookshelf
export const useAddBookshelf = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => BookService.addBookshelf(data), {
    onSuccess: async () => {
      queryClient.invalidateQueries(ServerStateKeysEnum.addBookshelf);
    },
  });
};

export const useGetBookshelf = (params:{page: Number, page_size: Number}) => {
  return useQuery(
    [ServerStateKeysEnum.getBookshelf, params],
    () => BookService.getBookshelf(params),
    {
      enabled: params != null
    }
  );
};

export const useDeleteBookshelfById = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => BookService.deleteBookshelfById(data), {
    onSuccess: async () => {
      queryClient.invalidateQueries(ServerStateKeysEnum.deleteBookshelfById);
    },
  });
};
//---

// history
export const useAddBookHistory = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => BookService.addBookHistory(data), {
    onSuccess: async () => {
      queryClient.invalidateQueries(ServerStateKeysEnum.addBookHistory);
    },
  });
};
export const useGetBooksHistory = (params:{page: Number, page_size: Number}) => {
  return useQuery(
    [ServerStateKeysEnum.getBooksHistory, params],
    () => BookService.getBooksHistory(params),
    {
      enabled: params != null
    }
  );
};
export const useDeleteBookHistoryById = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => BookService.deleteBookHistoryById(data), {
    onSuccess: async () => {
      queryClient.invalidateQueries(ServerStateKeysEnum.deleteBookHistoryById);
    },
  });
};
// ---

export const useGetListBookSearch = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => BookService.getListBookSearch(data), {
    onSuccess: async () => {
      queryClient.invalidateQueries(ServerStateKeysEnum.getListBookSearch);
    },
  });
};
export const useGetListBookFilter = (params: FilterParams) => {
  return useQuery(
    [ServerStateKeysEnum.getListBookSearch, params],
    () => BookService.getListBookSearch(params)
  );
};

export const useGetCategoryList = (params:{page: Number, page_size: Number}) => {
  return useQuery(
    [ServerStateKeysEnum.getCategoryList, params],
    () => BookService.getCategoryList(params),
    {
      enabled: params.page != null && params.page_size != null,
    }
  );
};

export const useGetHashtagList = (params:{page: Number, page_size: Number}) => {
  return useQuery(
    [ServerStateKeysEnum.getHashtagList, params],
    () => BookService.getHashtagList(params),
    {
      enabled: params.page != null && params.page_size != null,
    }
  );
};