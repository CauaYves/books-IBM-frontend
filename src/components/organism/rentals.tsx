import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Dialog } from "@mui/material";
import ModalContent from "../molecules/modal";
import reservesContext from "@/context/reserves-context";

export default function RentalsDataTable() {
  const [open, setOpen] = useState(false);
  const [editLine, setEditLine] = useState({});
  const { reservesList } = React.useContext(reservesContext)!;

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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: "auto", width: "100%" }}>
      <Dialog open={open} onClose={handleClose}>
        <ModalContent row={editLine} close={setOpen} />
      </Dialog>
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
        onRowClick={(line) => setEditLine(line.row)}
      />
    </div>
  );
}
