import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3030");

export function App() {
  const [error, setError] = useState(null);
  const [joined, setJoined] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [tip, setTip] = useState(null);
  const [otherTip, setOtherTip] = useState(null);
  const [result, setResult] = useState(null);
  const [overAll, setOverAll] = useState({
    you: 0,
    other: 0,
  });

  return (
    <>
      <Button variant="contained">Join game</Button>
      {/* -------------- */}
      Waiting...
      {/* -------------- */}
      <Button variant="outlined" color="error">
        Leave game
      </Button>
      <Grid container spacing={1}>
        <Grid item xs={12} md={5}>
          <Box>
            <h3>You: {overAll.you}</h3>
            <ToggleButtonGroup color="primary" value={tip} exclusive>
              <ToggleButton value="rock">Rock</ToggleButton>
              <ToggleButton value="paper">Paper</ToggleButton>
              <ToggleButton value="scissors">Scissors</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box>
            <h3>Result</h3>
            Ide jön az aktuális eredmény
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            <h3>Other: {overAll.other}</h3>
            <ToggleButtonGroup
              color="secondary"
              value={otherTip}
              exclusive
              disabled
            >
              <ToggleButton value="rock">Rock</ToggleButton>
              <ToggleButton value="paper">Paper</ToggleButton>
              <ToggleButton value="scissors">Scissors</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
