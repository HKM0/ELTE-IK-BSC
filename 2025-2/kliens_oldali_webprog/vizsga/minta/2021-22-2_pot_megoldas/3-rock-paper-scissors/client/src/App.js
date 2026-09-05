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

  useEffect(() => {
    socket.on("join-game-response", (result) => {
      setJoined(true);
      setWaiting(true);
    });

    socket.on("game-started", (result) => {
      setWaiting(false);
      setOverAll({
        you: 0,
        other: 0,
      });
      setTip(null);
      setOtherTip(null);
      setResult(null);
      setDisabled(false);
    });

    socket.on("game-over", () => {
      setJoined(false);
    });

    socket.on("tip-response", (results) => {
      console.log(results);
      setResult(results.lastRound.result);
      setOtherTip(results.lastRound.other);
      setOverAll(results.overAll);
      setTimeout(() => {
        setTip(null);
        setOtherTip(null);
        setResult(null);
        setDisabled(false);
      }, 3000);
    });

    socket.on("error", (errorMsg) => setError(errorMsg));
  }, []);

  const handleJoinClick = (e) => {
    socket.emit("join-game");
  };
  const handleLeaveClick = (e) => {
    socket.emit("leave-game");
  };
  const handleChange = (e, newTip) => {
    socket.emit("tip", newTip);
    setTip(newTip);
    setResult(null);
    setDisabled(true);
  };

  if (!joined) {
    return (
      <Button variant="contained" onClick={handleJoinClick}>
        Join game
      </Button>
    );
  }

  if (waiting) {
    return "Waiting...";
  }

  return (
    <>
      <Button variant="outlined" color="error" onClick={handleLeaveClick}>
        Leave game
      </Button>

      <Grid container spacing={1}>
        <Grid item xs={12} md={5}>
          <Box>
            <h3>You: {overAll.you}</h3>
            <ToggleButtonGroup
              color="primary"
              value={tip}
              exclusive
              onChange={handleChange}
              disabled={disabled}
            >
              <ToggleButton value="rock">Rock</ToggleButton>
              <ToggleButton value="paper">Paper</ToggleButton>
              <ToggleButton value="scissors">Scissors</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box>
            <h3>Result</h3>
            {result}
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
