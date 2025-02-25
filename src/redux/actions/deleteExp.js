export const DELETE_EXP = "DELETE_EXP";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjN2E5OGU3MDMzNzAwMTUzMTZkYzEiLCJpYXQiOjE3NDA0MDU0MDAsImV4cCI6MTc0MTYxNTAwMH0.CnUul3MlAGG7_YRNRb6k0SQlhVZLFnvtQPCj0_zoPN8";
export const fetchDeleteExp = (id) => {
  return async (dispatch, getState) => {
    console.log("getState", getState());
    try {
      let resp = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/67bc7a98e703370015316dc1/experiences/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(id);
      if (resp.ok) {
        let data = await resp.json();
        dispatch({ type: DELETE_EXP, payload: data });
      } else {
        console.log("Errore durante la fetch DELETE");
      }
    } catch (error) {
      console.log("Errore", error);
    }
  };
};
