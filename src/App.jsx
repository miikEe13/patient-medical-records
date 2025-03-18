import React, { useState } from "react";
import "./App.css";
import "h8k-components";
import Search from "./components/Search";
import Records from "./components/Records";
import medical_records from "./medicalRecords";

const title = "Patient Medical Records";

const App = () => {
  const [selectedPatient, setSelectedPatient] = useState(null); // State to track the selected patient

  // Function to handle the selection of a patient from the dropdown
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };

   // 🔥 Extract unique patients once in App.js
   const uniquePatients = medical_records.reduce((acc, patient) => {
    patient.data.forEach(record => {
      if (!acc.some(p => p.userId === record.userId)) {
        acc.push({
          id: patient.id,
          userId: record.userId,
          userName: record.userName,
          userDob: record.userDob,
          data: patient.data, // Include all medical records for the patient
        });
      }
    });
    return acc;
  }, []);
  
  // Function to move to the next patient
  const handleNextPatient = () => {
    if (!selectedPatient) return; // 🔥 Do nothing if no patient is selected
  
    // Find the index of the currently selected patient
    const currentIndex = medical_records.findIndex(p => p.id === selectedPatient.id);
    
    // Calculate the next index (loops back to the start if at the last patient)
    const nextIndex = (currentIndex + 1) % medical_records.length;
    
    // Get the next patient from the list
    const nextPatient =uniquePatients[nextIndex];

    setSelectedPatient(nextPatient); // ✅ Now it's consistent with `uniquePatients`
  };

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="content">
        {/* Search component handles patient selection */}
        <Search onSelectPatient={handleSelectPatient} />
        
        {/* Records component is displayed only if a patient is selected */}
        {selectedPatient && <Records patient={selectedPatient} onNext={handleNextPatient} />}
      </div>
    </div>
  );
};

export default App;
