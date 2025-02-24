import { Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from "react-bootstrap"
import { BellFill, BriefcaseFill, ChatDotsFill, HouseDoorFill, PeopleFill } from "react-bootstrap-icons"

function Topbar(){
    return(
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <img src="src\assets\logo.png" alt="logo" style={{height: "40px"}}/>
        <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home"><HouseDoorFill className="fs-3"></HouseDoorFill> Home</Nav.Link>
            <Nav.Link href="#rete"><PeopleFill className="fs-3"></PeopleFill> Rete</Nav.Link>
            <Nav.Link href="#lavoro"><BriefcaseFill className="fs-3"></BriefcaseFill> Lavoro</Nav.Link>
            <Nav.Link href="#Messaggistica"><ChatDotsFill className="fs-3"></ChatDotsFill> Messaggistica</Nav.Link>
            <Nav.Link href="#Notifiche"><BellFill className="fs-3"></BellFill> Notifiche</Nav.Link>
            <img src="#" alt="profilo" style={{borderRadius: "50%"}}/>
            <NavDropdown title="Profilo" id="basic-nav-dropdown">
               
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default Topbar