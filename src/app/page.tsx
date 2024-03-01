"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "@/components/molecules/sidebar";
import moduleContext, { ModuleContextType } from "@/context/module-context";
import BooksDataTable from "@/components/organism/books-table";
import findManyBooks from "@/api/endpoints/findManyBook";
import booksContext from "@/context/books-context";
import { AppBar, Button, Typography, Dialog } from "@mui/material";
import CreateBookModal from "@/components/molecules/createBookModal";
import RentalsDataTable from "@/components/organism/rentals-table";
import reservesContext from "@/context/reserves-context";
import findManyReserves from "@/api/endpoints/findManyReserves";
import CopiesDataTable from "@/components/organism/copies-table";
import copiesContext from "@/context/copies-context";
import getAllCopiesFromAllBooks from "@/api/endpoints/getAllCopiesFromAllBooks";
import { filterDataTable } from "@/utils/reserves-utils";

interface OrganismObjects {
  [key: string]: React.ReactNode;
}
export type ModulesKey = "Books" | "Orders" | "Copies";

export default function Dashboard() {
  const { setReservesList } = React.useContext(reservesContext)!;
  const { module }: ModuleContextType = React.useContext(moduleContext)!;
  const { setBookList } = React.useContext(booksContext)!;
  const { setCopiesList } = React.useContext(copiesContext)!;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const [bookList, copiesList, reservesListFetch] = await Promise.all([
        findManyBooks(),
        getAllCopiesFromAllBooks(),
        findManyReserves(),
      ]);
      const newReservesList = filterDataTable(reservesListFetch, bookList);
      setReservesList(newReservesList);
      setCopiesList(copiesList);
      setBookList(bookList);
    }
    fetchData();
  }, [setBookList, setCopiesList, setReservesList]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const pages: OrganismObjects = {
    Books: <BooksDataTable />,
    Orders: <RentalsDataTable />,
    Copies: <CopiesDataTable />,
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
          <Button color="inherit" variant="outlined" onClick={handleOpen}>
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
