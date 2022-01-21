import React, { useState, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Modal
} from "react-native";
import { logiarUsuario } from "./../actions/index";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import SimpleModal5 from "./AlertasReg/SimpleModalmail.js";
import SimpleModal6 from "./AlertasReg/SimpleModalpass.js";
import SimpleModal30 from "./AlertasLog/SimpleModallog.js";

const SingIn = ({ navigation }) => {
  const dispatch = useDispatch();

  const respuesta = useSelector((store) => store.responseLog);
  const respToken = useSelector((store) => store.respToken)
  async function save(key, value) {
    //FUNCION PARA GUARDAR LA INFO EN EL STORE, KEY = token , VALUE=el string del token
    try{
      await SecureStore.setItemAsync(key, value);
    } catch(error){
      console.log('error', error.response)
    }
    }
    



  const nuevotoken = useSelector((store) => store.token);
  useEffect(() => {
    console.log("verificando, que se envia", nuevotoken);
    save("token", nuevotoken);
  }, [nuevotoken]);

    // COMBINACION MAIL Y PASS MAL
  const [isModalVisible30, setisModalVisible30] = useState(false);
  const [chooseData30, setchooseData30] = useState();

  const changeModalVisible30 = (bool) => {
    setisModalVisible30(bool);
  };

  const setData30 = (data) => {
    setchooseData30(data);
  };

   //MAIL MAL INGRESADO
   const [isModalVisible5, setisModalVisible5] = useState(false);
   const [chooseData5, setchooseData5] = useState();
 
   const changeModalVisible5 = (bool) => {
     setisModalVisible5(bool);
   };
 
   const setData5 = (data) => {
     setchooseData5(data);
   };
 
   // CONTRASEÑA MAL INGRESADA
 
   const [isModalVisible6, setisModalVisible6] = useState(false);
   const [chooseData6, setchooseData6] = useState();
 
   const changeModalVisible6 = (bool) => {
     setisModalVisible6(bool);
   };
   const setData6 = (data) => {
    setchooseData6(data);
  };

  useEffect(() => {
    console.log(
      "aqui esta la respuesta (Componente SingIn linea 40):",
      respuesta
    );
    if (respuesta?.role === true) {
      navigation.navigate("ProfileUserScreen");
    }
    if (respuesta?.role === false) {
      navigation.navigate("ProfileScreenCarrier");
    }
    if (respuesta?.role === 1) {
      changeModalVisible30(true)
      // alert(
      //   "La dirección de correo electrónico o la contraseña que ingresaste no son válidas!"
      // );
    }
  }, [respuesta]);

  /* useEffect(() => {
    console.log("ESTO ES EL TOKEEEEEEEEEN", respToken)
    if (respToken?.role === true) {
      navigation.navigate("ProfileUserScreen");
    }
    if (respToken?.role === false) {
      navigation.navigate("ProfileScreenCarrier");
    }
    if (respToken?.role === 1) {
      alert(
        "La dirección de correo electrónico o la contraseña que ingresaste no son válidas!"
      );
    }
  },[respToken])
 */
  const [log, setLog] = useState({
    mail: "",
    contraseña: "",
  });

  const handelChangeMail = (email) => {
    setLog({
      ...log,
      mail: email,
    });
  };
  const handelChangePass = (pass) => {
    setLog({
      ...log,
      contraseña: pass,
    });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // en un objeto pongo lo que tengo en el estado inicial
    const obj = {
      eMail: log.mail,
      password: log.contraseña,
    };

    //Validaciones:

    if (!obj.eMail.includes(".com") || !obj.eMail.includes("@")) {
      changeModalVisible5(true)
      return;
    }
    if (!obj.password) {
      changeModalVisible6(true)
      return;
    }

    dispatch(logiarUsuario(obj));
    console.log("Estoy enviado", obj);
    setLog({
      mail: "",
      contraseña: "",
    });

    //cuando se cumpla que respuesta != null
    //haga un console.log(respuesta)

  
  };

  function navigate() {
    navigation.navigate("singUp");
  }

  return (
    //Container Start
    <ScrollView
      style={{ flex: 1, backgroundColor: "#ffffffff" }}
      showsVerticalScrollIndicator={false}
    >
      {/* Brand View */}
      <ImageBackground
        source={require("./ruta.png")}
        style={{
          height: Dimensions.get("window").height / 2.5,
        }}
      >
        <View style={styles.brandView}>
          <Ionicons
            name="location-sharp"
            style={{ color: "#FFC107", fontSize: 100 }}
          />
          <Text style={styles.brandViewText}>LOGIEXPRESS</Text>
        </View>
      </ImageBackground>
      {/* Botton View */}
      <View style={styles.bottonView}>
        {/* Welcome View */}
        <View style={{ padding: 40, display: "flex", alignItems: "center" }}>
          <Text style={{ color: "#7952B3", fontSize: 34 }}>Bienvenido</Text>
        </View>
        {/* inputs */}
        <View
          style={styles.FormView}
          // onChange={(e) => ChangeInput(e)}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextInput
            value={log.mail}
            onChangeText={(name) => handelChangeMail(name)}
            name="mail"
            placeholder="Dirección de Mail*"
            style={styles.TextInput}
          ></TextInput>
          <TextInput
            value={log.contraseña}
            onChangeText={(name) => handelChangePass(name)}
            name="contraseña"
            placeholder="Contraseña*"
            secureTextEntry={true}
            style={styles.TextInput}
          ></TextInput>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText} onPress={handleSubmit}>
              Iniciar Sesión
            </Text>
            <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible5}
                  nRequestClose={() => changeModalVisible5(false)}
                >
                  <SimpleModal5
                    changeModalVisible5={changeModalVisible5}
                    setData5={setData5}
                  />                  
                  </Modal>
                  <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible6}
                  nRequestClose={() => changeModalVisible6(false)}
                >
                  <SimpleModal6
                    changeModalVisible6={changeModalVisible6}
                    setData6={setData6}
                  />                  
                  </Modal>
            <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible30}
                  nRequestClose={() => changeModalVisible30(false)}
                >
                  <SimpleModal30
                    changeModalVisible30={changeModalVisible30}
                    setData30={setData30}
                  />
                  
                  </Modal>
          </TouchableOpacity>
        </View>
        <View style={styles.preg}>
          <Text style={styles.pregunta}>No tienes una cuenta? </Text>
        </View>

        <TouchableOpacity style={styles.TextButton} onPress={navigate}>
          <Text style={styles.SingUpText}>Registrate Ahora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    // Container End
  );
};

export default SingIn;

const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brandViewText: {
    color: "#FFC107",
    fontSize: 45,
    fontWeight: "bold",
    textTransform: "uppercase",
    // justifyContent:'flex-start'
  },
  bottonView: {
    flex: 1.5,
    backgroundColor: "#ffffffff",
    bottom: 50,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  FormView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: -10,
  },
  TextInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "black",
    height: 52,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
    color: "black",
  },
  Button: {
    width: "90%",
    color: "#FFC107",
    height: 52,
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  SingUpText: {
    color: "#7952B3",
    fontSize: 20,
  },
  TextButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  preg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  pregunta: {
    color: "red",
  },
});
