import { useSelector, useDispatch } from "react-redux";
import { removeExperience } from "../redux/reducers/experienceSlice";

const ExperienceList = () => {
  const experiences = useSelector((state) => state.experience.experiences);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Esperienze Lavorative</h2>
      {experiences.length === 0 ? (
        <p>Nessuna esperienza aggiunta.</p>
      ) : (
        <ul className="space-y-4">
          {experiences.map((exp) => (
            <li key={exp.id} className="p-4 bg-gray-100 rounded-md flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{exp.role}</h3>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-sm">{exp.period}</p>
              </div>
              <button onClick={() => dispatch(removeExperience(exp.id))} className="bg-red-500 text-white px-3 py-1 rounded-md">
                Rimuovi
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExperienceList;
