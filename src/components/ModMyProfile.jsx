import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal, FloatingLabel, } from "react-bootstrap";
import { modProfile } from "../redux/actions/ModMyProfile";

function ModMyProfile({ show, onClose }) {
  const [localProfile, setLocalProfile] = useState({});
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.content);

  useEffect(() => {
    dispatch(modProfile()); // Fetch del profilo quando il componente viene montato
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setLocalProfile(profile); // Aggiorna il profilo locale ogni volta che il profilo globale cambia
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(localProfile);
    dispatch(modProfile(localProfile)); // Passa il profilo aggiornato all'azione Redux
    onClose(); // Chiudi il modal dopo aver salvato
  };

  const handleChange = (e) => {
    setLocalProfile({ ...localProfile, [e.target.name]: e.target.value });
  };

  if (!profile) {
    return <p>Caricamento...</p>;
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Profilo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="name" value={localProfile.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cognome</Form.Label>
            <Form.Control type="text" name="surname" value={localProfile.surname} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={localProfile.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Add image</Form.Label>
            <Form.Control type="text" name="image" value={localProfile.image} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Professione</Form.Label>
            <Form.Control type="text" name="title" value={localProfile.title} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Località / Regione / Nazione</Form.Label>
            <Form.Control type="text" name="area" value={localProfile.area} onChange={handleChange} />
          </Form.Group>
          <FloatingLabel controlId="floatingBio" label="Aggiungi descrizione">
            <Form.Control
              type="text"
              name="bio"
              value={localProfile.bio}
              onChange={handleChange}
              placeholder="Aggiungi descrizione"
              style={{ height: "100px" }}
            />
          </FloatingLabel>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Annulla
            </Button>
            <Button variant="primary" type="submit">
              Salva
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModMyProfile;
