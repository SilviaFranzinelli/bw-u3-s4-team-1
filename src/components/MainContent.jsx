import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfile } from "../redux/actions";
import { fetchPosts } from "../redux/reducers/postSlice";
import { Container, Row, Col } from "react-bootstrap";
import { CalendarEvent, Image, Newspaper } from "react-bootstrap-icons";
import { newPost } from "../redux/actions/newPost";

const MainContent = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const profile = useSelector((state) => state.profile?.content);
  const posts = useSelector((state) => state.posts?.content);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    console.log("Profile:", profile);
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("handleSubmit");

    if (!text) return;
    const newPosts = {
      text,
    };

    dispatch(newPost(newPosts));

    setText("");
  };

  return (
    <>
      <Container className="bg-light border rounded-2">
        <Container className="mt-2">
          <Row>
            <Col className="mt-1" md={1}>
              {profile ? (
                <>
                  <img
                    src={profile.image}
                    alt="Profile"
                    className="rounded-circle border border-white"
                    style={{ width: "50px" }}
                  />
                  <p className="mt-1" style={{ fontSize: "12px", fontWeight: "bold" }}>
                    {profile.username}
                  </p>
                </>
              ) : (
                <p className="text-muted">Caricamento profilo...</p>
              )}
            </Col>
            <Col md={11} className="mt-2">
              <form onSubmit={handleSubmit}>
                <input
                  className="border border-secondary text-dark bg-light rounded-5 text-start py-2 "
                  style={{ width: "100%" }}
                  placeholder="Crea un post"
                  onChange={(e) => setText(e.target.value)}
                ></input>
              </form>
            </Col>
          </Row>
        </Container>
        <Container className="mt-3 text-secondary" style={{ fontSize: "14px" }}>
          <Row>
            <Col md={5}>
              <p className="ms-2" style={{ fontWeight: "600" }}>
                <Image className="m-1 text-primary " style={{ fontSize: "20px" }}></Image>
                Contenuti Multimediali
              </p>
            </Col>
            <Col>
              <p className="ms-2" style={{ fontWeight: "600" }}>
                <CalendarEvent className="m-1" style={{ color: "#E7A33E", fontSize: "20px" }}></CalendarEvent>
                Eventi
              </p>
            </Col>
            <Col>
              <p className="ms-2" style={{ fontWeight: "600" }}>
                <Newspaper className="m-1" style={{ color: "#E06847", fontSize: "20px" }}></Newspaper>
                Scrivi un Articolo
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
      <p className="text-end mt-3">
        Seleziona la visualizzazione del feed da <span style={{ fontWeight: "bold" }}>Più rilevanti</span>
      </p>
      {posts
        ?.slice() //slice crea prima un nuovo array
        .reverse() //reverse fa vedere prima i post più recenti
        .map((post) => (
          <Container key={post.id} className="bg-white border rounded-2 mb-3 p-3">
            <Row>
              <Col md={1}>
                <img src={post.user.image} alt="Post User" className="rounded-circle" style={{ width: "40px" }} />
              </Col>
              <Col md={11}>
                <p style={{ fontWeight: "600" }}>{post.username}</p>
                <p>{post.text}</p>
                <p className="text-muted" style={{ fontSize: "12px" }}>
                  {new Date(post.createdAt).toLocaleDateString()} {/* Formatta la data come preferisci */}
                </p>
                <p>{post.content}</p>
              </Col>
            </Row>
          </Container>
        ))}
    </>
  );
};

export default MainContent;
