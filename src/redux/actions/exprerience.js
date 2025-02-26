export const GET_EXP = "GET_EXP";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjN2E5OGU3MDMzNzAwMTUzMTZkYzEiLCJpYXQiOjE3NDA0MDU0MDAsImV4cCI6MTc0MTYxNTAwMH0.CnUul3MlAGG7_YRNRb6k0SQlhVZLFnvtQPCj0_zoPN8";

export const myExperiences = () => {
  return async (dispatch) => {
    try {
      let resp = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/67bc7a98e703370015316dc1/experiences",
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.ok) {
        let experiences = await resp.json();
        console.log("experiences ricevute : ", experiences);
        dispatch({ type: GET_EXP, payload: experiences });
      } else {
        console.log("errore nel caricamento dei profili ");
      }
    } catch (error) {
      console.log("errore nella fetch", error);
    }
  };
};
