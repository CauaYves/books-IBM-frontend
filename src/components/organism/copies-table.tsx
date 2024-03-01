import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import copiesContext from "@/context/copies-context";
import { Alert, Dialog, IconButton, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import deleteCopies from "@/api/endpoints/deleteCopies";
import CopiesModal from "../molecules/copiesModal";
import getAllCopiesFromAllBooks from "@/api/endpoints/getAllCopiesFromAllBooks";

type CopiesLineTable = {
  id: number;
  title: string;
  author: string;
  publicationYear: string;
  bookcopies: number;
};

export default function CopiesDataTable() {
  const { copiesList, setCopiesList } = React.useContext(copiesContext)!;
  const [open, setOpen] = React.useState(false);
  const [editLine, setEditLine] = React.useState<CopiesLineTable>();
  const [snackMessage, setSnackMessage] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [refreshList, setRefreshList] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const newCopiesList = await getAllCopiesFromAllBooks();
      setCopiesList(newCopiesList);
    }
    fetchData();
  }, [refreshList, setCopiesList]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Livro ID", width: 70 },
    {
      field: "bookcopies",
      headerName: "Número de cópias",
      width: 150,
    },
    {
      field: "publicationYear",
      headerName: "Ano de publicação",
      width: 150,
    },
    {
      field: "title",
      headerName: "Título do livro",
      width: 170,
    },
    {
      field: "author",
      headerName: "Autor do livro",
      width: 170,
    },
    {
      field: "delete",
      headerName: "Deletar Cópias",
      width: 110,
      renderCell: () => (
        <IconButton onClick={handleDeleteCopies}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
    {
      field: "create",
      headerName: "Criar Cópias",
      width: 100,
      renderCell: () => (
        <IconButton onClick={handleCreateCopies}>
          <AddIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const handleCreateCopies = () => {
    handleOpen();
  };

  const handleDeleteCopies = async () => {
    if (editLine?.bookcopies === 0) {
      setSnackMessage("Não há cópias a serem deletadas");
      handleOpenSnackBar();
      return;
    }
    if (editLine) {
      const bookId = editLine.id;
      await deleteCopies(bookId);
    }
  };
  const handleOpenSnackBar = () => {
    setOpenSnack(true);
  };
  const handleCloseSnackBar = () => {
    setOpenSnack(false);
  };
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
        <CopiesModal
          row={editLine}
          close={setOpen}
          setRefreshList={setRefreshList}
          refreshList={refreshList}
        />
      </Dialog>
      <DataGrid
        rows={copiesList}
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
