import axios from "axios";
export const GET_PRICE_QUOTE = "GET_PRICE_QUOTE";
export const POST_REQUEST_TRAVE = "POST_REQUEST_TRAVE";
export const URL_PRICE_QUOTE = "http://192.168.0.105:3001/api/calculatePrice";
export const URL_REQUEST_TRAVEL =
  "http://192.168.0.105:3001/api//requestTravel";
// import { registrarUsuario } from './index';

// export function registrarUsuario(obj) {
//   return (dispatch) =>
//     fetch("http://localhost:3001/api/user", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/x-www-form-urlencoded ",
//       },
//       body: JSON.stringify(obj),
//     })
//       .then((resp) => resp.json())
//       .then((json) => {
//         dispatch({
//           type: "REGISTRO",
//           payload: json,
//         });
//       });
// }

export function requestTravel(payload) {
  return async function (dispatch) {
    try {
      const travel = await axios.post(URL_REQUEST_TRAVEL, payload);
      return dispatch({
        type: POST_REQUEST_TRAVE,
        payload: travel.data,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
}

export function cotizarViaje(payload) {
  return async function (dispatch) {
    try {
      const quote = await axios.post(URL_PRICE_QUOTE, payload);
      return dispatch({
        type: GET_PRICE_QUOTE,
        payload: quote.data.price,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
}

export function registrarUsuario(payload) {
  return async function (dispatch) {
    try {
      const response = await axios
        .post("http://192.168.0.10:3001/api/user", payload) //aca cada uno pone su ip
        .then((r) => {
          dispatch({
            type: "REGISTROO",
            payload: r.data.payload,
          });
          console.log("aqui response registro: ", r);
        });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function logiarUsuario(payload) {
  return async function (dispatch) {
    try {
      const response = await axios
        .post("http://192.168.0.10:3001/api/login", payload) //aca cada uno pone su ip
        .then((r) => {
          dispatch({
            type: "LOGEOO",
            payload: r.data.payload,
          });
          console.log("hace el dispatch");
          console.log("response:", r.data.payload);
        });
      // console.log(r);
      // return response;
    } catch (error) {
      console.error(error.response);
    }
  };
}

//// --> Ruta para completar perfil <-- ////
export function completeProfileUser(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://192.168.0.10:3001/api/userProfile",
        payload
      );
      //console.log('Soy el console.log de response', response)
      return dispatch({
        type: "COMPLETE_PROFILE_USER",
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
}

//// --> Ruta para completar perfil carrier <-- ////
export function completeProfileCarrier(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://192.168.0.10:3001/api/carrierProfile",
        payload
      );
      // console.log('Soy el console.log de response', response)
      return dispatch({
        type: "COMPLETE_PROFILE_CARRIER",
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
}

// import FormData from "FormData";

// var formData = new FormData();
// formData.append("key1", "value");
// formData.append("key2", "value");

// let postData = {
//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "multipart/form-data",
//   },
//   body: formData,
// };

// fetch(api_url, postData)
//   .then((response) => response.json())
//   .then((responseJson) => {
//     console.log("response:", responseJson);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
