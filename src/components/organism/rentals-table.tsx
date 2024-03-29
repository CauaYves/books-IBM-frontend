import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import reservesContext from "@/context/reserves-context";
import getAllCopiesFromAllBooks from "@/api/endpoints/getAllCopiesFromAllBooks";
import findManyReserves from "@/api/endpoints/findManyReserves";
import { filterDataTable } from "@/utils/reserves-utils";
import booksContext from "@/context/books-context";

export default function RentalsDataTable() {
  const { reservesList, setReservesList } = React.useContext(reservesContext)!;
  const { setBookList } = React.useContext(booksContext)!;

  React.useEffect(() => {
    async function fetchData() {
      const [bookList, reservesListFetch] = await Promise.all([
        getAllCopiesFromAllBooks(),
        findManyReserves(),
      ]);
      const newReservesList = filterDataTable(reservesListFetch, bookList);
      setReservesList(newReservesList);
      setBookList(bookList);
    }
    fetchData();
  }, [setBookList, setReservesList]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "renter", headerName: "Alugador", width: 170 },
    { field: "initialDate", headerName: "Data de empréstimo", width: 200 },
    {
      field: "finalDate",
      headerName: "Data de devolução",
      width: 150,
    },
    {
      field: "bookId",
      headerName: "Livro ID",
      width: 130,
    },
    {
      field: "title",
      headerName: "Título do livro",
      width: 130,
    },
    {
      field: "author",
      headerName: "Autor do livro",
      width: 130,
    },
  ];

  return (
    <div style={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={reservesList}
        columns={columns}
        getRowId={(row) => row.id || row.bookId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20]}
        checkboxSelection
      />
    </div>
  );
}
