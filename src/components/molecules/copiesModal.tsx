import createCopies from "@/api/endpoints/createCopies";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function CopiesModal({
  row,
  close,
  setRefreshList,
  refreshList,
}: any) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleStartLoading();
    const formData = new FormData(event.currentTarget);
    const bookId = row.id;
    const copies = formData.get("copies") as string;
    const promise = createCopies(bookId, copies);
    promise.then(() => {
      close(false);
      setLoading(false);
      setRefreshList(!refreshList);
    });
  };

  const handleStartLoading = () => {
    setLoading(true);
  };

  return (
    <Box>
      <Box
        sx={{
          padding: "50px 50px 20px 50px",
        }}
      >
        <Typography component="h2" variant="h6">
          Editar número de cópias do livro número {row.id}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box
            sx={{
              mt: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "150px",
              }}
            >
              <TextField
                name="copies"
                label="Número de cópias"
                variant="filled"
                type="number"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                height: "50px",
              }}
            >
              <Button onClick={() => close(false)} sx={{ mr: "10px" }}>
                cancelar
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={loading}
              >
                Salvar
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
