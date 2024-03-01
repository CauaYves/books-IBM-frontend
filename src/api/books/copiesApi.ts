import axios from "axios";

const apiCopies = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL + "/copies",
});

export default apiCopies;
