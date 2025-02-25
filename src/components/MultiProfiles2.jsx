import { useEffect } from "react";
import { fetchMultiProfile } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { PersonPlusFill } from "react-bootstrap-icons";

function MultiProfiles2() {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.multiProfiles.multiProfiles || []);

  useEffect(() => {
    dispatch(fetchMultiProfile());
  }, [dispatch]);

  console.log("aaaaaaaaaaaaa", profiles);

  return (
    <div className="p-3" style={{backgroundColor:"white", borderRadius:"10px"}}>
        <p>Persone che potresti conoscere</p>
      {profiles.length === 0 ? (
        <p>Caricamento profili...</p>
      ) : (
        profiles.slice(10, 15).map((profile) => (
          <div key={profile._id} >
            
            <Row className="items">
              <Col className="col-3 ms-2 "><img src={profile.image} alt="" style={{borderRadius:"50%", height:"40px", width:"40px" }}/></Col>
              <Col>
                <p style={{fontWeight:"bold", margin:"0"}}>{profile.name} {profile.surname}</p> 
                <p className="m-0">{profile.title} </p>
                <button type="button" style={{backgroundColor:"white", borderRadius:"50px", border:"solid 1px black"}}><PersonPlusFill></PersonPlusFill> Collegati</button>
              </Col>
            </Row>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default MultiProfiles2;
