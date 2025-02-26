import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/actions";
import { Card, Col, Container, Row } from "react-bootstrap";
import {  Pen } from "react-bootstrap-icons";
import MultiProfiles from "./MultiProfiles";
import ModMyProfile from "./ModMyProfile";
import ExperienceForm from "./ExperienceForm";
import ExperienceList from "./ExperienceList";
import MultiProfiles2 from "./MultiProfiles2";

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
        <Col className="col-7">
          <Card className="position-relative">
            <Card.Img style={{height:"13rem"}} variant="top" src="src\assets\images.JPG" />
            <div className="position-absolute" style={{ marginTop: "50px"}}>
              <img className="profileImage" src={profile.image} alt="profile" style={{ border: "solid 5px white", borderRadius: "50%" }} />
            </div>
            <div className="position-absolute end-0 bg-white p-2 m-2" style={{ borderRadius: "60%", height:"40px", width:"40px" }}>
              <Pen onClick={handleOpenModal} className="fs-4 cursore" />
            </div>
            <Card.Body className="mt-4">
              <Card.Title>{`${profile.name} ${profile.surname}`}</Card.Title>
              <Card.Text>{profile.email}</Card.Text>
              <Card.Text>{profile.title}</Card.Text>
            </Card.Body>
          </Card>
          {/* ESPERIENZE LAVORATIVE */}
          <Row className="mt-5">
            <Col>
              
              <ExperienceForm />
              <ExperienceList />
            </Col>
          </Row>
        </Col>
        <Col className="col-3">
          <div className="p-3" style={{backgroundColor:"white", borderRadius:"10px"}}>
            <Row>
              <Col className="col-10">
                <p style={{fontWeight:"bold", fontSize:"20px"}}>Lingua del profilo</p>
                <p>Italiano</p>
              </Col>
              <Col>
                <Pen></Pen>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col className="col-10">
                <p style={{fontWeight:"bold", fontSize:"20px"}}>Profilo pubblico e URL</p>
                <p>...</p>
              </Col>
              <Col>
                <Pen></Pen>
              </Col>
            </Row>
          </div>
          <div className="mt-4">
            <MultiProfiles /> 
          </div>
          <div className="mt-4">
            <MultiProfiles2 /> 
          </div>
          
        </Col>
        
      </Row>

      <ModMyProfile show={showModal} onClose={handleCloseModal} />
    </Container>
  );
}

export default Profile;
