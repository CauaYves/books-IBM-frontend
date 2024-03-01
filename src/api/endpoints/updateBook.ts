import apiBooks from "./api";

export type BookSchema = {
  author: string;
  publicationYear: string;
  title: string;
};

function updateBook(body: BookSchema, bookId: string) {
  const promise = apiBooks.put(`/${bookId}`, body);
  return promise;
}

export default updateBook;
