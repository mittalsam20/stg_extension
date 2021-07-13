import React, { useContext } from "react";
import { recContext } from "../../pages/homepage/homepage";

import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import "./create.css";

const Note = (props) => {
  const { curRec, setCurRec } = useContext(recContext);

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={async (e) => {
          e.preventDefault();
          axios
            .delete(`app/note/${props.Key}`)
            .then(async (res) => {
              console.log(JSON.stringify(res.data));
              const resonse = await axios.get("/app/notes");
              const notesdata = resonse.data;
              const curRecNotes = notesdata.filter((ele) => ele.rec === curRec);
              props.setRecNotes(curRecNotes);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Note;
