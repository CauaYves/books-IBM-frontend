import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "70vw",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography align="center">
        Esse app usa um servidor gratuito com recursos limitados <br /> tempo
        médio de carregamento : 71 segundos
      </Typography>
      <CircularProgress size={80} />
    </Box>
  );
}
