import apiCopies from "./copiesApi";

function createCopies(bookId: string, copies: string) {
  const promise = apiCopies.post(`/${bookId}?copies=${copies}`);
  return promise;
}

export default createCopies;
