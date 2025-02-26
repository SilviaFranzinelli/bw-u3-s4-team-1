import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CompanyDropdown.css";
import {
  BarChart,
  Briefcase,
  Building,
  Clipboard,
  CloudUpload,
  FileText,
  Gear,
  People,
  PlusCircle,
  UniversalAccessCircle,
} from "react-bootstrap-icons";

function CompanyDropdown() {
  return (
    <div className="dropdown mt-3">
      <div className="dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
        <Building className="fs-3" /> Aziende
      </div>
      <ul className="dropdown-menu dropdown-menu-lg-end">
        {/* Colonna sinistra */}
        <Row className="w-100">
          <Col xs={6} className="left-list">
            <h2>Le mie app</h2>
            <li>
              <Link className="dropdown-item" to="/companies/explore">
                <People className="me-2" /> Trova nuovi clienti
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/followed">
                <UniversalAccessCircle className="me-2" /> Gruppi
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/explore">
                <FileText className="me-2" /> Talent
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/followed">
                <Clipboard className="me-2" /> Talent Insights
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/explore">
                <BarChart className="me-2" /> Pubblica un’offerta di lavoro
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/followed">
                <CloudUpload className="me-2" /> Vendite
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/explore">
                <Gear className="me-2" /> Marketplace dei servizi
              </Link>
            </li>
          </Col>

          {/* Colonna destra */}
          <Col xs={6} className="right-list">
            <h2>Scopri altro per il business</h2>
            <li>
              <Link className="dropdown-item" to="/companies/followed">
                <Briefcase className="me-2" /> Assumi su LinkedIn
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/explore">
                <BarChart className="me-2" /> Trova, attrai e assumi
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/followed">
                <Clipboard className="me-2" /> Vendi con LinkedIn
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/explore">
                <FileText className="me-2" /> Offerta di lavoro gratuita
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/followed">
                <CloudUpload className="me-2" /> Fai pubblicità su LinkedIn
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/explore">
                <Gear className="me-2" /> Inizia con Premium
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/explore">
                <Gear className="me-2" /> Impara con LinkedIn
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/explore">
                <BarChart className="me-2" /> Admin Center
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/companies/create">
                <PlusCircle className="me-2" /> Crea una pagina aziendale
              </Link>
            </li>
          </Col>
        </Row>

        <hr className="dropdown-divider" />
        <li>
          <Link className="dropdown-item" to="/companies/explore">
            Esplora di più
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default CompanyDropdown;
