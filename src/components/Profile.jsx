import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/actions";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import MultiProfiles from "./MultiProfiles";
import ModMyProfile from "./ModMyProfile";
import ExperienceForm from "./ExperienceForm";
import ExperienceList from "./ExperienceList";

function Profile() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false); // Stato per mostrare il modal
  const profile = useSelector((state) => state.profile.content);

  useEffect(() => {
    dispatch(getProfile()); // Fetch del profilo quando il componente viene montato
  }, [dispatch]);

  if (!profile) {
    return <p>Caricamento...</p>;
  }

  const handleOpenModal = () => {
    setShowModal(true); // Mostra il modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Chiudi il modal
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card className="position-relative">
            <Card.Img variant="top" src="https://fastly.picsum.photos/id/569/180/100.jpg?hmac=6mJtfv29xTFKnoJek41sH5-F4br3ykBkqLCx-Zrov60" />
            <div className="position-absolute" style={{ marginTop: "150px" }}>
              <img className="profileImage" src={profile.image} alt="profile" style={{ border: "solid 5px white", borderRadius: "50%" }} />
            </div>
            <div className="position-absolute end-0 bg-white p-2 m-2" style={{ borderRadius: "60%" }}>
              <Pencil onClick={handleOpenModal} className="fs-5 cursore" />
            </div>
            <Card.Body className="mt-4">
              <Card.Title>{`${profile.name} ${profile.surname}`}</Card.Title>
              <Card.Text>{profile.email}</Card.Text>
              <Card.Text>{profile.title}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
        <MultiProfiles />
      </Row>

      {/* Sezione Esperienze Lavorative */}
      <Row className="mt-5">
        <Col>
          <h2 className="text-center">Esperienze Lavorative</h2>
          <ExperienceForm />
          <ExperienceList />
        </Col>
      </Row>

      <ModMyProfile show={showModal} onClose={handleCloseModal} />
    </Container>
  );
}

export default Profile;
