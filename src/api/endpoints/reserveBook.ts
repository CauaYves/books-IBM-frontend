import apiReserves from "./rentalsApi";

export type Reserve = {
  bookId: number;
  initialDate: string;
  finalDate: string;
  renter: string;
};

function reserveBook(body: Reserve) {
  const promise = apiReserves.post(`/`, body);
  return promise;
}

export default reserveBook;
