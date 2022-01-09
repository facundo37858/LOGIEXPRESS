const initialState = { //hago un estado inicial
    registrarUsuario: null,
    logiarUsuario: null,  
  };

  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "REGISTRO":
                return {
                  ...state,
                  registrarUsuario: action.payload, //en registrarusuario meteme el action.payload
                };    
                case "LOGEO":
                  return {
                    ...state,
                    logiarUsuario: action.payload, //en registrarusuario meteme el action.payload
                  };   
        default:
        return state;
    }
  }