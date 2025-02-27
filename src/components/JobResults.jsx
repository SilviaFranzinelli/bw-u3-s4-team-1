import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchJobsFailure, fetchJobsStart, fetchJobsSuccess } from "../redux/reducers/jobSlice";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import JobCard from "./JobCard";
import LeftSidebar from "./LeftSidebar";

const JobResults = () => {
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
        dispatch(fetchJobsSuccess(data.data.slice(0, 10)));
      } catch (err) {
        dispatch(fetchJobsFailure(err.message));
      }
    };

    fetchJobs();
  }, [dispatch, query, category, company]);

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <LeftSidebar /> {/* Sidebar */}
        </Col>
        <Col md={9}>
          <h2 className="mb-4">Risultati della ricerca</h2>

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
                  <Col md={12} key={job._id} className="mb-4">
                    <JobCard job={job} /> {/* Componente per visualizzare ogni singola offerta */}
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

export default JobResults;
