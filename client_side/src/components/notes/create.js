import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";
import "./create.css";

function Create(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    rec: "hellow",
    title: "",
    content: "",
  });

  const submitNote = async (event) => {
    event.preventDefault();
    props.onAdd(note);
    const res = await axios.post("/notes", note);
    console.log(res);
    setNote({
      title: "",
      content: "",
    });
  };

  const expand = () => {
    setExpanded(true);
  };

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={(e) => {
              e.preventDefault();
              setNote({ title: e.target.value });
            }}
            value={note.title}
            placeholder="Title"
            autoComplete="off"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={(e) => {
            e.preventDefault();
            setNote({ content: e.target.value });
          }}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default Create;
