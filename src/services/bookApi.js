import api from "./api";

export default {
  getBooks() {
    return api.get(`/book/`);
  },
  getBookById(id) {
    return api.get(`/book/${id}`);
  },
};
