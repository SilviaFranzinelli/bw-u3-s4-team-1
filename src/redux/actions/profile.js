export const SET_PROFILE = "SET_PROFILE";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjN2E5OGU3MDMzNzAwMTUzMTZkYzEiLCJpYXQiOjE3NDA0MDU0MDAsImV4cCI6MTc0MTYxNTAwMH0.CnUul3MlAGG7_YRNRb6k0SQlhVZLFnvtQPCj0_zoPN8";


export const fetchProfile = () => {
  return async (dispatch) => {
    try {
      console.log("inizio fetch", token);
      let resp = await fetch("https://striveschool-api.herokuapp.com/api/profile", {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      if (resp.ok) {
        let profiles = await resp.json();
        console.log("profili ricevuti : ", profiles);
        dispatch({ type: SET_PROFILE, payload: profiles });
      } else {
        console.log("errore nel caricamento dei profili ");
      }
    } catch (error) {
      console.log("errore nella fetch", error);
    }
  };
};
