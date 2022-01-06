const initialState = { //hago un estado inicial
    registrarUsuario: null,  
  };

  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "REGISTRO":
                return {
                  ...state,
                  registrarUsuario: action.payload, //en registrarusuario meteme el action.payload
                };    
        default:
        return state;
    }
  }