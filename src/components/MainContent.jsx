import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, loadMorePosts } from "../redux/reducers/postSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Heart, HeartFill, Chat, Share, Send, Pen } from "react-bootstrap-icons"; // Import delle icone
import { newPost } from "../redux/actions/newPost";
import { getProfile } from "../redux/actions";

import ModMyPosts from "./ModMyPosts";

const MainContent = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false); // Stato per mostrare il modal
  const profile = useSelector((state) => state.profile?.content);
  const { content: posts, status, visiblePostsCount } = useSelector((state) => state.posts);
  const [likes, setLikes] = useState({});
  const [isLiked, setIsLiked] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts()); // Carica i post solo se non sono stati ancora caricati
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(loadMorePosts()); // Aumenta il numero di post visibili
  };

  // Filtra i post per includere solo quelli con tutti i campi necessari
  const filteredPosts = posts.filter((post) => post.text);

  // Slice dei post da visualizzare
  const visiblePosts = filteredPosts.reverse().slice(0, visiblePostsCount);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handleSubmit");

    if (!text) return; //se il testo non è inserito non ritorna niente
    const newPosts = {
      text,
    };

    await dispatch(newPost(newPosts)); //passo il nuovo testo per il post al body nell'action
    setText("");
    dispatch(fetchPosts());
  };

  const handleOpenModal = (event, postToEdit) => {
    //apre il modale per la modifica del post
    console.log("Post da modificare:", postToEdit);
    setSelectedPost(postToEdit._id); //passo id del post per la fetch
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Chiudi il modal
  };

  const toggleLike = (postId) => {
    setIsLiked((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    setLikes((prev) => ({
      ...prev,
      [postId]: prev[postId] ? prev[postId] + (isLiked[postId] ? -1 : 1) : 1,
    }));
  };

  return (
    <>
      <Container className="bg-light border rounded-2">
        {/* Altre sezioni del layout */}
        <Container className="mt-3">
          <Container className="border mb-2 bg-body py-2">
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
                  </>
                ) : (
                  <p className="text-muted">Caricamento profilo...</p>
                )}
              </Col>
              <Col md={11} className="mt-2">
                <form onSubmit={handleSubmit}>
                  <input
                    className="border border-secondary text-dark bg-light rounded-5 text-start py-2 ms-2 "
                    style={{ width: "100%", paddingLeft: "1rem" }}
                    placeholder="Crea un post"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></input>
                </form>
              </Col>
            </Row>
          </Container>
          {status === "loading" ? (
            <p>Caricamento in corso...</p>
          ) : status === "failed" ? (
            <p>Errore nel caricamento dei post</p>
          ) : (
            visiblePosts.map((post) => (
              <Container key={post._id} className="bg-white border rounded-2 mb-3 p-3">
                <Row>
                  {console.log(post.user._id)}
                  <Col md={1}>
                    <img
                      src={post.user.image}
                      alt="Post User"
                      className="rounded-circle"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </Col>
                  <Col md={11}>
                    <div className="d-flex justify-content-between">
                      <p style={{ fontWeight: "600" }}>
                        {post.user.name}
                        <span> {post.user.surname}</span>
                      </p>
                      {post.user._id === profile._id && ( //un'altro controllo per confrontare l'id profilo con quello dell'user del commento,così i button modifica ed elimina si visualizzeranno solo se il commento è il tuo
                        <>
                          <Pen onClick={(e) => handleOpenModal(e, post)} className="ms-2 btn-success cursore"></Pen>
                        </>
                      )}
                    </div>
                    <p className="text-muted" style={{ fontSize: "12px" }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p>{post.text}</p>

                    <p>
                      <strong>{post.user.title}</strong>
                    </p>

                    {/* Sezione interazioni con icone */}
                    <Row className="mt-3">
                      <Col>
                        <Button variant="link" className="p-0" onClick={() => toggleLike(post._id)}>
                          {isLiked[post._id] ? (
                            <HeartFill className="text-danger" style={{ fontSize: "18px" }} />
                          ) : (
                            <Heart className="text-danger" style={{ fontSize: "18px" }} />
                          )}
                        </Button>
                        <span className="ms-1 p-0">{likes[post._id] || 0}</span>
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
        <ModMyPosts show={showModal} onClose={handleCloseModal} postId={selectedPost} />
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
