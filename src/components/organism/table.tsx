import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState } from "react";
import { Dialog, IconButton } from "@mui/material";
import ModalContent from "../molecules/modal";
import booksContext from "@/context/books-context";

export default function DataTable() {
  const [open, setOpen] = useState(false);
  const [editLine, setEditLine] = useState({});
  const { bookList } = useContext(booksContext)!;

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Título", width: 270 },
    { field: "author", headerName: "Autor", width: 200 },
    {
      field: "publicationYear",
      headerName: "Ano de publicação",
      type: "number",
      width: 130,
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 0,
      renderCell: () => (
        <IconButton onClick={handleOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: "auto", width: "100%" }}>
      <Dialog open={open} onClose={handleClose}>
        <ModalContent row={editLine} close={setOpen} />
      </Dialog>
      <DataGrid
        rows={bookList}
        columns={columns}
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
