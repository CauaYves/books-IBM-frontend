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
import CreateBookModal from "@/components/molecules/createBookModal";
import RentalsDataTable from "@/components/organism/rentals";
import reservesContext from "@/context/reserves-context";
import findManyReserves, { Reserve } from "@/api/books/findManyReserves";

interface OrganismObjects {
  [key: string]: React.ReactNode;
}
export type ModulesKey = "Books" | "Orders";

export default function Dashboard() {
  const { setReservesList } = React.useContext(reservesContext)!;
  const { module }: ModuleContextType = React.useContext(moduleContext)!;
  const { bookList } = React.useContext(booksContext)!;
  const { setBookList } = React.useContext(booksContext)!;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const reservesListFetch = await findManyReserves();
      const newReservesList = reservesListFetch.map(
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
              title: element.title,
              author: element.author,
            };
          }
        }
      }
      setReservesList(newReservesList);
    }
    fetchData();
  }, [bookList, setReservesList]);

  React.useEffect(() => {
    async function fetchData() {
      const bookList = await findManyBooks();
      setBookList(bookList);
    }
    fetchData();
  }, [setBookList]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const pages: OrganismObjects = {
    Books: <DataTable />,
    Orders: <RentalsDataTable />,
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
