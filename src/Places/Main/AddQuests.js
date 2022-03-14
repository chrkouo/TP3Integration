import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";

import { db } from "../../firebase.js";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

function AddQuests(props) {
  const userId = props.userId;
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "adventurerDB", userId, "quests"), {
        name: name,
        completed: false,
        userId: userId,
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Paper
      elevation={10}
      sx={{
        padding: "15px",
        heigth: "400px",
      }}
    >
      <Typography variant="h5">Add Quest</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          autoFocus
        />

        {/* <TextField
          required
          sx={{ m: 1, width: "65ch" }}
          id="level"
          label="Level"
          name="level"
          autoComplete="level"
          defaultValue="0"
          autoFocus
        />
        <TextField
          required
          sx={{ m: 1, width: "65ch" }}
          id="completionXp"
          label="CompletionXp"
          name="completionXp"
          autoComplete="completionXp"
          defaultValue="0"
          autoFocus
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          ADD
        </Button>
      </Box>
    </Paper>
  );
}

export default AddQuests;
