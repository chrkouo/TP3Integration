import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useEffect } from "react";
//import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import { Box } from "@mui/system";
//import Button from "@mui/material/Button";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.js";

function Quests(props) {
  const { userId } = props;
  // const [checked, setChecked] = useState(completed);

  const [quest, setQuest] = useState([]);

  // const handleChange = async () => {
  //   const taskDocRef = doc(db, "adventurerDB/quests", userId);
  //   try {
  //     await updateDoc(taskDocRef, {
  //       completed: checked,
  //     });
  //   } catch (err) {
  //     alert(err);
  //   }
  // };
  const handleDelete = async () => {
    const taskDocRef = doc(db, "adventurerDB/quests", userId);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const taskColRef = query(
      collection(db, "adventurerDB", "quests", userId),
      orderBy("created", "desc")
    );
    onSnapshot(taskColRef, (snapshot) => {
      setQuest(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const myQuest = quest.map((a) => (
    // <Paper
    //   elevation={10}
    //   sx={{
    //     padding: "15px",
    //     heigth: "400px",
    //   }}
    // >
    //   {" "}
    //   <Typography variant="h6">{a.name}</Typography>
    //   <Typography>level {a.userId}</Typography>
    //   {/* <Button onSubmit={() => (onChange = { handleChange })} noValidate>
    //     COMPLETE
    //   </Button> */}
    //   <div>
    //     <input
    //       id={`checkbox-${userId}`}
    //       className="checkbox-custom"
    //       name="checkbox"
    //       checked={checked}
    //       onChange={handleChange}
    //       type="checkbox"
    //     />
    //     <label
    //       htmlFor={`checkbox-${userId}`}
    //       className="checkbox-custom-label"
    //       onClick={() => setChecked(!checked)}
    //     ></label>
    //     </div>
    // </Paper>
    <div>
      <div>
        <input
          id={`checkbox-${a.userId}`}
          className="checkbox-custom"
          name="checkbox"
          // checked={checked}
          // onChange={handleChange}
          type="checkbox"
        />
        <label
          htmlFor={`checkbox-${a.userId}`}
          className="checkbox-custom-label"
          // onClick={() => setChecked(!checked)}
        ></label>
      </div>
      <div>
        <div>
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  ));
  debugger;
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
