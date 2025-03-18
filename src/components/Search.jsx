import React, { useState } from "react";
import medical_records from "../medicalRecords";

const Search = ({ onSelectPatient }) => {
  const [selectedId, setSelectedId] = useState("0"); // State to track selected patient ID

  // Extract unique patients by iterating over all records
  const uniquePatients = medical_records.reduce((acc, patient) => {
    patient.data.forEach(record => {
      if (!acc.some(p => p.userId === record.userId)) {
        acc.push({
          id: patient.id,
          userId: record.userId,
          userName: record.userName,
          userDob: record.userDob,
          data: patient.data, // Include all patient data
        });
      }
    });
    return acc;
  }, []);

  // Handle the "Show" button click
  const handleShow = () => {
    if (selectedId === "0") { 
      alert("Please select a patient name"); // Alert if no patient is selected
      return;
    }
    const selectedPatient = uniquePatients.find(p => p.id === selectedId);
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

    const selectedPatient = uniquePatients.find(p => p.id === newId);
    onSelectPatient(selectedPatient); // Send selected patient data
  }

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
            <option key={patient.userId} value={patient.id}>{patient.userName}</option>
          ))}        
        </select>
      </div>

      {/* "Show" button is always in the DOM but disabled if no selection */}
      <button 
        type="submit" 
        data-testid="show" 
        onClick={handleShow} 
      >
        Show
      </button>
    </div>
  );
}

export default Search;
