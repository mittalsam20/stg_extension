import MainNotes from "./mainnotes";
const Notes = () => {
  return (
    <>
      <div style={{}}>
        <h2
          style={{
            margin: "0 10px 10px 0",
            padding: "23px 8px 0 0px",
            textAlign: "center",
          }}
        >
          {" "}
          Take Notes{" "}
        </h2>
        <MainNotes />
      </div>
    </>
  );
};

export default Notes;
