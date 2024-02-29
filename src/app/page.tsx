"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "@/components/molecules/sidebar";
import moduleContext, { ModuleContextType } from "@/context/module-context";
import DataTable from "@/components/organism/table";
import findManyBooks from "@/api/books/findManyBook";
import booksContext from "@/context/books-context";
import { AppBar, Button, Typography, Dialog } from "@mui/material";
import ModalContent from "@/components/molecules/modal";
import CreateBookModal from "@/components/molecules/createBookModal";

interface OrganismObjects {
  [key: string]: React.ReactNode;
}
export type ModulesKey = "Books" | "Orders" | "Customers";

export default function Dashboard() {
  const { module }: ModuleContextType = React.useContext(moduleContext)!;
  const { setBookList } = React.useContext(booksContext)!;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const bookList = await findManyBooks();
      setBookList(bookList);
    }
    fetchData();
  }, [setBookList]);

  const handleCreateBook = () => {
    handleOpen();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const pages: OrganismObjects = {
    Books: <DataTable />,
    Orders: <p>orders</p>,
    Customers: <p>Customers</p>,
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Dialog open={open} onClose={handleClose}>
        <CreateBookModal close={setOpen} />
      </Dialog>
      <Sidebar />
      <AppBar
        position="absolute"
        sx={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <Toolbar>
          <Button color="inherit" variant="outlined" onClick={handleCreateBook}>
            Criar +
          </Button>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, ml: "50px" }}
          >
            Biblioteca IBM
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {pages[module]}
      </Box>
    </Box>
  );
}
