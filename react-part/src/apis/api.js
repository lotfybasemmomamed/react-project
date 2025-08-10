import axios from "axios";
import { useUserContext } from "../context/UserContext";
import Cookies from "universal-cookie";

const baseUrl = "http://127.0.0.1:8000/api/";
const cookie = new Cookies();
const configauth = {
  headers: {
    // Accept: "application/json",
    Authorization: `Bearer ${cookie.get("Bearer")}`,
  },
};

//Authentication
export const register = (userData) =>
  axios.post(`${baseUrl}register`, userData);

export const login = (userData) => axios.post(`${baseUrl}login`, userData);
export const logOut = async () =>
  await axios.post(`${baseUrl}logout`, null, configauth);

//users
export const showUserById = (id) =>
  fetch(`${baseUrl}user/showbyid/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const userData = {
        username: data[0]?.name,
        email: data[0]?.email,
        password: "",
        repeatpassword: "",
      };
      cookie.set("Bearer", data.data.data.token);
      return userData;
    });

export const updateUser = async (id, userData) =>
  await axios.post(`${baseUrl}user/update/${id}`, userData);

export const showUsers = () => axios.get(`${baseUrl}user/show`, configauth);
export const deleteUser = (id) =>
  axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, configauth);

export const addNewUser = (userData) =>
  axios.post(`${baseUrl}user/create`, userData, configauth);

//products
export const showProducts = () => axios.get(`${baseUrl}product/show`, configauth);
export const addNewProduct = (productData) =>
  axios.post(`${baseUrl}product/create`, productData, configauth);
export const deleteProduct = (id) =>
  axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, configauth);

export const updateProduct = async (id, productData) =>
  await axios.post(`${baseUrl}product/update/${id}`, productData,configauth);

export const showProductById = (id) =>
  fetch(`${baseUrl}product/showbyid/${id}`,configauth)
    .then((res) => res.json())
    .then((data) => {
      const productData = {
        title: data[0]?.name,
        description: data[0]?.email,
        image: data[0].image,
      };
      return productData;
    });
