import { useState, useRef } from "react";

function Note({ onClose, position }) {
  const [moving, setMoving] = useState(false);
  const stickyNoteRef = useRef();
  const [diffx, setDiffx] = useState(0);
  const [diffy, setDiffy] = useState(0);
  const [zed, setZed] = useState(10);

  const handleMouseDown = (e) => {
    if (!pinned) {
      setMoving(true);
      const dimensions = stickyNoteRef.current.getBoundingClientRect();
      setZed(zed + 1);
      stickyNoteRef.current.style.zIndex = zed;
      setDiffx(e.clientX - dimensions.x);
      setDiffy(e.clientY - dimensions.y);
    }
  };
  const handleMouseUp = (e) => {
    setMoving(false);
  };
  const handleMouseMove = (e) => {
    if (moving) {
      const x = e.clientX - diffx;
      const y = e.clientY - diffy;
      stickyNoteRef.current.style.left = x + "px";
      stickyNoteRef.current.style.top = y + "px";
    }
  };
  const [pinned, setPinned] = useState(false);
  const pinTheNote = () => {
    if (!pinned) {
      setMoving(true);
      stickyNoteRef.current.style.zIndex = -1;
    }
    setMoving(false);
    setPinned(!pinned);
    stickyNoteRef.current.style.zIndex = 1000000;
  };
  return (
    <div
      className="noteBox"
      ref={stickyNoteRef}
      style={{ zIndex: { position } }}
    >
      <div
        className="noteHolder"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <span onClick={pinTheNote}>{pinned ? "pinned note ⭐" : "📌"} </span>{" "}
        <span onClick={onClose}>❌</span>
      </div>
      <textarea
        placeholder="add your notes ..."
        style={{
          width: "98%",
          height: "100%",
          resize: "none",
          border: "none",
        }}
        name=""
        id=""
        rows="10"
      ></textarea>
    </div>
  );
}

export default Note;
