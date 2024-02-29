import apiBooks from "./api";

function deleteBook(bookId: string) {
  const promise = apiBooks.delete(`/${bookId}`);
  return promise;
}

export default deleteBook;
