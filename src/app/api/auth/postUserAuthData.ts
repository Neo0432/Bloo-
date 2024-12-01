import axios from "axios";

export async function createAccount(data: FormData) {
    const dataJson = JSON.stringify({
        username: data.get("username"),
        password: data.get("password"),
        email: data.get("email"),
      });
      try {
        console.log(data);
        return await axios.post(
          "http://localhost:5137/login/new-account/create-account",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: dataJson,
          }
        );
      } catch (e) {
        console.log(e);
      }
}

export async function checkForUsernameEmpty(username:string) {
  const data = JSON.stringify({
    username: username,
  });

  try {
    return await axios.post(
      "http://localhost:5137/login/new-account/is-username-empty",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );
  } catch (e) {
    console.log(e);
  }
}