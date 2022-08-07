import axios from "axios";
import {LIMIT_CONNECTION_TIME} from '../global/config.js';

axios.defaults.baseURL = "https://fakestoreapi.com";

const wait = function (time) {
  return new Promise((_, reject) => {
    setTimeout(reject, time);
  });
};

const race = (promise, time = LIMIT_CONNECTION_TIME) => {
  return Promise.race([promise, wait(time)]).catch(() => {
    throw new Error("No Connection....");
  });
};

const responseBody = res => res.data;
const request = {
  get: url => race(axios.get(url)).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
};

const products = {
  list: () => request.get("/products"),
  getProduct: id => request.get(`/products/${id}`),
  getProductsByLimit: limit => request.get(`/products?limit=${limit}`),
};

const categories = {
  getCategory: name => request.get(`/products/category/${name}`),
  getCategoryByLimit: (name, limit) =>
    request.get(`products/category/${name}?limit=${limit}`),
  getCategoryList: () => request.get("/products/categories"),
};

const account = {
  login: (username, password) =>
    request.post("/auth/login", { username, password }),
};

const agent = {
  products,
  categories,
  account,
};

export default agent;
