import { Card, Button } from "react-bootstrap";

function JobCard({ job }) {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{job.company_name}</Card.Subtitle>
        <Card.Text>
          <strong>Categoria:</strong> {job.category} <br />
          <strong>Tipo di lavoro:</strong> {job.job_type} <br />
          <strong>Location:</strong> {job.candidate_required_location} <br />
          {job.salary && <strong>Stipendio:</strong>} {job.salary || "Non disponibile"} <br />
        </Card.Text>
        <Button variant="primary" href={job.url} target="_blank">
          Dettagli lavoro
        </Button>
      </Card.Body>
    </Card>
  );
}

export default JobCard;
