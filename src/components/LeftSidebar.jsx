import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../redux/actions";
import { BookmarkFill, CalendarEvent, Newspaper, PeopleFill, SquareFill } from "react-bootstrap-icons";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile?.content);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <>
      <Card className="mb-3">
        <Card.Img variant="top" src="src\assets\images.JPG" alt="Background" />
        <Card.Body className="text-center " style={{ position: "relative", bottom: "50px", height: "120px" }}>
          {profile ? (
            <>
              <img
                src={profile.image}
                alt="Profile"
                className="rounded-circle border border-white"
                style={{ width: "50px" }}
              />
              <Card.Title className="mt-2">
                {profile.name} {profile.surname}
              </Card.Title>
              <Card.Text className="text-muted" style={{ fontSize: "13px" }}>
                {profile.title}
              </Card.Text>
              <Card.Text className="text-muted" style={{ fontSize: "13px" }}>
                {profile.area}
              </Card.Text>
            </>
          ) : (
            <p className="text-muted">Caricamento profilo...</p>
          )}
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Container style={{ fontSize: "12px", fontWeight: "500" }} className="mt-2">
          <Row>
            <Col md={9}>
              <p>Visitatori Nel Profilo</p>
              <p>Visualizza analisi</p>
            </Col>
            <Col>
              <p className="text-primary">16</p>
            </Col>
          </Row>
        </Container>
      </Card>
      <Card className="mb-3 " style={{ fontSize: "13px" }}>
        <p className="mt-3 ms-3">Raggiungi nuove vette professionali con premium</p>
        <p className="ms-2" style={{ fontWeight: "600" }}>
          <SquareFill className="m-1" style={{ color: "#E7A33E" }}></SquareFill>Prova di nuovo con 0€
        </p>
      </Card>
      <Card className="mb-3" style={{ fontSize: "13px" }}>
        <p className="ms-2 mt-3" style={{ fontWeight: "600" }}>
          <BookmarkFill className="m-1 "></BookmarkFill>Elementi Salvati
        </p>
        <p className="ms-2" style={{ fontWeight: "600" }}>
          <PeopleFill className="m-1"></PeopleFill>Gruppi
        </p>
        <p className="ms-2" style={{ fontWeight: "600" }}>
          <Newspaper className="m-1"></Newspaper>NewsLetter
        </p>
        <p className="ms-2" style={{ fontWeight: "600" }}>
          <CalendarEvent className="m-1"></CalendarEvent>Eventi
        </p>
      </Card>
    </>
  );
};

export default LeftSidebar;
