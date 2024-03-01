import axios from "axios";

const apiBooks = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL + "/books",
});

export default apiBooks;
