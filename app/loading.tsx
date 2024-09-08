import React from "react";
import { CircularProgress, Container, Grid } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Container className="flex justify-center items-center h-screen">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <CircularProgress />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Loading;
