import axios from "axios";
import config from "../config/config";
export const GET_PRICE_QUOTE = "GET_PRICE_QUOTE";
export const GET_TRAVELS = "GET_TRAVELS";
export const POST_REQUEST_TRAVE = "POST_REQUEST_TRAVE";
export const GET_TRAVEL_ID = "GET_TRAVEL_ID";
export const SOCKET = "SOCKET";
export const REQUEST_PERMISSE = 'REQUEST_PERMISSE';
export const DELETE_PERMISSE = 'DELETE_PERMISSE';
export const CONFIRME_REQUEST = 'CONFIRME_REQUEST';
export const REQ_DATA_CARRIER = 'REQ_DATA_CARRIER';
import { API_URL } from "@env"




export function reqTravelConfirm (payload) {
  return async function (dispatch) {
    try {
      const confirm = await axios.post(`${ API_URL }/api/confirmTravel`, payload);
      return dispatch({
        type: CONFIRME_REQUEST,
        payload: confirm.data
      })
    } catch (error) {
      console.log("Error", error)
    }
  }
}



export function deletePermisse () {
  return async function (dispatch) {
    try {
      return dispatch({
        type: DELETE_PERMISSE
      })
    } catch (error) {
      console.log("Error", error)
    }
}
}


export function reqDataCarrier (props) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${ API_URL }/api/user/${props}`)
      return dispatch({
        type: REQ_DATA_CARRIER,
        payload: resp.data

      })
    } catch (error) {
      console.log("Error", error)
    }
  }
}


export function requestPermisse (props) {
  return async function (dispatch) {
    try {
      console.log("ESTA SON LAS PROPS QUE PASO X ACTIOOOOOOOON", props)
      const resp = await axios.get(`${ API_URL }/api/userTravel/${props}`)
      return dispatch({
        type: REQUEST_PERMISSE,
        payload: resp.data,
      })
    } catch (error) {
      console.log("Error", error)
    }
  }
}




export function getSocket(props) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: SOCKET,
        payload: props
      })
    } catch (error) {
      console.log("Error", error)
    }
  }
}



export function getTravelID(payload) {
  return async function (dispatch) {
    try {
      const travelID = await axios.post(`${ API_URL }/api/oneTravel`, payload);
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
      const request = await axios.get(`${ API_URL }/api/Travel`);
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
      const travel = await axios.post(`${ API_URL }/api/requestTravel`, payload);
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
      const quote = await axios.post(`${ API_URL }/api/calculatePrice`, payload);
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
        .post(`${ API_URL }/api/user`, payload) //aca cada uno pone su ip
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
        .post(`${API_URL}/api/login`, payload) //aca cada uno pone su ip
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
        `${API_URL}/api/userProfile`,
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
        `${API_URL}/api/carrierProfile`,
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
        .post(`${API_URL}/api/verifytoken`, payload) //aca cada uno pone su ip
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
        `${API_URL}/api/changePassword`,
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
        `${API_URL}/api/updateUser`,
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
        `${API_URL}/api/editCarrier`,
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

//// --> Ruta para editar el perfil de carrier<-- ////
export function editVehicule(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `${API_URL}/api/updateVehicle`,
        payload
      );
       //console.log('Soy el console.log de response', response)
      return dispatch({
        type: "EDIT_VEHICULE",
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
      var json = await axios(`${API_URL}/api/historyTravelUser/${idUserReg}`);
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

//// ---> ACTION PARA TRAER INFO VEHICULOS <--- ///
export function getVehicules(idRole) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${API_URL}/api/vehicleDetails/${idRole}`);
      // console.log('Soy el console.log de response', response)
      return dispatch({
        type: 'GET_VEHICULES',
        payload: response.data,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
};