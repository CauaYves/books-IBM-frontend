import apiBooks from "./api";

export interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: string;
}

async function findMany() {
  try {
    const promise = await apiBooks.get("");
    return promise.data;
  } catch (error) {
    console.log(error);
  }
}

const bookEndpoints = {
  findMany,
};

export default bookEndpoints;
