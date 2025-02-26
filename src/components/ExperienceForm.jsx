import { useDispatch } from "react-redux";
import { newExp } from "../redux/actions/newExp";
import { myExperiences } from "../redux/actions/exprerience";
import { fetchDeleteExp } from "../redux/actions/deleteExp";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ExperienceForm = ({ show, onClose, experience }) => {
  const dispatch = useDispatch();

  // Stato per i campi del form
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("");

  useEffect(() => {
    if (experience) {
      setRole(experience.role || "");
      setCompany(experience.company || "");
      setDescription(experience.description || "");
      setPeriod(experience.startDate && experience.endDate ? `${experience.startDate.split("-")[0]}-${experience.endDate.split("-")[0]}` : "");
    } else {
      setRole("");
      setCompany("");
      setDescription("");
      setPeriod("");
    }
  }, [experience]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role || !company || !period) return;

    const newExperience = {
      role,
      company,
      description,
      startDate: period.split("-")[0] + "-01-01",
      endDate: period.split("-")[1] ? period.split("-")[1] + "-12-31" : null,
    };

    dispatch(newExp(newExperience));
    dispatch(myExperiences());

    onClose();
  };

  const handleDelete = () => {
    if (experience) {
      dispatch(fetchDeleteExp(experience._id));
      dispatch(myExperiences());
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{experience ? "Modifica Esperienza" : "Aggiungi Esperienza"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Ruolo</Form.Label>
            <Form.Control type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Azienda</Form.Label>
            <Form.Control type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Periodo (es. 2020-2023)</Form.Label>
            <Form.Control type="text" value={period} onChange={(e) => setPeriod(e.target.value)} required />
          </Form.Group>

          <div className="d-flex justify-content-between">
            {experience && (
              <Button variant="danger" onClick={handleDelete}>
                Elimina
              </Button>
            )}
            <div className="d-flex">
              <Button variant="secondary" onClick={onClose} className="me-2">
                Annulla
              </Button>
              <Button type="submit" style={{ borderRadius: "50px", backgroundColor: "#0A66C2", border: "none" }}>
                {experience ? "Salva" : "Aggiungi"}
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExperienceForm;
