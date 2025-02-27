import { useState, useEffect } from "react";
import { Form, Container, Row, Col, Card, CardText, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMultiProfile } from "../redux/actions";
import { Link } from "react-router-dom";

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
      <h3>Ricerca Utente</h3>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Inserisci il nome..."
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
              <Col sm={12} md={6} lg={4} key={user._id} className="mb-3 w-25">
                <Card>
                  <Card.Img
                    variant="top"
                    src={user.image || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                    alt={`${user.name} ${user.surname}`}
                  />
                  <Card.Body>
                    <Card.Title>
                      <Link className="profileSearch" to={`/profile/${user._id}`}>
                        <strong>
                          {user.name} {user.surname}
                        </strong>
                        <CardText className="text-dark"> {user.title}</CardText>
                      </Link>
                    </Card.Title>
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
