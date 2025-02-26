// import { useEffect, useState } from "react";
// import { Button, Col, Container, Image, Row } from "react-bootstrap";
// import { CalendarEvent, Newspaper } from "react-bootstrap-icons";
// import { useDispatch, useSelector } from "react-redux";

// const MainContent = () => {
//   const dispatch = useDispatch();
//   const profile = useSelector((state) => state.profile?.content);
//   const [showPostSection, setShowPostSection] = useState(false);

//   useEffect(() => {
//     // dispatch(getProfile());
//   }, [dispatch]);

//   const handleCreatePost = () => {
//     setShowPostSection(true);
//   };

//   return (
//     <>
//       <Container className="bg-light border rounded-2">
//         <Container className="mt-2">
//           <Row>
//             <Col className="mt-1" md={1}>
//               {profile ? (
//                 <>
//                   <img
//                     src={profile.image}
//                     alt="Profile"
//                     className="rounded-circle border border-white"
//                     style={{ width: "50px" }}
//                   />
//                 </>
//               ) : (
//                 <p className="text-muted">Caricamento profilo...</p>
//               )}
//             </Col>
//             <Col md={11} className="mt-2">
//               <Button
//                 className="border-secondary text-dark bg-light rounded-5 text-start py-2"
//                 style={{ width: "100%" }}
//                 onClick={handleCreatePost}
//               >
//                 Crea Un Post
//               </Button>
//             </Col>
//           </Row>
//         </Container>
//         <Container className="mt-3 text-secondary" style={{ fontSize: "14px" }}>
//           <Row>
//             <Col md={5}>
//               <p className="ms-2" style={{ fontWeight: "600" }}>
//                 <Image className="m-1 text-primary" style={{ fontSize: "20px" }} />
//                 Contenuti Multimediali
//               </p>
//             </Col>
//             <Col>
//               <p className="ms-2" style={{ fontWeight: "600" }}>
//                 <CalendarEvent className="m-1" style={{ color: "#E7A33E", fontSize: "20px" }} />
//                 Eventi
//               </p>
//             </Col>
//             <Col>
//               <p className="ms-2" style={{ fontWeight: "600" }}>
//                 <Newspaper className="m-1" style={{ color: "#E06847", fontSize: "20px" }} />
//                 Scrivi un Articolo
//               </p>
//             </Col>
//           </Row>
//         </Container>
//       </Container>
//       <p className="text-end mt-3">
//         Seleziona la visualizzazione del feed da <span style={{ fontWeight: "bold" }}>Più rilevanti</span>
//       </p>
//       {/* {showPostSection && <PostSection />} */}
//     </>
//   );
// };

// export default MainContent;
