import { Container } from "react-bootstrap";

const RightSidebar = () => {
  return (
    <>
      <Container className="fs-6 bg-light border rounded-2 ms-3">
        <h4>In primo piano</h4>
        <h5>a cura di linkedln notizie</h5>
        <p>i giovani lavoratori sono sempre meno</p>
        <span>4 giorni fa</span>
        <span>-1.844 lettori</span>
      </Container>
    </>
  );
};

export default RightSidebar;
