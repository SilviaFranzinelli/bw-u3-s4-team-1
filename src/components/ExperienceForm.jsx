import { useDispatch } from "react-redux";

import { useState } from "react";
import { addExperience } from "../redux/reducers/experienceSlice";

const ExperienceForm = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [period, setPeriod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role || !company || !period) return;

    dispatch(addExperience({ role, company, period }));
    setRole("");
    setCompany("");
    setPeriod("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md space-y-3">
      <h2 className="text-lg font-bold">Aggiungi Esperienza</h2>
      <input type="text" placeholder="Ruolo" value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border rounded-md" />
      <input
        type="text"
        placeholder="Azienda"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Periodo (es. 2020-2023)"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
        Aggiungi
      </button>
    </form>
  );
};

export default ExperienceForm;
