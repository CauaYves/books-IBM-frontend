import apiBooks from "./api";

export type BookSchema = {
  author: string;
  publicationYear: string;
  title: string;
};

function createBook(body: BookSchema) {
  const promise = apiBooks.post(``, body);
  return promise;
}

export default createBook;
