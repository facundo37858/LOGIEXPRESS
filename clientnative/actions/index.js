import axios from "axios";
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
export function registrarUsuario(payload) {
  return async function () {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user",
        payload
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function logiarUsuario(payload) {
  return async function () {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/Authentication",
        payload
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
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
