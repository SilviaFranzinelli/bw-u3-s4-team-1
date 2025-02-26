import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CompanyDropdown.css";
import {
  
  BarChartFill,
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
        <Row className="w-100 p-3 " >
          <Col xs={6} className="left-list" >
            <h2 style={{color:"black"}}>Le mie app</h2>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/explore" >
                <People className="me-2 fs-4" style={{color:"#0A66C2"}} /> Trova nuovi clienti
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/followed ">
                <UniversalAccessCircle className="me-2 fs-4" style={{color:"#0A66C2"}} /> Gruppi
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/explore" >
                <FileText className="me-2 fs-4" style={{color:"#0A66C2"}} /> Talent
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/followed ">
                <Clipboard className="me-2 fs-4" style={{color:"#0A66C2"}} /> Talent Insights
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item p-0" to="/companies/explore" >
                <BarChartFill className="me-2 mx-1 " style={{color:"#0A66C2", fontSize:"2.5rem"}} /> Pubblica un’offerta di lavoro
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/followed ">
                <CloudUpload className="me-2 fs-4" style={{color:"#0A66C2"}} /> Vendite
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/explore" >
                <Gear className="me-2 fs-4" style={{color:"#0A66C2"}} /> Marketplace dei servizi
              </Link>
            </li>
          </Col>

          {/* Colonna destra */}
          <Col xs={6} className="right-list">
            <h2 style={{color:"black"}}>Scopri altro per il business</h2>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/followed ">
                <Briefcase className="me-2 fs-4" style={{color:"#0A66C2"}} /> Assumi su LinkedIn
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/explore" >
                <BarChartFill className="me-2 fs-4" style={{color:"#0A66C2"}} /> Trova, attrai e assumi
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/followed ">
                <Clipboard className="me-2 fs-4" style={{color:"#0A66C2"}} /> Vendi con LinkedIn
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/explore" >
                <FileText className="me-2 fs-4" style={{color:"#0A66C2"}} /> Offerta di lavoro gratuita
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/followed ">
                <CloudUpload className="me-2 fs-4" style={{color:"#0A66C2"}} /> Fai pubblicità su LinkedIn
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/explore" >
                <Gear className="me-2 fs-4" style={{color:"#0A66C2"}} /> Inizia con Premium
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/explore" >
                <Gear className="me-2 fs-4" style={{color:"#0A66C2"}} /> Impara con LinkedIn
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/explore" >
                <BarChartFill className="me-2 fs-4" style={{color:"#0A66C2"}} /> Admin Center
              </Link>
            </li>
            <li>
              <Link style={{color:"black"}} className="dropdown-item" to="/companies/create"> 
                <PlusCircle className="me-2 fs-4" style={{color:"#0A66C2"}} /> Crea una pagina aziendale
              </Link>
            </li>
          </Col>
        </Row>

        <hr className="dropdown-divider" />
        <li>
          <Link style={{color:"black"}} className="dropdown-item" to="/companies/explore" >
            Esplora di più
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default CompanyDropdown;
