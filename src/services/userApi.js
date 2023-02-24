import api from "./api";

export default {
  signin(credentials) {
    console.log(credentials);
    return api.post("/signin", credentials);
  },
  signup(user) {
    return api.post("/signup", user);
  },
};
