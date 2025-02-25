import { useDispatch } from "react-redux";

import { newExp } from "../redux/actions/newExp";
import { useState } from "react";
import { myExperiences } from "../redux/actions/exprerience";

const ExperienceForm = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // creiamo l'oggetto esperienza con tutti i dati
    const newExperience = {
      role,
      company,
      description,
      startDate: period.split("-")[0] + "-01-01",
      endDate: period.split("-")[1] ? period.split("-")[1] + "-12-31" : null,
    };

    dispatch(newExp(newExperience));
    dispatch(myExperiences());

    if (!role || !company || !period) return;

    //ripulisce il form
    setRole("");
    setCompany("");
    setDescription("");
    setPeriod("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md space-y-3">
      <h2 className="text-lg font-bold">Aggiungi Esperienza</h2>
      <input
        type="text"
        placeholder="Ruolo"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Azienda"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Descrizione"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
