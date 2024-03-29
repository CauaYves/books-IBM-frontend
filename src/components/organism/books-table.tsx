import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBag from "@mui/icons-material/ShoppingBag";

import { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import ModalContent from "../molecules/bookModal";
import booksContext from "@/context/books-context";
import deleteBook from "@/api/endpoints/deleteBook";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { Alert } from "@mui/material";
import ReserveModalContent from "../molecules/reserveModal";
import LoadingScreen from "../molecules/loading-screen";

export type TableLine = {
  id: number;
  title: string;
  author: string;
  publicationYear: string;
};

export default function BooksDataTable() {
  const [open, setOpen] = useState(false);
  const [openReserveModal, setOpenReserveModal] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [editLine, setEditLine] = useState<TableLine>();
  const [snackMessage, setSnackMessage] = useState("");
  const { bookList, setBookList } = useContext(booksContext)!;

  const handleOpenSnackBar = () => {
    setOpenSnack(true);
  };
  const handleCloseSnackBar = () => {
    setOpenSnack(false);
  };
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
      field: "edit",
      headerName: "Editar Livro",
      width: 0,
      renderCell: () => (
        <IconButton onClick={handleOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Excluir Livro",
      width: 0,
      renderCell: () => (
        <IconButton onClick={handleDeleteBook}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
    {
      field: "rent",
      headerName: "Alugar Livro",
      width: 0,
      renderCell: () => (
        <IconButton onClick={handleRentBook}>
          <ShoppingBag fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const handleRentBook = () => {
    handleOpenReserveModal();
  };

  const handleDeleteBook = async () => {
    if (editLine) {
      const promise = deleteBook(editLine.id);

      promise
        .then(() => {
          const newBookList = bookList.filter(
            (book) => book.id !== editLine.id
          );
          setBookList(newBookList);
          setSnackMessage("Livro deletado com sucesso!");
          handleOpenSnackBar();
        })
        .catch((error) => {
          setSnackMessage(error.response.data);
          handleOpenSnackBar();
        });
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenReserveModal = () => {
    setOpenReserveModal(true);
  };

  const handleCloseReserveModal = () => {
    setOpenReserveModal(false);
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
        <ModalContent row={editLine} close={setOpen} />
      </Dialog>
      <Dialog open={openReserveModal} onClose={handleCloseReserveModal}>
        <ReserveModalContent
          row={editLine}
          close={setOpenReserveModal}
          setOpenSnack={setOpenSnack}
          setSnackMessage={setSnackMessage}
        />
      </Dialog>
      {bookList.length === 0 ? (
        <LoadingScreen />
      ) : (
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
      )}
    </div>
  );
}
