import apiCopies from "./copiesApi";

function deleteCopies(bookId: string) {
  const promise = apiCopies.delete(`/${bookId}`);
  return promise;
}

export default deleteCopies;
