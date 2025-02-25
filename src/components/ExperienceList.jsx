import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import { myExperiences } from "../redux/actions/exprerience";
import { Button } from "react-bootstrap";

import { fetchDeleteExp } from "../redux/actions/deleteExp";

const ExperienceList = () => {
  const experiences = useSelector((state) => state.experience.content || []); //prende le exp dall'array di oggetti content
  const dispatch = useDispatch();

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    dispatch(myExperiences()); // Fetch delle esperienze al mount
  }, [dispatch]);

  const handleDelete = (id) => {
    /* console.log(id); */
    dispatch(fetchDeleteExp(id));
    dispatch(myExperiences());
  };

  return (
    <div className="p-4 mt-3" style={{backgroundColor:"white", borderRadius:"10px"}}>
      <h2 className="text-xl font-bold mb-4">Esperienze Lavorative</h2>
      {experiences.length === 0 ? (
        <p>Nessuna esperienza aggiunta.</p>
      ) : (
        <ul className="space-y-4" >
          {experiences.map((exp) => (
            <li key={exp._id} className="p-2 bg-gray-100 rounded-md flex justify-between " >
              <div >
                <h3 className="text-lg font-semibold">{exp.role}</h3>
                <p className="text-sm text-gray-600">
                  <strong>Azienda:</strong> {exp.company}
                </p>
                <p className="text-sm">
                  <strong>Descrizione:</strong> {exp.description}
                </p>
                <p className="text-sm">
                  <strong>Inizio:</strong> {formatDate(exp.startDate)}
                </p>
                <p className="text-sm">
                  <strong>Fine:</strong> {formatDate(exp.endDate)}
                </p>
                <Button onClick={() => handleDelete(exp._id)}>Elimina</Button>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExperienceList;
