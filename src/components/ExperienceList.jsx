import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import { myExperiences } from "../redux/actions/exprerience";

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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Esperienze Lavorative</h2>
      {experiences.length === 0 ? (
        <p>Nessuna esperienza aggiunta.</p>
      ) : (
        <ul className="space-y-4">
          {experiences.map((exp) => (
            <li key={exp._id} className="p-4 bg-gray-100 rounded-md flex justify-between">
              <div>
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExperienceList;
