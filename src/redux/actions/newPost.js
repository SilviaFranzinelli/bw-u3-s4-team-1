export const NEW_POST = "NEW_POST";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjN2E5OGU3MDMzNzAwMTUzMTZkYzEiLCJpYXQiOjE3NDA0MDU0MDAsImV4cCI6MTc0MTYxNTAwMH0.CnUul3MlAGG7_YRNRb6k0SQlhVZLFnvtQPCj0_zoPN8";
export const newPost = (postData) => {
  return async (dispatch, getState) => {
    console.log("getState", getState());
    try {
      let resp = await fetch("https://striveschool-api.herokuapp.com/api/posts", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData), // invia i dati delle exp,senza non funziona
      });

      console.log(postData);
      if (resp.ok) {
        let data = await resp.json();
        console.log(postData);
        console.log("Esperienza aggiunta:", data);
        dispatch({ type: NEW_POST, payload: data });
      } else {
        console.log("Errore durante la fetch POST");
      }
    } catch (error) {
      console.log("Errore", error);
    }
  };
};
