const initialState = { //hago un estado inicial
    registrarUsuario: null,
    logiarUsuario: null,
    responseReg:null,  
    responseLog:null,
    completeprofile: []
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
                  case "REGISTROO":
                  return {
                    ...state,
                    responseReg: action.payload, //en registrarusuario meteme el action.payload
                  };   
                  case "LOGEOO":
                    return {
                      ...state,
                      responseLog: action.payload, //en registrarusuario meteme el action.payload
                    };   
                  case  'COMPLETE_PROFILE_USER':
                    return {
                      ...state,
                      completeprofile: action.payload
                    }
        default:
        return state;
    }
  }