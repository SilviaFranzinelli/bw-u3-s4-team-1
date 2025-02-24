import { useEffect } from "react";
import { fetchMultiProfile } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function MultiProfiles() {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.multiProfiles.multiProfiles || []);

  useEffect(() => {
    dispatch(fetchMultiProfile());
  }, [dispatch]);

  console.log("aaaaaaaaaaaaa", profiles);

  return (
    <div>
      {profiles.length === 0 ? (
        <p>Caricamento profili...</p>
      ) : (
        profiles.slice(0, 10).map((profile) => (
          <div key={profile._id}>
            <p>{profile.name}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MultiProfiles;
