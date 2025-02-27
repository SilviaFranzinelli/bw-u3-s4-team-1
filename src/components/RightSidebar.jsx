import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { CaretDownFill, CaretRight, InfoSquareFill, ThreeDots, SquareFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/actions";
import Footer from "./Footer";

const fetchNews = async () => {
  const response = await fetch("https://striveschool-api.herokuapp.com/api/posts/", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjODAzY2U3MDMzNzAwMTUzMTZkYzMiLCJpYXQiOjE3NDA0MDY4NDQsImV4cCI6MTc0MTYxNjQ0NH0.4fknwRLe2tmoKmoSP81D4CinwAmOjuCWqpEittyiZXw",
    },
  });
  const data = await response.json();
  return data;
};

const getRandomNews = (news, count) => {
  const shuffled = news.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const RightSidebar = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile?.content);
  const [news, setNews] = useState([]);

  useEffect(() => {
    dispatch(getProfile());

    const loadNews = async () => {
      const fetchedNews = await fetchNews();
      const randomNews = getRandomNews(fetchedNews, 6);
      setNews(randomNews);
    };

    loadNews();
  }, [dispatch]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("it-IT", options);
  };

  return (
    <>
      <Container className="bg-light border rounded-2">
        <Row className="mt-2">
          <Col md={9}>
            <h5 className="mt-2" style={{ fontSize: "17px" }}>
              In primo piano
            </h5>
          </Col>
          <Col>
            <InfoSquareFill></InfoSquareFill>
          </Col>
        </Row>
        <h6 className="text-secondary">a cura di LinkedIn notizie</h6>

        <Col>
          {news.map((item) => (
            <div key={item._id}>
              <p style={{ position: "relative", top: "20px" }}>{item.text}</p>
              <span style={{ fontSize: "10px" }}>{formatDate(item.createdAt)}</span>
              {/* <span style={{ fontSize: "10px" }}> - {item.updatedAt} lettori</span> */}
            </div>
          ))}
        </Col>
        <Button className="bg-transparent border-0 text-dark p-0 mt-3">
          Vedi altro <CaretDownFill></CaretDownFill>
        </Button>

        <h6 className="text-secondary mt-3">I giochi di oggi </h6>
        <Container className="mt-4">
          <Row>
            <Col>
              <Image src="https://static.licdn.com/aero-v1/sc/h/im5l00imv9odauybfemlfxm6" alt="logo gioco"></Image>
            </Col>
            <Col style={{ fontSize: "15px", position: "relative", right: "15px" }} md={7}>
              <p>TJANGO</p>
              <p style={{ fontSize: "10px", position: "relative", bottom: "20px" }} className="text-secondary">
                Armonizza la griglia
              </p>
            </Col>
            <Col>
              <CaretRight></CaretRight>
            </Col>
          </Row>
        </Container>
        <Container style={{ position: "relative", bottom: "20px" }} className="mb-0">
          <Row>
            <Col>
              <Image src="https://static.licdn.com/aero-v1/sc/h/25itbd3dpc6ockbgvdhot9qp1" alt="logo gioco"></Image>
            </Col>
            <Col style={{ fontSize: "15px", position: "relative", right: "15px" }} md={7}>
              <p>QUEENS</p>
              <p style={{ fontSize: "10px", position: "relative", bottom: "20px" }} className="text-secondary">
                Incorona ogni regione
              </p>
            </Col>
            <Col>
              <CaretRight></CaretRight>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container style={{ position: "sticky", top: "10px" }}>
        <Container className="bg-light border rounded-2 mt-3">
          <Col className="text-end">
            <p>
              Annuncio{" "}
              <span>
                <ThreeDots></ThreeDots>
              </span>
            </p>
          </Col>
          <Container className="text-center ">
            <Row>
              {profile ? (
                <>
                  <Col md={12}>
                    <p className="text-center text-secondary" style={{ fontSize: "12px" }}>
                      {profile.name}, unlock your full potential with LinkedIn Premium
                    </p>
                  </Col>
                  <Col>
                    <Image
                      src={profile.image}
                      alt="image profile"
                      style={{ width: "50px" }}
                      className="rounded-5"
                    ></Image>
                    <span className="ms-2" style={{ fontSize: "12px" }}>
                      <SquareFill className="m-1" style={{ color: "#E7A33E" }}></SquareFill>Premium
                    </span>
                    <p className="mt-2"> Reactivate your premium free trial today</p>
                    <Button
                      variant="outline rounded-5 mb-3"
                      style={{ color: "blue", borderColor: "blue", fontWeight: "500" }}
                    >
                      Retry for free
                    </Button>
                  </Col>
                </>
              ) : (
                <p className="text-muted">Caricamento profilo...</p>
              )}
            </Row>
          </Container>
        </Container>
        <Footer></Footer>
      </Container>
    </>
  );
};

export default RightSidebar;
