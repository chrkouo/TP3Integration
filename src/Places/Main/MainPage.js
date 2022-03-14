import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth, db, logout } from "../../firebase.js";
import { query, collection, getDocs, where } from "firebase/firestore";

import { Routes, Route, useNavigate } from "react-router-dom";
import Quests from "./Quests";
import AddQuests from "./AddQuests";

const MainPage = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(
        collection(db, "adventurerDB"),
        where("uid", "==", user?.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setUserId(data.uid);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  // const [level, setLevel] = useState(0);
  // let oneLevel = Math.floor(level/100);
  // const navigate = useNavigate();
  // const f = async () => {
  //   try {
  //     const result = await axios({
  //       method: "get",
  //       url: "http://localhost:3001/me",
  //       headers: {
  //         Authorization: "BEARER " + token,
  //       },
  //     });
  //     console.log(result.data)
  //     setLevel(result.data.xp);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // f();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${250}px)`, ml: `${250}px` }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Main Page
          </Typography>
          <Typography color="inherit">{name}</Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem
            button
            key={"AddQuests"}
            onClick={() => navigate("addQuests")}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"AddQuests"} />
          </ListItem>
          <ListItem button key={"Quests"} onClick={() => navigate("quests")}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary={"Quests"} />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>
        <Routes>
          <Route
            path="/addQuests"
            element={<AddQuests userId={userId} />}
          />
          <Route path="/quests" element={<Quests userId={userId} />} />
        </Routes>
      </Box>
    </Box>
  );
};
export default MainPage;
