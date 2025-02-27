import { useState, useEffect } from "react";
import { Form, ListGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMultiProfile } from "../redux/actions";

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
      const filtered = users.filter((user) => user.name?.toLowerCase().includes(searchName.toLowerCase())); //cerca gli utenti in baso all'input
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users); // Se i campi sono vuoti mostra tutti gli utenti
    }
  }, [searchName, users]); // Esegui la ricerca ogni volta che cambiano nome, cognome o utenti

  return (
    <Container className="mt-3">
      <h3>Ricerca Utente</h3>
      <Form>
        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il nome"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Form.Group>
      </Form>

      <ListGroup className="mt-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <ListGroup.Item key={user._id}>
              <strong>
                {user.name} {user.surname} - <span className="text-primary"> {user.title}</span>
              </strong>
            </ListGroup.Item>
          ))
        ) : (
          <p className="mt-3">Nessun utente trovato</p>
        )}
      </ListGroup>
    </Container>
  );
};

export default UserSearch;
