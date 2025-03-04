import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Per aggiornare l'URL
import { Col, Container, Form, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BellFill, BriefcaseFill, ChatDotsFill, HouseDoorFill, PeopleFill, Search } from "react-bootstrap-icons";
import CompanyDropdown from "./CompanyDropdown";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../redux/actions";


function Topbar() {
  const [activeIcon, setActiveIcon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category] = useState(""); // Stato per la categoria
  const [company] = useState(""); // Stato per l'azienda
  const navigate = useNavigate(); // Hook per navigare


    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.content);

      useEffect(() => {
        dispatch(getProfile()); // Fetch del profilo quando il componente viene montato
      }, [dispatch]);
     if (!profile) {
       return <p>Caricamento...</p>;
     }

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Log per verificare la query
    console.log("Search Term:", searchTerm);
    console.log("Category:", category);
    console.log("Company:", company);

    // Costruisci la query con i parametri di ricerca
    let queryParams = `query=${searchTerm}`;
    if (category) queryParams += `&category=${category}`;
    if (company) queryParams += `&company=${company}`;

    // Log per verificare l'URL generato
    console.log("Navigating to:", `/lavoro?${queryParams}`);

    // Naviga alla pagina dei risultati con i parametri di ricerca
    navigate(`/lavoro?${queryParams}`);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to={"/"}>
          <img src="src/assets/logo.png" alt="logo" style={{ height: "40px" }} />
        </Link>
        <Form className="d-flex ms-3" onSubmit={handleSearch}>
          <Row>
            <Col xs="auto">
              <Form.Group className="position-relative">
                {/* <i className="bi bi-search position-absolute top-50 translate-middle-y bg-dark" style={{ left: "10px" }}></i> */}
                <Search style={{ position: "absolute", top: "10px", left: "170px" }}></Search>
                <Form.Control type="text" placeholder="Cerca lavori..." className="pl-5" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </Form.Group>
            </Col>
            {/* <Col xs="auto">
              <Button type="submit" className="btn btn-primary">
                Cerca
              </Button>
            </Col> */}
          </Row>
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={`d-flex flex-column align-items-center me-3 ${activeIcon === "home" ? "active" : ""}`}
              onClick={() => handleIconClick("home")}
            >
              <HouseDoorFill className="fs-3" /> Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/search"
              className={`d-flex flex-column align-items-center me-3 ${activeIcon === "Rete" ? "active" : ""}`}
              onClick={() => handleIconClick("Rete")}
            >
              <PeopleFill className="fs-3" /> Rete
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/lavoro"
              className={`d-flex flex-column align-items-center  ${activeIcon === "lavoro" ? "active" : ""}`}
              onClick={() => handleIconClick("lavoro")}
            >
              <BriefcaseFill className="fs-3" /> Lavoro
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/messaggistica" // Cambiato il link da #Messaggistica a /messaggistica
              className={`d-flex flex-column align-items-center  ${activeIcon === "messaggistica" ? "active" : ""}`}
              onClick={() => handleIconClick("messaggistica")}
            >
              <ChatDotsFill className="fs-3" /> Messaggistica
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="#Notifiche"
              className={`d-flex flex-column align-items-center mx-2 ${activeIcon === "notifiche" ? "active" : ""}`}
              onClick={() => handleIconClick("notifiche")}
            >
              <BellFill className="fs-3" /> Notifiche
            </Nav.Link>
            <CompanyDropdown className="p-8 mt-3" />
            <img
              className="profileImage"
              src={profile.image}
              alt="profile"
              style={{ border: "solid 5px white", borderRadius: "50%", width: "50px", height:"50px", marginTop: "5px" }}
            />
            <NavDropdown title={profile.name} id="basic-nav-dropdown" className="mt-2">
              <NavDropdown.Item as={Link} to="/profile" className="d-flex flex-column align-items-center">
                <img
                  className="profileImage"
                  src={profile.image}
                  alt="profile"
                  style={{ border: "solid 5px white", borderRadius: "50%", width: "60px", margin: "0" }}
                />
                {profile.name}
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
