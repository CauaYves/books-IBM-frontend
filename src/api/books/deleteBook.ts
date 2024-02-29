import apiBooks from "./api";

function deleteBook(bookId: number) {
  const promise = apiBooks.delete(`/${bookId}`);
  return promise;
}

export default deleteBook;
