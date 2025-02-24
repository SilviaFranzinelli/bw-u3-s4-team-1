import { Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BellFill, BriefcaseFill, ChatDotsFill, HouseDoorFill,} from "react-bootstrap-icons";

function Topbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <img src="src/assets/logo.png" alt="logo" style={{ height: "40px" }} />
        <Form className="d-flex">
          <Row>
            <Col xs="auto">
              <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
            </Col>
            <Col xs="auto">
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <HouseDoorFill className="fs-3" /> Home
            </Nav.Link>

            <Nav.Link href="#lavoro">
              <BriefcaseFill className="fs-3" /> Lavoro
            </Nav.Link>
            <Nav.Link href="#Messaggistica">
              <ChatDotsFill className="fs-3" /> Messaggistica
            </Nav.Link>
            <Nav.Link href="#Notifiche">
              <BellFill className="fs-3" /> Notifiche
            </Nav.Link>
            <NavDropdown title="Profilo" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">
                Profilo
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings">
                Impostazioni
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Topbar;
