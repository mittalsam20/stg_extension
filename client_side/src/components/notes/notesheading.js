import MainNotes from "./mainnotes";
const Notes = () => {
  return (
    <>
      <div style={{ borderLeft: "1px solid grey" }}>
        <h2
          style={{
            margin: "20px 10px 10px 10px",
            padding: "5px 0px 5px 0px",
            textAlign: "center",
            backgroundColor: "#3f51b5",
            color: "#ffffff",
            borderRadius: "10px",
            cursor: "alias",
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

// 3f51b5

export default Notes;
