import axios from "axios";
import { store } from "../store";
import { redirect } from "react-router-dom";

export const fetchApi = async (url, auth = false) => {
  const { token } = store.getState().auth;
  try {
    if (auth && !token) {
      return redirect("/");
    }

    const options = {
      url: `http://localhost:9000/${url}`,
      method: "GET",
    };

    console.log(options);

    if (auth) options.headers = { Authorization: `Bearer ${token}` };

    return axios
      .request(options)
      .then((response) => response.data)
      .catch((err) => {
        return new Response(err);
      });
  } catch (err) {
    return new Response(err);
  }
};
