import { useState } from "react";

import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

function OneQuest({ name, userId, completed }) {
  const [checked, setChecked] = useState(completed);
  const QuestItem = ({ name, userId }) => {
    return (
      <div>
        <h2>{name}</h2>
        <p>{userId}</p>
      </div>
    );
  };

  /* function to update firestore */
  const handleChange = async () => {
    const taskDocRef = doc(db, "adventurerDB/quests", userId);
    try {
      await updateDoc(taskDocRef, {
        completed: checked,
      });
    } catch (err) {
      alert(err);
    }
  };

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    const taskDocRef = doc(db, "adventurerDB/quests", userId);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <div>
        <input
          id={`checkbox-${userId}`}
          name="checkbox"
          checked={checked}
          onChange={handleChange}
          type="checkbox"
        />
        <label
          htmlFor={`checkbox-${userId}`}
          onClick={() => setChecked(!checked)}
        ></label>
      </div>
      <div>
        <h2>{name}</h2>
        <p>{userId}</p>
        <div>
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
      {<QuestItem name={name} userId={userId} />}
    </div>
  );
}

export default OneQuest;
