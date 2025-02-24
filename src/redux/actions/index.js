export const GET_PROFILE = "GET_PROFILE";
export const SET_PROFILE = "SET_PROFILE";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjN2E5OGU3MDMzNzAwMTUzMTZkYzEiLCJpYXQiOjE3NDA0MDU0MDAsImV4cCI6MTc0MTYxNTAwMH0.CnUul3MlAGG7_YRNRb6k0SQlhVZLFnvtQPCj0_zoPN8";

export const getProfile = () => {
  return async (dispatch, getState) => {
    console.log("getState", getState());
    try {
      let resp = await fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      if (resp.ok) {
        let data = await resp.json();
        dispatch({ type: GET_PROFILE, payload: data });
      } else {
        console.log("Errore durante la fetch");
      }
    } catch (error) {
      console.log("Errore", error);
    }
  };
};

export const fetchMultiProfile = () => {
  return async (dispatch, getState) => {
    console.log("getState", getState());
    try {
      let resp = await fetch("https://striveschool-api.herokuapp.com/api/profile", {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      if (resp.ok) {
        let profiles = await resp.json();
        console.log(" Profili ricevuti:", profiles);
        dispatch({ type: SET_PROFILE, payload: profiles });
      } else {
        console.log(" Errore durante la fetch dei profili multipli");
      }
    } catch (error) {
      console.log(" Errore Fetch:", error);
    }
  };
};
