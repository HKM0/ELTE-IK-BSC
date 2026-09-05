import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Alert, Badge, Snackbar } from "@mui/material";

const socket = io("http://localhost:3030");

export function App() {
  const [radioList, setRadioList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.on("radios-listed", (radios) =>
      setRadioList(
        radios.map((radio) => ({
          name: radio,
          joined: false,
          program: {},
          counter: 0,
        }))
      )
    );

    socket.on("radio-joined", ({ radio, program }) => {
      console.log(radio, program);
      setRadioList((radioList) =>
        radioList.map((r) =>
          r.name !== radio ? r : { ...r, joined: true, program }
        )
      );
    });

    socket.on("radio-left", (radio) => {
      setRadioList((radioList) =>
        radioList.map((r) => (r.name !== radio ? r : { ...r, joined: false }))
      );
    });

    socket.on("program-added", ({ radio, program }) => {
      setRadioList((radioList) =>
        radioList.map((r) => (r.name !== radio ? r : { ...r, program }))
      );
    });

    socket.on("counter-updated", ({ radio, counter }) => {
      setRadioList((radioList) =>
        radioList.map((r) => (r.name !== radio ? r : { ...r, counter }))
      );
    });

    socket.on("error", (errorMsg) => setError(errorMsg));
  }, []);

  useEffect(() => {
    socket.emit("list-radios");
  }, []);

  const handleToggle = (radio) => {
    console.log(radio);
    if (!radio.joined) {
      socket.emit("join-radio", radio.name);
    } else {
      socket.emit("leave-radio", radio.name);
    }
  };

  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        subheader={<ListSubheader>Radio list</ListSubheader>}
      >
        {radioList.map((radio) => (
          <ListItem key={radio.name}>
            <ListItemIcon>
              {radio.joined ? (
                <Badge badgeContent={radio.counter} color="primary">
                  <PodcastsIcon />
                </Badge>
              ) : (
                <DoNotDisturbIcon />
              )}
            </ListItemIcon>
            <ListItemText
              primary={radio.name}
              secondary={radio.program?.name}
            />
            <Switch
              edge="end"
              onChange={(e) => handleToggle(radio)}
              checked={radio.joined}
            />
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
