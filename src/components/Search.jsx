import React, { useState } from "react";
import useUniquePatients from "../hooks/useUniquePatients"; // 🔥 Import the custom hook

const Search = ({ onSelectPatient }) => {
  const uniquePatients = useUniquePatients(); // 🔥 Use the custom hook to get unique patients
  const [selectedId, setSelectedId] = useState("0"); // State to track selected patient ID
  // Handle the "Show" button click
  const handleShow = () => {
    if (selectedId === "0") {
      alert("Please select a patient name"); // Alert if no patient is selected
      return;
    }
    const selectedPatient = uniquePatients.find((p) => p.id === selectedId);
    onSelectPatient(selectedPatient); // Send selected patient data
  };

  // Handle selection change in the dropdown
  const handleChange = (e) => {
    const newId = e.target.value; // Capture new selected value
    setSelectedId(newId); // Update state

    if (newId === "0") {
      alert("Please select a patient name"); // Prevent selection of the default option
      return;
    }

    const selectedPatient = uniquePatients.find((p) => p.id === newId);
    onSelectPatient(selectedPatient); // Send selected patient data
  };

  return (
    <div className="layout-row align-items-baseline select-form-container">
      <div className="select">
        <select
          data-testid="patient-name"
          value={selectedId}
          onChange={handleChange}
        >
          <option value="0" disabled>
            Select Patient
          </option>
          {uniquePatients.map((patient) => (
            <option key={patient.userId} value={patient.id}>
              {patient.userName}
            </option>
          ))}
        </select>
      </div>

      {/* "Show" button is always in the DOM but disabled if no selection */}
      <button type="submit" data-testid="show" onClick={handleShow}>
        Show
      </button>
    </div>
  );
};

export default Search;
