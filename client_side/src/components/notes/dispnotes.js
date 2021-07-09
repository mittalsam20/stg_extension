import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import "./create.css";

const Note = (props) => {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          axios
            .delete(`app/note/${props.Key}`)
            .then((res) => {
              console.log(JSON.stringify(res.data));
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
