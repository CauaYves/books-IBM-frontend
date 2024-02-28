import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Book } from "@/api/books/findMany";
import LoadingScreen from "../molecules/loading-screen";

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
];

interface DatatableProps {
  rows: Book[];
}

export default function DataTable({ rows }: Readonly<DatatableProps>) {
  const [contentLoaded, setContentLoaded] = React.useState(true);

  React.useEffect(() => {
    if (rows.length !== 0) {
      setContentLoaded(true);
    }
  }, [contentLoaded, rows.length]);

  return (
    <div style={{ height: 1000, width: "100%" }}>
      {!contentLoaded ? <LoadingScreen /> : null}
      <DataGrid
        rows={rows}
        columns={columns}
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
