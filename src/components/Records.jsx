import React from "react";

// Function to format timestamp into MM/DD/YYYY format
const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure MM format
    const day = String(date.getDate()).padStart(2, "0"); // Ensure DD format
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

const Records = ({ patient, onNext }) => {
  // If no patient data is provided, do not render the component
  if (!patient || !patient.data) return null;

  return (
    <div className="patient-profile-container" id="profile-view">
      <div className="layout-row justify-content-center">
        <div id="patient-profile" data-testid="patient-profile" className="mx-auto">
          <h4 id="patient-name">{patient.userName}</h4>
          <h5 id="patient-dob">DOB: {patient.userDob}</h5> 
          <h5 id="patient-height">Height: {patient.data[0]?.meta.height} cm</h5>
        </div>

        {/* Display "Next" button only when a patient is selected */}
        {patient && (
          <button className="mt-10 mr-10" data-testid="next-btn" onClick={onNext}>
            Next
          </button>
        )}
      </div>

      <table id="patient-records-table">
        <thead id="table-header">
          <tr>
            <th>SL</th> {/* Serial number for records */}
            <th>Date</th> {/* Date of the medical record */}
            <th>Diagnosis</th> {/* Diagnosis name */}
            <th>Weight</th> {/* Patient weight at the time of record */}
            <th>Doctor</th> {/* Name of the doctor who attended the patient */}
          </tr>
        </thead>
        <tbody id="table-body" data-testid="patient-table">
          {/* Loop through patient's medical records and display them in a table */}
          {patient.data.map((record, index) => (
            <tr key={record.id}>
              <td>{index + 1}</td> {/* Serial number */}
              <td>{formatDate(record.timestamp)}</td> {/* Formatted timestamp */}
              <td>{record.diagnosis.name}</td> {/* Diagnosis name */}
              <td>{record.meta.weight} kg</td> {/* Weight in kg */}
              <td>{record.doctor.name}</td> {/* Doctor's name */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Records;
