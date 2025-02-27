import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, ListGroup } from "react-bootstrap";
import { Envelope, Search } from "react-bootstrap-icons";
import LeftSidebar from "./LeftSidebar";

function Messaggistica() {
  const [conversations] = useState([
    { id: 1, name: "Giovanni Rossi", lastMessage: "Ciao, come va?", time: "2 ore fa" },
    { id: 2, name: "Maria Bianchi", lastMessage: "Hai aggiornamenti?", time: "3 ore fa" },
    { id: 3, name: "Luca Verdi", lastMessage: "Ci vediamo domani?", time: "1 giorno fa" },
  ]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Puoi implementare la logica per inviare il messaggio
      console.log("Messaggio inviato:", message);
      setMessage("");
    }
  };

  return (
    <Container fluid className="my-3">
      <Row>
        <Col md={3}>
          <LeftSidebar />
        </Col>
        <Col md={9} className="d-flex flex-column">
          <Card className="mb-4">
            <Card.Body>
              <Form.Group className="d-flex">
                <Form.Control type="text" placeholder="Cerca conversazioni" value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button variant="outline-secondary" className="ms-2">
                  <Search />
                </Button>
              </Form.Group>
            </Card.Body>
          </Card>

          <ListGroup variant="flush" className="mb-4">
            {conversations
              .filter((conv) => conv.name.toLowerCase().includes(search.toLowerCase()))
              .map((conv) => (
                <ListGroup.Item
                  key={conv.id}
                  className="cursor-pointer"
                  active={selectedConversation?.id === conv.id}
                  onClick={() => handleSelectConversation(conv)}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{conv.name}</strong>
                      <p className="text-muted mb-0">{conv.lastMessage}</p>
                    </div>
                    <span className="text-muted">{conv.time}</span>
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>

          {selectedConversation ? (
            <Card className="mb-4">
              <Card.Header>{selectedConversation.name}</Card.Header>
              <Card.Body>
                <div style={{ height: "300px", overflowY: "scroll" }}>
                  {/* Qui andranno i messaggi della conversazione */}
                  <div>
                    <p>
                      <strong>Tu:</strong> Ciao, come va?
                    </p>
                    <p>
                      <strong>{selectedConversation.name}:</strong> Tutto bene, grazie!
                    </p>
                  </div>
                </div>
                <Form className="mt-3" onSubmit={(e) => e.preventDefault()}>
                  <Form.Group className="d-flex">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Scrivi un messaggio..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button variant="primary" className="ms-2" onClick={handleSendMessage}>
                      Invia
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Card className="mb-4">
              <Card.Body className="text-center">
                <Envelope className="fs-1 text-muted" />
                <p className="text-muted">Seleziona una conversazione per visualizzare i messaggi.</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Messaggistica;
