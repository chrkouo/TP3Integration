import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.js";

function Quests(props) {
  const { userId } = props;
  const [checked, setChecked] = useState();

  const [quest, setQuest] = useState([]);

  const handleChange = async (e, id) => {
    const taskDocRef = doc(db, "adventurerDB", userId, "quests", id);
    try {
      await updateDoc(taskDocRef, {
        completed: checked,
      });
    } catch (err) {
      alert(err);
    }
    setChecked(!e.target.completed);
  };
  const handleDelete = async (id) => {
    const taskDocRef = doc(db, "adventurerDB", userId, "quests", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const taskColRef = query(
      collection(db, "adventurerDB", userId, "quests"),
      where("userId", "==", userId)
    );
    console.log(taskColRef);
    onSnapshot(taskColRef, (snapshot) => {
      setQuest(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  console.log(quest);
  const myQuest = quest.map((a) => (
    <div>
      <Checkbox
        checked={checked}
        label={a.data.name}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      ></Checkbox>
      {a.data.name}

      <div>
        {" "}
        <Button onClick={handleDelete} variant="contained">
          Delete
        </Button>
      </div>
    </div>
  ));

  return (
    <Paper
      elevation={10}
      sx={{
        padding: "15px",
        heigth: "400px",
      }}
    >
      <Box>{myQuest}</Box>
    </Paper>
  );
}

export default Quests;
