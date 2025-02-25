import { Container, Row, Col } from "react-bootstrap";
import RightSidebar from "./RightSidebar";
import LeftSidebar from "./LeftSidebar";
import MainContent from "./MainContent";


const Home = () => {
  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={2} className="">
          <LeftSidebar></LeftSidebar>
        </Col>
        <Col md={6} className="">
          <MainContent></MainContent>
        </Col>
        <Col md={3} className="">
          <RightSidebar></RightSidebar>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
