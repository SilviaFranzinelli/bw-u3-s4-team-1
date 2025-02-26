export const NEW_EXP = "NEW_EXP";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjN2E5OGU3MDMzNzAwMTUzMTZkYzEiLCJpYXQiOjE3NDA0MDU0MDAsImV4cCI6MTc0MTYxNTAwMH0.CnUul3MlAGG7_YRNRb6k0SQlhVZLFnvtQPCj0_zoPN8";
export const newExp = (experienceData) => {
  return async (dispatch, getState) => {
    console.log("getState", getState());
    try {
      let resp = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/67bc7a98e703370015316dc1/experiences",
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(experienceData), // invia i dati delle exp,senza non funziona
        }
      );

      console.log(experienceData);
      if (resp.ok) {
        let data = await resp.json();
        console.log(experienceData);
        console.log("Esperienza aggiunta:", data);
        dispatch({ type: NEW_EXP, payload: data });
      } else {
        console.log("Errore durante la fetch POST");
      }
    } catch (error) {
      console.log("Errore", error);
    }
  };
};
