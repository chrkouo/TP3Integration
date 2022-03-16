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
  let completed = false;
  const [checked, setChecked] = useState(completed);
  const [quest, setQuest] = useState([]);
  async function handleChange(id) {
    const taskDocRef = doc(db, "adventurerDB", userId, "quests", id);
    try {
      await updateDoc(taskDocRef, {
        completed: checked,
      });
    } catch (err) {
      alert(err);
    }
  }
  async function handleDelete(id) {
    const taskDocRef = doc(db, "adventurerDB", userId, "quests", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  }

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
          completed: doc.data().completed,
        }))
      );
    });
  }, []);
  console.log(quest);
  const myQuest = quest.map((a) => (
    <div>
      <Paper
        elevation={10}
        sx={{
          padding: "15px",
          heigth: "400px",
        }}
      >
        <Checkbox
          id={a.id}
          checked={checked}
          label={a.data.name}
          onClick={() => setChecked(true)}
          onChange={() => handleChange(a.id)}
          inputProps={{ "aria-label": "controlled" }}
        ></Checkbox>
        {a.data.name}

        <div>
          {" "}
          <Button
            id={a.id}
            onClick={() => handleDelete(a.id)}
            variant="contained"
          >
            Delete
          </Button>
        </div>
      </Paper>
      <br />
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
