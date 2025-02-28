import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/actions";
import { Card, Col, Container, Row, Button, CloseButton } from "react-bootstrap";
import {
  ArrowRightShort,
  BarChartLineFill,
  EyeFill,
  Pen,
  PeopleFill,
  Search,
  ShieldCheck,
} from "react-bootstrap-icons";
import MultiProfiles from "./MultiProfiles";
import ModMyProfile from "./ModMyProfile";
import ExperienceList from "./ExperienceList";
import MultiProfiles2 from "./MultiProfiles2";
import Footer from "./Footer";

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
            <Card.Img style={{ height: "13rem" }} variant="top" src="src\assets\images.JPG" />
            <div className="position-absolute" style={{ marginTop: "50px" }}>
              <img
                className="profileImage"
                src="https://festivaldellatv.it/wp-content/uploads/2024/05/FTV23_SCOTTI-458x458.png"
                alt="profile"
                style={{ border: "solid 5px white", borderRadius: "50%" }}
              />
            </div>
            <div
              className="position-absolute end-0 bg-white p-2 m-2"
              style={{ borderRadius: "60%", height: "40px", width: "40px" }}
            >
              <Pen onClick={handleOpenModal} className="fs-4 cursore" style={{ color: "#1266C2" }} />
            </div>
            <Card.Body className="mt-4">
              <Card.Title>
                {`${profile.name} ${profile.surname}`}{" "}
                <span>
                  {" "}
                  <Button
                    variant="outline-primary"
                    style={{ border: "1px dashed #1266C2", color: "#1266C2" }}
                    className="rounded-5 ms-5 p-1"
                  >
                    <ShieldCheck style={{ color: "#1266C2" }} className="fs-5"></ShieldCheck> Aggiungi un badge di
                    verifica
                  </Button>
                </span>
              </Card.Title>
              <Card.Text>{profile.email}</Card.Text>
              <Card.Text>{profile.title}</Card.Text>
              <Card.Text>
                {profile.area} • <span style={{ color: "#1266C2" }}>Informazioni di contatto</span>
              </Card.Text>
              <Card.Text style={{ color: "#1266C2" }}>324 contatti</Card.Text>
            </Card.Body>
            <Container>
              <Row>
                <Col>
                  <Button className="rounded-5" style={{ backgroundColor: "#1266C2" }}>
                    Disponibile per
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="rounded-5"
                    variant="outline-primary"
                    style={{ border: "1px solid #1266c2", color: "#1266c2" }}
                  >
                    Aggiungi sezione
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="rounded-5"
                    variant="outline-primary"
                    style={{ border: "1px solid #1266c2", color: "#1266c2" }}
                  >
                    Migliora profilo
                  </Button>
                </Col>
                <Col>
                  <Button className="rounded-5" variant="outline-secondary">
                    Risorse
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="p-2 m-4 rounded-2" style={{ backgroundColor: "#DDE7F1" }}>
                  <Col className="d-flex justify-content-between">
                    <p style={{ fontWeight: "500" }}>Disponibile a lavorare</p>
                    <Pen onClick={handleOpenModal} className="fs-4 cursore" style={{ width: "18px" }} />
                  </Col>
                  <p>Rouli di {profile.title}</p>
                  <span style={{ color: "#1266C2", position: "relative", bottom: "10px" }}>Mostra dettagli</span>
                </Col>
                <Col className="p-2 m-4 rounded-2 border">
                  <Col className="d-flex justify-content-between">
                    <h7 style={{ fontWeight: "500" }}>
                      Fai sapere ai recuter interni che ti interessano offerte di lavoro presso la tua azienda attuale
                    </h7>
                    <CloseButton className="fs-4 cursore" style={{ width: "5px", height: "5px" }} />
                  </Col>

                  <span style={{ color: "#1266C2", position: "relative", bottom: "0px" }}>Inizia</span>
                </Col>
              </Row>
            </Container>
          </Card>
          <Card className="mt-2">
            <Container>
              <Row>
                <h5 className="mt-4">Analisi</h5>
                <Col>
                  <EyeFill className="text-secondary"></EyeFill>
                  <span className="text-secondary" style={{ fontWeight: "300", fontSize: "15px" }}>
                    {" "}
                    Solo per te
                  </span>
                  <Container className="border-bottom ">
                    <Row>
                      <Col>
                        <Col>
                          <PeopleFill></PeopleFill>
                          <span className="fw-bolder"> 16 Visualizzazioni</span>
                          <p>Scopri chi ha visitato il tuo profilo.</p>
                        </Col>
                        <Col></Col>
                      </Col>
                      <Col>
                        <BarChartLineFill></BarChartLineFill>
                        <span className="fw-bolder"> 10 impressioni nel post </span>
                        <p>Crea un post per aumentare l’interesse.</p>
                      </Col>
                      <Col>
                        <Search></Search>
                        <span className="fw-bolder">17 comparse nei motori </span>
                        <p>Vedi quante volte compari nei risultati di ricerca.</p>
                      </Col>
                    </Row>
                  </Container>
                  <Container className="text-center mt-2">
                    <h6>
                      Mostra tutte le analisi <ArrowRightShort></ArrowRightShort>
                    </h6>
                  </Container>
                </Col>
              </Row>
            </Container>
          </Card>
          <Card className="mt-2">
            <Container>
              <Row>
                <h5 className="mt-4"> Informazioni </h5>
                <p>{profile.bio}</p>
              </Row>
            </Container>
          </Card>
          {/* ESPERIENZE LAVORATIVE */}
          <Row className="mt-2">
            <Col>
              <ExperienceList />
            </Col>
          </Row>
        </Col>
        <Col className="col-3">
          <div className="p-3 border" style={{ backgroundColor: "white", borderRadius: "10px" }}>
            <Row>
              <Col className="col-10">
                <p style={{ fontWeight: "bold", fontSize: "20px" }}>Lingua del profilo</p>
                <p>Italiano</p>
              </Col>
              <Col>
                <Pen className="cursore"></Pen>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col className="col-10">
                <p style={{ fontWeight: "bold", fontSize: "20px" }}>Profilo pubblico e URL</p>
                <p>...</p>
              </Col>
              <Col>
                <Pen className="cursore"></Pen>
              </Col>
            </Row>
          </div>
          <div className="mt-4">
            <MultiProfiles />
          </div>
          <div className="mt-4">
            <MultiProfiles2 />
          </div>
          <Footer></Footer>
        </Col>
      </Row>

      <ModMyProfile show={showModal} onClose={handleCloseModal} />
    </Container>
  );
}

export default Profile;
