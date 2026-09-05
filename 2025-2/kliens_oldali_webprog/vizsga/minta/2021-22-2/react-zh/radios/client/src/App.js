import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import io from "socket.io-client";
import { useState } from "react";
import { Alert, Badge, Snackbar } from "@mui/material";

export function App() {
  const [radios, setRadios] = useState([]); // ennek helyén tetszőleges adatszerkezetet használhatsz
  const [error, setError] = useState(null);

  const handleToggle = (radio) => {
    console.log(radio);
  };

  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        subheader={<ListSubheader>Rádióadó</ListSubheader>}
      >
        <ListItem key="Rádióadó neve 1">
          <ListItemIcon>
            <Badge badgeContent={5} color="primary">
              <PodcastsIcon />
            </Badge>
            <DoNotDisturbIcon />
          </ListItemIcon>
          <ListItemText
            primary="Rádióadó neve 1"
            secondary="Aktuálisan játszott műsor 1"
          />
          <Switch
            edge="end"
            onChange={(e) => handleToggle("rádióinformáció 1")}
            checked={false}
          />
        </ListItem>
        <ListItem key="Rádióadó neve 2">
          <ListItemIcon>
            <Badge badgeContent={5} color="primary">
              <PodcastsIcon />
            </Badge>
            <DoNotDisturbIcon />
          </ListItemIcon>
          <ListItemText
            primary="Rádióadó neve 2"
            secondary="Aktuálisan játszott műsor 2"
          />
          <Switch
            edge="end"
            onChange={(e) => handleToggle("rádióinformáció 2")}
            checked={false}
          />
        </ListItem>
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
