import React, { useState, useContext, useEffect } from "react";
import { recContext } from "../../pages/homepage/homepage";
import Note from "./dispnotes";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import "./dispnotes.css";
import "./create.css";

const MainNotes = () => {
  const { curRec, setCurRec } = useContext(recContext);
  const [isExpanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState([]);
  const [recnotes, setRecNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getnotes = async () => {
    const res = await axios.get("/app/notes");
    const notesdata = res.data;
    setNotes(notesdata);
    console.log("getting notesdata", res.data);
  };

  useEffect(() => {
    getnotes();
  }, []);

  useEffect(() => {
    console.log("before filtered notesdata", notes);
    console.log("cur rec id", curRec);
    const curRecNotes = notes.filter((ele) => ele.rec === curRec);
    console.log("fitlered notes on the basis of recs", curRecNotes);
    setRecNotes(curRecNotes);
  }, [notes, curRec]);

  useEffect(() => {}, [recnotes]);
  return (
    <>
      <div className="dispnote exscroll">
        <div>
          <form className="create-note">
            {isExpanded && (
              <input
                name="title"
                onChange={(e) => {
                  e.preventDefault();
                  setTitle(e.target.value);
                }}
                value={title}
                placeholder="Title"
                autoComplete="off"
              />
            )}

            <textarea
              name="content"
              onClick={() => {
                setExpanded(true);
              }}
              onChange={(e) => {
                e.preventDefault();
                setContent(e.target.value);
              }}
              value={content}
              placeholder="Take a note..."
              rows={isExpanded ? 3 : 1}
            />

            <Zoom in={isExpanded}>
              <Fab
                onClick={async (event) => {
                  event.preventDefault();
                  const note = {
                    rec: curRec,
                    title: title,
                    content: content,
                  };
                  const res = await axios.post("/app/notes", note);
                  console.log("after clicking add", res.data);
                  setTitle("");
                  setContent("");
                  const resonse = await axios.get("/app/notes");
                  const notesdata = resonse.data;
                  setNotes(notesdata);
                  const curRecNotes = notes.filter((ele) => ele.rec === curRec);
                  setRecNotes(curRecNotes);
                }}
              >
                <AddIcon />
              </Fab>
            </Zoom>
          </form>
        </div>

        {recnotes.map((ele) => {
          return (
            <Note
              Key={ele._id}
              title={ele.title}
              content={ele.content}
              setRecNotes={setRecNotes}
            />
          );
        })}
      </div>
    </>
  );
};

export default MainNotes;
