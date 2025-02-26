import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import LeftSidebar from "./LeftSidebar";

const Lavoro = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/jobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjNGRkZmU3MDMzNzAwMTUzMTZkYjIiLCJpYXQiOjE3NDAzOTM5NTEsImV4cCI6MTc0MTYwMzU1MX0.DNDsfQfCDH4iNF1TEB38fVo-2TAJeFWcYULVBx4YIik",
          },
        });

        if (!response.ok) throw new Error(`Errore ${response.status}: impossibile ottenere i dati`);

        const data = await response.json();
        setJobs(data.slice(0, 10)); // Prendi solo le prime 10 offerte
      } catch (err) {
        console.error("Errore nel recupero dei lavori:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <LeftSidebar />
        </Col>
        <Col md={9}>
          <h2 className="mt-3">Offerte di Lavoro</h2>

          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">⚠️ {error}</Alert>
          ) : (
            <Row>
              {jobs.map((job) => (
                <Col md={6} key={job._id} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>{job.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{job.company_name}</Card.Subtitle>
                      <Card.Text>
                        {job.category} - {job.job_type}
                      </Card.Text>
                      <a href={job.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        Vedi Offerta
                      </a>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Lavoro;
