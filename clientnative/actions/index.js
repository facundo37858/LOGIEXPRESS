// import axios from 'axios';
// import { registrarUsuario } from './index';

export function registrarUsuario(obj) {
  return (dispatch) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };
    fetch(
      "http://localhost:3001/api/user",
      /*{
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })*/ requestOptions
    )
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "REGISTRO",
          payload: json,
        });
      });
  };
}
