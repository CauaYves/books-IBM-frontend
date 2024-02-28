import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "70vw",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
