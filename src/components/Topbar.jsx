import { Col, Container, Form, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BellFill, BriefcaseFill, ChatDotsFill, HouseDoorFill } from "react-bootstrap-icons";
import CompanyDropdown from "./CompanyDropdown"; // Importa il nuovo componente

function Topbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <img src="src/assets/logo.png" alt="logo" style={{ height: "40px" }} />
        <Form className="d-flex ms-3" onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col xs="auto">
              <Form.Group className="position-relative">
                <i className="bi bi-search position-absolute top-50 translate-middle-y" style={{ left: "10px" }}></i>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="pl-5"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      // handle form submission here
                    }
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="d-flex flex-column align-items-center me-3">
              <HouseDoorFill className="fs-3" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/lavoro" className="d-flex flex-column align-items-center me-3">
              <BriefcaseFill className="fs-3" /> Lavoro
            </Nav.Link>

            <Nav.Link href="#Messaggistica" className="d-flex flex-column align-items-center mx-2">
              <ChatDotsFill className="fs-3" /> Messaggistica
            </Nav.Link>
            <Nav.Link href="#Notifiche" className="d-flex flex-column align-items-center mx-2">
              <BellFill className="fs-3" /> Notifiche
            </Nav.Link>

            {/* Aggiungi il dropdown delle aziende */}
            <CompanyDropdown className="p-8 mt-3" />

            <NavDropdown title="Profilo" id="basic-nav-dropdown" className="mt-2">
              <NavDropdown.Item as={Link} to="/profile" className="d-flex flex-column align-items-center">
                Profilo
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings" className="d-flex flex-column align-items-center">
                Impostazioni
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="d-flex flex-column align-items-center">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Topbar;
