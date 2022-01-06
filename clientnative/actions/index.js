// import axios from 'axios';
// import { registrarUsuario } from './index';

export function registrarUsuario(obj) {
  return (dispatch) =>
    fetch("http://localhost:3001/api/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "REGISTRO",
          payload: json,
        });
      });
}
