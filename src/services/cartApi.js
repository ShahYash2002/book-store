import api from "./api";

export default {
  getCartItems() {
    return api.get(`/cart`);
  },
  addToCart(book) {
    return api.post(`/cart/`, book);
  },
  removeFromCart(id) {
    return api.delete(`/cart/${id}`);
  },
  updateCart(newBook) {
    return api.put(`/cart/${newBook.book_id}`, newBook);
  },
};
