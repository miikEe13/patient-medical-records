import { useMemo } from "react";
import medical_records from "../medicalRecords";

// Custom Hook to extract unique patients
const useUniquePatients = () => {
    return useMemo(() => {
    console.log("useMemo recalculating uniquePatients"); // Agregar log aquí
    return medical_records.reduce((acc, patient) => {
      patient.data.forEach((record) => {
        if (!acc.some((p) => p.userId === record.userId)) {
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
  }, [medical_records]); // Memoize so it only recomputes if `medical_records` changes
};

export default useUniquePatients;
