export const MOD_PROFILE = "MOD_PROFILE";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjN2E5OGU3MDMzNzAwMTUzMTZkYzEiLCJpYXQiOjE3NDA0MDU0MDAsImV4cCI6MTc0MTYxNTAwMH0.CnUul3MlAGG7_YRNRb6k0SQlhVZLFnvtQPCj0_zoPN8";

export const modProfile = (profileData) => {
  return async (dispatch, getState) => {
    console.log("getState", getState());
    try {
      let resp = await fetch("https://striveschool-api.herokuapp.com/api/profile", {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData), // passa i dati modificati
      });
      if (resp.ok) {
        let data = await resp.json();
        dispatch({ type: MOD_PROFILE, payload: data });
      } else {
        console.log("Errore durante la fetch");
      }
    } catch (error) {
      console.log("Errore", error);
    }
  };
};



