import data from "./data";
import "./style.css";
import { useState } from "react";

const Accordion = () => {
  const [selected, setSelected] = useState(null); // State for single selection
  const [enableMultiSelection, setEnableMultiSelection] = useState(false); // Toggle between single and multi-selection modes
  const [multiple, setMultiple] = useState([]); // State for multiple selected IDs in multi-selection mode

  // Handle single selection
  const handleClick = (currentId) => {
    // Toggle the selected ID. If the current ID is already selected, deselect it (set to null).
    setSelected(currentId === selected ? null : currentId);
  };

  // Handle multi-selection
  const handleMulti = (currentId) => {
    // Create a copy of the current state to avoid directly modifying it
    let copyMultiple = [...multiple];
    const findIndexCurrentId = copyMultiple.indexOf(currentId);

    if (findIndexCurrentId === -1) {
      // If the ID is not in the array, add it
      copyMultiple.push(currentId);
    } else {
      // If the ID is already in the array, remove it
      copyMultiple.splice(findIndexCurrentId, 1);
    }

    // Update the multiple state with the new array
    setMultiple(copyMultiple);
  };

  return (
    <div>
      <h1>Accordion</h1>

      {/* Button to toggle between single and multi-selection modes */}
      <div className="wrapper">
        <button
          className="wrapper btn"
          onClick={() => {
            // Toggle the multi-selection mode and log the updated state
            setEnableMultiSelection(!enableMultiSelection);
          }}
        >
          {/* Update button text dynamically based on the mode */}
          {enableMultiSelection
            ? "Disable Multi Selection"
            : "Enable Multi Selection"}
        </button>
      </div>

      <div>
        {/* Check if there is data to display */}
        {data.length > 0 ? (
          data.map((val, index) => (
            <div key={index}>
              {/* Accordion Header */}
              <div
                className="accordion__data"
                onClick={
                  enableMultiSelection
                    ? () => handleMulti(val.id) // Multi-selection mode
                    : () => handleClick(val.id) // Single selection mode
                }
              >
                <h3>{val.title}</h3>
                <span>
                  {/* Display "-" if the current ID is selected, otherwise "+" */}
                  {enableMultiSelection
                    ? multiple.indexOf(val.id) !== -1 // Check if the ID is part of the multi-selection array
                      ? "-"
                      : "+"
                    : selected === val.id // Check if the current ID matches the selected one
                    ? "-"
                    : "+"}
                </span>
              </div>

              {/* Accordion Content */}
              <div className="answer">
                {enableMultiSelection
                  ? // In multi-selection mode, check if the ID is in the multi-selection array
                    multiple.indexOf(val.id) !== -1 && <div>{val.content}</div>
                  : // In single selection mode, check if the ID matches the selected ID
                    selected === val.id && <div>{val.content}</div>}
              </div>
            </div>
          ))
        ) : (
          // Display message if no data is found
          <p>Not found any data :(</p>
        )}
      </div>
    </div>
  );
};

export default Accordion;
