import { Container, Row, Col, Image} from "react-bootstrap"

const Footer = () => {
    return (
      <>
        <Container className="text-center text-secondary mt-3" style={{ fontSize: "12px" }}>
          <Row>
            <Col>
              <p>
                Informazioni <span className="ms-3">Accesibilità</span>
              </p>
              <p>Centro Assistenza</p>
              <p>Privacy e condizioni</p>
              <p>Opzione per annunci pubblicitari</p>
              <p>
                Pubblicità <span className="ms-3">Servizi alle aziende</span>
              </p>
              <p>
                Scarica l app linkedln <span className="ms-3">Altro</span>{" "}
              </p>
              <p className="" style={{ fontSize: "15px", color: "#1266c2" }}>
                linked
                <img src="src/assets/logo.png" alt="logo" style={{ height: "15px" }} />
                <span className="text-secondary"> Linked Corporation &copy; 2025</span>
              </p>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default Footer