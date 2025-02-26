import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchJobsFailure, fetchJobsStart, fetchJobsSuccess } from "../redux/reducers/jobSlice";
import { Card, Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import LeftSidebar from "./LeftSidebar";

const Lavoro = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Ottieni i parametri dalla query
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";
  const company = searchParams.get("company") || "";

  useEffect(() => {
    const fetchJobs = async () => {
      dispatch(fetchJobsStart()); // Impostiamo lo stato di caricamento
      try {
        let url = `https://strive-benchmark.herokuapp.com/api/jobs?search=${query}`;
        if (category) url += `&category=${category}`;
        if (company) url += `&company=${company}`;

        // Fetch dei dati
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Errore ${response.status}: impossibile ottenere i dati`);

        const data = await response.json();

        // Limitiamo i risultati a 10
        dispatch(fetchJobsSuccess(data.slice(0, 10)));
      } catch (err) {
        dispatch(fetchJobsFailure(err.message));
      }
    };

    // Eseguiamo la chiamata ogni volta che cambiano i parametri di ricerca
    fetchJobs();
  }, [dispatch, query, category, company]);

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <LeftSidebar />
        </Col>
        <Col md={9}>
          <h2 className="mt-3">Offerte di Lavoro</h2>

          {/* Caricamento */}
          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">⚠️ {error}</Alert> // Mostriamo eventuali errori
          ) : (
            <Row>
              {jobs.length === 0 ? (
                <Col>
                  <Alert variant="info">Nessuna offerta di lavoro trovata.</Alert>
                </Col>
              ) : (
                jobs.map((job) => (
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
                ))
              )}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Lavoro;
