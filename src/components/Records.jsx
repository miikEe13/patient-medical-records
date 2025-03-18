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
            <th>SL</th>
            <th>Date</th>
            <th>Diagnosis</th>
            <th>Weight</th>
            <th>Doctor</th>
          </tr>
        </thead>
        <tbody id="table-body" data-testid="patient-table">
          {/* Loop through patient's medical records and display them in a table */}
          {patient.data.map((record, index) => (
            <tr key={record.id}>
              <td>{index + 1}</td>
              <td>{formatDate(record.timestamp)}</td>
              <td>{record.diagnosis.name}</td>
              <td>{record.meta.weight} kg</td>
              <td>{record.doctor.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Records;
