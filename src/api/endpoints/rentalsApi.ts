import axios from "axios";

const apiReserves = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL + "/reserve",
});

export default apiReserves;
