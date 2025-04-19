import BaseService from "./BaseService";
import * as db from "@app/storage/sqliteDbUtils";

class BookService extends BaseService {

  async login(params) {
    return this.post(`/api/v1/login-google`, params)
  }

  async getDashboard(params) {
    return this.get(`/api/v1/books/dashboard`)
  }

  // get chapter list
  async getChapterList(params) {
    return this.get(`/api/v1/chapters/list?page=${params.page}&page_size=${params.page_size}&sort_by=${params.sort_by}&sort_mode=${params.sort_mode}&book_id=${params.book_id}`)
  }

  async getChapterContentById(params) {
    // return this.get(`/api/v1/chapters/content/${params.friendly}/${params.chapter_id}`)

    try {
      console.log('load data: ------ ');
      const localData = await db.getChapters(params.friendly, params.chapter_id);
      if (localData) {
        console.log('Returning cached friendly from SQLite:', `${params.friendly}/${params.chapter_id}`);
        return localData;
      }
      console.log('Fetching data from API...');
      const apiData = await this.get(`/api/v1/chapters/content/${params.friendly}/${params.chapter_id}`);
      db.saveOrUpdateChapter(params.friendly, apiData);

      return apiData;
    } catch (error) {
      console.error('Error fetching chapter:', error);
      throw error;
    }
  }

  async getBookByFriendly(params, withAuth) {
    return this.get(`/api/v1/books/${params.friendly}`, { withAuth: withAuth ? withAuth : false })
  }

  // bookshelf
  async addBookshelf(params) {
    return this.post(`/api/v1/bookshelves/create`, params, { withAuth: true })
  }

  async getBookshelf(params) {
    return this.get(`/api/v1/bookshelves/list?page=${params.page}&page_size=${params.page_size}`, { withAuth: true })
  }

  async deleteBookshelfById(params) {
    return this.delete(`/api/v1/bookshelves/delete/${params.book_id}`, { withAuth: true })
  }
  //---

  //history
  async addBookHistory(params) {
    return this.post(`/api/v1/user-history/create`, params, { withAuth: true })
  }
  async getBooksHistory(params) {
    return this.get(`/api/v1/user-list-book/list?page=${params.page}&page_size=${params.page_size}`, { withAuth: true })
  }
  async deleteBookHistoryById(params) {
    return this.delete(`/api/v1/user-list-book/delete/${params.book_id}`, { withAuth: true })
  }
  //---

  //search
  async getListBookSearch(params) {
    return this.post(`/api/v1/books/list`, params)
  }
  //---

  //get filter
  async getCategoryList(params) {
    return this.get(`/api/v1/categories/list?page=${params.page}&page_size=${params.page_size}`)
  }

  async getHashtagList(params) {
    return this.get(`/api/v1/hashtags/list?page=${params.page}&page_size=${params.page_size}`)
  }
  //---

}

export default new BookService();
