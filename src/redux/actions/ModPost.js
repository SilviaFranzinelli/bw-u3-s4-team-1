export const MOD_POSTS = "MOD_POSTS";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjN2E5OGU3MDMzNzAwMTUzMTZkYzEiLCJpYXQiOjE3NDA0MDU0MDAsImV4cCI6MTc0MTYxNTAwMH0.CnUul3MlAGG7_YRNRb6k0SQlhVZLFnvtQPCj0_zoPN8";
export const fetchModPosts = (id, text) => {
  return async (dispatch, getState) => {
    console.log("getState", getState());
    try {
      let resp = await fetch("https://striveschool-api.herokuapp.com/api/posts/" + id, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      console.log(id);
      if (resp.ok) {
        let data = await resp.json();
        dispatch({ type: MOD_POSTS, payload: data });
      } else {
        console.log("Errore durante la fetch DELETE");
      }
    } catch (error) {
      console.log("Errore", error);
    }
  };
};
