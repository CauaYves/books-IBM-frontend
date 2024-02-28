"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "@/components/molecules/sidebar";
import moduleContext, { ModuleContextType } from "@/context/module-context";
import DataTable from "@/components/organism/table";
import bookEndpoints from "@/api/books/findMany";
interface OrganismObjects {
  [key: string]: React.ReactNode;
}
export type ModulesKey = "Books" | "Orders" | "Customers";

export default function Dashboard() {
  const { module }: ModuleContextType = React.useContext(moduleContext)!;
  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const bookList = await bookEndpoints.findMany();
      setBooks(bookList);
    }
    fetchData();
  }, [books]);

  const pages: OrganismObjects = {
    Books: <DataTable rows={books} />,
    Orders: <p>orders</p>,
    Customers: <p>Customers</p>,
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
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
