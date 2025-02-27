import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { myExperiences } from "../redux/actions/exprerience";
import { Card } from "react-bootstrap";
import { Pen, Plus } from "react-bootstrap-icons";
import ExperienceForm from "./ExperienceForm";

const formatDate = (isoString) => {
  if (!isoString) return "Presente";
  const date = new Date(isoString);
  return date.toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
  });
};

const ExperienceList = () => {
  const experiences = useSelector((state) => state.experience.content || []);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [editExperience, setEditExperience] = useState(null);

  useEffect(() => {
    dispatch(myExperiences());
  }, [dispatch]);

  const handleEdit = (exp) => {
    setEditExperience(exp);
    setShowForm(true);
  };

  return (
    <div className="p-4 border bg-white rounded-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fs-4 fw-bold">Esperienza</h2>
        <Plus
          size={40}
          className="text-dark cursor-pointer mb-3"
          onClick={() => {
            setEditExperience(null);
            setShowForm(true);
          }}
        />
      </div>

      {experiences.length === 0 ? (
        <p className="text-muted">Nessuna esperienza aggiunta.</p>
      ) : (
        <ul className="list-unstyled">
          {experiences.map((exp) => (
            <Card key={exp._id} className="mb-3 border-0 shadow-sm p-2">
              <Card.Body className="d-flex">
                <div className="me-3">
                  <img
                    src={exp.companyLogo || "https://via.placeholder.com/50"}
                    alt={exp.company}
                    className="rounded"
                    width="50"
                    height="50"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 className="fw-semibold">{exp.role}</h5>
                  <p className="text-muted mb-1">
                    <strong>{exp.company}</strong> - {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                  <p className="small text-muted">{exp.location}</p>
                  <p className="small">{exp.description}</p>
                </div>
                <div className="d-flex align-items-start">
                  <Pen
                    size={20}
                    className="text-dark cursore"
                    style={{ position: "relative", left: "15px" }}
                    onClick={() => handleEdit(exp)}
                  />
                </div>
              </Card.Body>
            </Card>
          ))}
        </ul>
      )}

      <ExperienceForm show={showForm} onClose={() => setShowForm(false)} experience={editExperience} />
    </div>
  );
};

export default ExperienceList;
