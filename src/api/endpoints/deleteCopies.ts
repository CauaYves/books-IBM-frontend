import apiCopies from "./copiesApi";

function deleteCopies(bookId: number) {
  const promise = apiCopies.delete(`/${bookId}`);
  return promise;
}

export default deleteCopies;
