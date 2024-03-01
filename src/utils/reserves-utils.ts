import { Book } from "@/api/endpoints/findManyBook";
import { Reserve } from "@/api/endpoints/findManyReserves";

function filterDataTable(reservesList: Reserve[], bookList: Book[]) {
  const newReservesList = reservesList.map(
    (reserve: Reserve, index: number) => ({
      ...reserve,
      id: reserve.id || index + 1,
    })
  );
  for (const element of bookList) {
    for (let i = 0; i < newReservesList.length; i++) {
      if (element.id === newReservesList[i].bookId) {
        newReservesList[i] = {
          ...newReservesList[i],
          //@ts-ignore
          title: element.title,
          author: element.author,
        };
      }
    }
  }
  return newReservesList;
}
export { filterDataTable };
