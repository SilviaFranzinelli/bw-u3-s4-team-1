import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProfile } from "../redux/actions/searchProfile";
import { Card } from "react-bootstrap";

const ProfileSearched = () => {
  const { id } = useParams(); // Ottieni l'ID dalla URL
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.multiProfiles.multiProfiles);

  console.log(id);
  console.log(profiles);

  useEffect(() => {
    if (id) {
      dispatch(searchProfile(id)); // Recupera il profilo dell'utente
    }
  }, [dispatch, id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {profiles && profiles.length > 0 ? (
        profiles
          .filter((profile) => profile._id === id)
          .map((profile) => (
            <Card key={profile._id} className="mt-3">
              <Card.Body>
                <Card.Title>
                  {profile.name} {profile.surname}
                </Card.Title>
                <Card.Img className="imageProf" variant="top" src={profile.image} alt={profile.name} />
                <Card.Text>
                  Email: <strong>{profile.email}</strong>{" "}
                </Card.Text>
                <Card.Text>
                  Ruolo: <strong>{profile.title}</strong>
                </Card.Text>
                <Card.Text>
                  Descrizione: <strong>{profile.bio}</strong>
                </Card.Text>
                <Card.Text>{formatDate(profile.updatedAt)}</Card.Text>
              </Card.Body>
            </Card>
          ))
      ) : (
        <p>Nessun profilo trovato.</p>
      )}
    </>
  );
};

export default ProfileSearched;
