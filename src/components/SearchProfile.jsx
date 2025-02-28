import { useState, useEffect } from "react";
import { Form, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMultiProfile } from "../redux/actions";
import { Link } from "react-router-dom";
import { PersonPlusFill } from "react-bootstrap-icons";

const UserSearch = () => {
  const [searchName, setSearchName] = useState("");

  const users = useSelector((state) => state.multiProfiles.multiProfiles || []);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMultiProfile());
  }, [dispatch]);

  console.log(users);

  useEffect(() => {
    if (searchName) {
      const filtered = users.filter((user) => user.name?.toLowerCase().includes(searchName.toLowerCase())); // cerca gli utenti in base all'input
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users); // Se i campi sono vuoti mostra tutti gli utenti
    }
  }, [searchName, users]); // Esegui la ricerca ogni volta che cambiano nome, cognome o utenti

  // URL dell'immagine da escludere
  const excludedImage =
    "https://media.licdn.com/dms/image/C5103AQE3z-CoBxoWrQ/profile-displayphoto-shrink_400_400/0/1517284058411?e=1726704000&v=beta&t=M3nQUPHeIG8wdhun3gMmA7LjcJT96JZq1rXIc_hm7j4";

  return (
    <Container className="mt-3">
      <h3>Amplia la tua rete</h3>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Cerca utente..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Row className="mt-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            // Controlla se l'immagine dell'utente è uguale all'URL escluso
            if (user.image === excludedImage) {
              return null; // Non renderizzare la card
            }

            return (
              <Col sm={6} md={4} lg={3} key={user._id} className="mb-3">
                <Card className="mb-3">
                  <Card.Img variant="top" src="src\assets\images.JPG" alt="Background" />
                  <Card.Body
                    className="text-center "
                    style={{
                      position: "relative",
                      bottom: "50px",
                      height: "150px",
                    }}
                  >
                    {user ? (
                      <>
                        <Link to={`/profile/${user._id}`}>
                          <img
                            src={user.image}
                            alt="user"
                            className="rounded-circle border border-white"
                            style={{ width: "50px", aspectRatio: "1", objectFit: "cover" }}
                          />
                        </Link>
                        <Card.Title className="mt-2">
                          <Link className="profileSearch nome-utente" to={`/profile/${user._id}`}>
                            {user.name.slice(0, 12) || "Epicode"} {user.surname?.slice(0, 12) || "Student"}
                          </Link>
                        </Card.Title>
                        <Card.Text className="text-muted" style={{ fontSize: "13px" }}>
                          {user?.title || "Epicoder"}
                        </Card.Text>
                        <button
                          className="text-primary border border-primary px-5 buttonHover"
                          type="button"
                          style={{ backgroundColor: "white", borderRadius: "50px" }}
                        >
                          <PersonPlusFill></PersonPlusFill> Collegati
                        </button>
                      </>
                    ) : (
                      <p className="text-muted">Caricamento profilo...</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <Alert className="mt-3">Nessun utente trovato</Alert>
        )}
      </Row>
    </Container>
  );
};

export default UserSearch;
