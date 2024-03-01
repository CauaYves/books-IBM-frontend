import reserveBook from "@/api/endpoints/reserveBook";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function ReserveModalContent({
  row,
  close,
  setOpenSnack,
  setSnackMessage,
}: any) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleStartLoading();
    const formData = new FormData(event.currentTarget);

    const body = {
      bookId: row.id,
      initialDate: formData.get("initialDate") as string,
      finalDate: formData.get("finalDate") as string,
      renter: formData.get("renter") as string,
    };

    const promise = reserveBook(body);
    promise
      .then(() => {
        handleStopLoading();
      })
      .catch((error) => {
        setSnackMessage(error.response.data);
        setOpenSnack(true);
        close(false);
      });
  };

  const handleStartLoading = () => {
    setLoading(true);
  };
  const handleStopLoading = () => {
    setLoading(false);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [date, setDate] = useState(getCurrentDate());

  return (
    <Box>
      <Box
        sx={{
          padding: "50px 50px 20px 50px",
        }}
      >
        <Typography component="h2" variant="h6">
          Você está alugando: <strong>{row.title}</strong>
        </Typography>
        <Box m={4} />

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            type="text"
            name="renter"
            variant="filled"
            label="Insira seu nome"
            fullWidth
            sx={{
              mb: "20px",
            }}
          />
          <Box>
            <Typography>Data inicial</Typography>
            <TextField
              type="date"
              name="initialDate"
              fullWidth
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </Box>{" "}
          <Box m={2} />
          <Typography>Data final</Typography>
          <TextField type="date" fullWidth name="finalDate" />
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
              Salvar
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
