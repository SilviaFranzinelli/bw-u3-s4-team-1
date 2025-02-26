import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts, loadMorePosts } from "../redux/reducers/postSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Heart, Chat, Share, Send } from "react-bootstrap-icons"; // Import delle icone
import { newPost } from "../redux/actions/newPost";
/* import { getProfile } from "../redux/actions"; */

const MainContent = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  /*  const profile = useSelector((state) => state.profile?.content); */
  const { content: posts, status, visiblePostsCount } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts()); // Carica i post solo se non sono stati ancora caricati
    }
  }, [dispatch, status]);

  /*  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
 */
  const handleLoadMore = () => {
    dispatch(loadMorePosts()); // Aumenta il numero di post visibili
  };

  // Filtra i post per includere solo quelli con tutti i campi necessari
  const filteredPosts = posts.filter((post) => post.text);

  // Slice dei post da visualizzare
  const visiblePosts = filteredPosts.reverse().slice(0, visiblePostsCount);

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
        {/* Altre sezioni del layout */}
        <Container className="mt-3">
          <form onSubmit={handleSubmit}>
            <input
              className="border border-secondary text-dark bg-light rounded-5 text-start py-2 "
              style={{ width: "100%" }}
              placeholder="Crea un post"
              onChange={(e) => setText(e.target.value)}
            ></input>
          </form>
          {status === "loading" ? (
            <p>Caricamento in corso...</p>
          ) : status === "failed" ? (
            <p>Errore nel caricamento dei post</p>
          ) : (
            visiblePosts.map((post) => (
              <Container key={post._id} className="bg-white border rounded-2 mb-3 p-3">
                <Row>
                  <Col md={1}>
                    <img src={post.user.image} alt="Post User" className="rounded-circle" style={{ width: "40px" }} />
                  </Col>
                  <Col md={11}>
                    <p style={{ fontWeight: "600" }}>{post.user.username}</p>
                    <p className="text-muted" style={{ fontSize: "12px" }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p>{post.text}</p>
                    {/* Visualizza la bio, title e immagine del profilo */}
                    <p>{post.user.bio}</p>
                    <p>
                      <strong>{post.user.title}</strong>
                    </p>

                    {/* Sezione interazioni con icone */}
                    <Row className="mt-3">
                      <Col>
                        <Heart className="text-danger" style={{ fontSize: "18px" }} /> {/* Icona cuore */}
                        <span className="ms-1">225</span>
                      </Col>
                      <Col>
                        <Chat className="text-primary" style={{ fontSize: "18px" }} /> {/* Icona commento */}
                        <span className="ms-1">1 commento</span>
                      </Col>
                      <Col>
                        <Share className="text-warning" style={{ fontSize: "18px" }} /> {/* Icona condivisione */}
                        <span className="ms-1">1 diffusione</span>
                      </Col>
                      <Col>
                        <Send className="text-success" style={{ fontSize: "18px" }} /> {/* Icona invio */}
                        <span className="ms-1">Invia</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            ))
          )}
        </Container>

        {/* Bottone per caricare altri 20 post */}
        {filteredPosts.length > visiblePostsCount && (
          <Button onClick={handleLoadMore} className="mt-3">
            Visualizza altro
          </Button>
        )}
      </Container>
    </>
  );
};

export default MainContent;
