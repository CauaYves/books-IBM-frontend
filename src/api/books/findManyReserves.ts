import apiReserves from "./rentalsApi";

export type Reserve = {
  id: number;
  renter: string;
  initialDate: string;
  finalDate: string;
  bookId: number;
};

async function findManyReserves() {
  try {
    const promise = await apiReserves.get("");
    return promise.data;
  } catch (error) {
    console.log(error);
  }
}

export default findManyReserves;
