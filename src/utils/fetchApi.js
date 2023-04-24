import axios from "axios";
import { store } from "../store";
import { redirect } from "react-router-dom";

export const fetchApi = async (fetchOptions, auth = false) => {
  const { token } = store.getState().auth;

  try {
    if (auth && !token) {
      return redirect("/");
    }

    const options = {
      url: `http://localhost:9000/${fetchOptions.url}`,
      method: fetchOptions.method ? fetchOptions.method : "GET",
      headers: fetchOptions.headers ? fetchOptions.headers : {},
      data: fetchOptions.body ? fetchOptions.body : null,
    };

    if (auth) options.headers.Authorization = `Bearer ${token}`;

    return axios
      .request(options)
      .then((response) => response.data)
      .catch((err) => {
        return err.response.data;
      });
  } catch (err) {
    return new Response(err);
  }
};
