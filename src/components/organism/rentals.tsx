import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Alert, Dialog, IconButton, Snackbar } from "@mui/material";
import reservesContext from "@/context/reserves-context";
import AddIcon from "@mui/icons-material/Add";
import CopiesModal from "../molecules/copiesModal";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RentalsDataTable() {
  const [open, setOpen] = useState(false);
  const [editLine, setEditLine] = useState({});
  const { reservesList } = React.useContext(reservesContext)!;
  const [snackMessage, setSnackMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

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
    {
      field: "copies",
      headerName: "Cópias",
      width: 130,
      renderCell: () => (
        <IconButton onClick={handleOpen}>
          <AddIcon fontSize="small" />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Excluir cópias",
      width: 130,
      renderCell: () => (
        <IconButton onClick={handleDeleteCopies}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];
  const handleOpenSnackBar = () => {
    setOpenSnack(true);
  };
  const handleCloseSnackBar = () => {
    setOpenSnack(false);
  };
  const handleDeleteCopies = () => {};

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: "auto", width: "100%" }}>
      <Snackbar
        onClose={handleCloseSnackBar}
        open={openSnack}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="info">{snackMessage} </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <CopiesModal row={editLine} close={setOpen} />
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
