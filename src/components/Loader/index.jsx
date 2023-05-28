import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "60vh",
        width: "100%",
      }}
    >
      <CircularProgress color="primary" />
      <br />
      <br />
      <h3>Loading...</h3>
    </Box>
  );
}
