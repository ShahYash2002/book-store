import api from "./api";

export default {
  getOrders() {
    return api.get("/order");
  },
  addOrder(book) {
    return api.post("/order", book);
  },
  cancelOrder(id) {
    return api.delete(`/order/${id}`);
  },
};
