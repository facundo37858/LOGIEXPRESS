import axios from "axios";
import config from "../config/config";
export const GET_PRICE_QUOTE = "GET_PRICE_QUOTE";
export const GET_TRAVELS = "GET_TRAVELS";
export const POST_REQUEST_TRAVE = "POST_REQUEST_TRAVE";
export const URL_PRICE_QUOTE = `http://${config.ip}:3001/api/calculatePrice`;
export const URL_REQUEST_TRAVEL = `http://${config.ip}:3001/api/requestTravel`;
export const URL_TRAVEL = `http://${config.ip}:3001/api/Travel`;
export const URL_TRAVEL_ID = `http://${config.ip}:3001/api/oneTravel`;
export const GET_TRAVEL_ID = "GET_TRAVEL_ID";

export function getTravelID(payload) {
  return async function (dispatch) {
    try {
      const travelID = await axios.post(URL_TRAVEL_ID, payload);
      return dispatch({
        type: GET_TRAVEL_ID,
        payload: travelID.data,
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };
}

export function getTravels() {
  return async function (dispatch) {
    try {
      const request = await axios.get(URL_TRAVEL);
      return dispatch({
        type: GET_TRAVELS,
        payload: request.data,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
}

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
        .post(`http://${config.ip}:3001/api/user`, payload) //aca cada uno pone su ip
        .then((r) => {
          dispatch({
            type: "REGISTROO",
            payload: r.data.payload,
          });
         // console.log("aqui response registro: ", r);
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
        .post(`http://${config.ip}:3001/api/login`, payload) //aca cada uno pone su ip
        .then((r) => {
          dispatch({
            type: "LOGEOO",
            payload: r.data.payload,
            token: r.data.token,
          });
          //console.log("hace el dispatch");
          console.log(
            "Aqui esta el token llegando en la action logiarusuario:",
            r.data.token
          );
        //  console.log("viene de login", r.data.payload);
        });
      // console.log(r);
      // return response;
    } catch (error) {
      console.log(error.response);
    }
  };
}

//// --> Ruta para completar perfil <-- ////
export function completeProfileUser(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `http://${config.ip}:3001/api/userProfile`,
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
        `http://${config.ip}:3001/api/carrierProfile`,
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

export function enviarToken(payload) {
  return async function (dispatch) {
    try {
      const response = await axios
        .post(`http://${config.ip}:3001/api/verifytoken`, payload) //aca cada uno pone su ip
        .then((r) => {
          console.log("Token llegando a la action enviarToken", payload);
          dispatch({
            type: "TOKEN",
            payload: r.data.payload,
          });
          console.log("hace el dispatch");
          console.log("Aqui esta el payload:", r.data.payload);
        });
      // console.log(r);
      // return response;
    } catch (error) {
      console.log(error.response);
    }
  };
}

//// --> ACTION PARA EL CAMBIO DE CONTRASEÑA USUARIO <-- ////

export function changePassword(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `http://${config.ip}:3001/api/changePassword`,
        payload
      );
      // console.log('Soy el console.log de response', response)
      return dispatch({
        type: "CHANGE_PASSWORD",
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
}


//// ---> ACTION PARA TRAER INFO VEHICULOS <--- ///
export function getVehicules(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://${config.ip}:3001/api/urldeLuis`, payload);
      return dispatch({
        type: 'GET_VEHICULES',
        payload: response.data,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
};

//// --> ACTION PARA DESMONTAR EL ESTADO <-- ////
export function desmount() {
  return {
    type: 'DESMOUNT',
  };
};

//// --> Ruta para editar el perfil de user<-- ////
export function editProfileUser(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `http://${config.ip}:3001/api/updateUser`,
        payload
      );
       //console.log('Soy el console.log de response', response)
      return dispatch({
        type: "EDIT_PROFILE_USER",
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
}

//// --> Ruta para editar el perfil de carrier<-- ////
export function editProfileCarrier(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `http://${config.ip}:3001/api/editCarrier`,
        payload
      );
       //console.log('Soy el console.log de response', response)
      return dispatch({
        type: "EDIT_PROFILE_CARRIER",
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
}

////--> ACTION PARA TRAER LOS TRAVELS POR ID <--////
export function getTravelUser(idUserReg) {
  return async function (dispatch) {
    try {
      var json = await axios(`http://${config.ip}:3001/api/historyTravelUser/${idUserReg}`);
      dispatch({
        type: "GET_TRAVEL_USER",
        payload: json.data,
      });
      //console.log('Esto llega a getTravelUser', json)
    } catch (error) {
      console.log(error);
     // alert("Error obteniendo datos del videojuego", error);
    }
  };
}
