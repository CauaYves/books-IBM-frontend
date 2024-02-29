import createBook from "@/api/books/createBook";
import booksContext from "@/context/books-context";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";

export default function CreateBookModal({ close }: any) {
  const [loading, setLoading] = useState(false);
  const { bookList, setBookList } = useContext(booksContext)!;

  const flexibleBoxStyles = {
    display: "flex",
    alignItems: "end",
    justifiContent: "space-between",
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleStartLoading();
    const data = new FormData(event.currentTarget);
    const body = {
      author: data.get("author") as string,
      publicationYear: data.get("publicationYear") as string,
      title: data.get("title") as string,
    };
    const promise = createBook(body);
    promise
      .then((res) => {
        const newBookList = [...bookList, res.data];
        setBookList(newBookList);
        setLoading(false);
        close(false);
      })
      .catch((error) => {
        console.log(error);
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
          Criação de livro
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={flexibleBoxStyles}>
            <TextField
              type="text"
              name="author"
              label="autor"
              variant="standard"
              margin="normal"
              sx={{
                mr: "30px",
              }}
            />
          </Box>
          <Box sx={flexibleBoxStyles}>
            <TextField
              name="publicationYear"
              type="number"
              label="ano de publicação"
              variant="standard"
              inputProps={{ maxLength: 4 }}
              margin="normal"
              sx={{
                mr: "30px",
              }}
            />
          </Box>
          <Box sx={flexibleBoxStyles}>
            <TextField
              name="title"
              type="text"
              label="título"
              variant="standard"
              margin="normal"
              sx={{
                mr: "30px",
              }}
            />
          </Box>
          <Box
            sx={{
              mt: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={() => close(false)}>cancelar</Button>
            <LoadingButton variant="contained" type="submit" loading={loading}>
              Criar
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
