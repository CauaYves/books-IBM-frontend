import apiCopies from "./copiesApi";

async function getAllCopiesFromAllBooks() {
  try {
    const promise = await apiCopies.get("");
    return promise.data;
  } catch (error) {
    console.log(error);
  }
}

export default getAllCopiesFromAllBooks;
