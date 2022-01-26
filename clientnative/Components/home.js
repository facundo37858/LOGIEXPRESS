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
} from "react-native";
import { logiarUsuario, enviarToken } from "./../actions/index";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/core";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const resptoken = useSelector((store) => store.respToken);

  async function getValueFor() {
    // SE CONSULTA EL VALUE DEL STORE, CON EL KEY
    let result = await SecureStore.getItemAsync("token");
    if (result) {
      onChangeResult(result);
      console.log(result);
    } else {
      //   alert('Invalid Key')
    }
  }

  async function save(key, value) {
    //FUNCION PARA GUARDAR LA INFO EN EL STORE, KEY = token , VALUE=el string del token
    try{
    await SecureStore.setItemAsync(key, value);
    } catch(error){
      console.log('error', error.response)
    }
  }

  //TOKEN
  const [result, onChangeResult] = useState("(result)");
  // getValueFor(); // PRIMERO CORROBORAMOS SI HAY UN TOKEN GUARDADO
  getValueFor();
  useEffect(() => {
    if (result === "(result)") {
      navigation.navigate("singIn"); // si nunca se logio lo lleva al login
    } else {
      // SI YA SE LOGIO ANTERIORMENTE
      const obj2 = {
        token: result,
      };

      //console.log("este es el result", obj2);

      dispatch(enviarToken(obj2));
    }
  }, [result]);

  useEffect(() => {
    // console.log("respotoken:", resptoken);
    // console.log("resptoken.mensaje", resptoken.mensaje);

    if (resptoken != {}) {
      if (resptoken.mensaje === true) {
        if (resptoken.role === true) {
          navigation.navigate("ProfileUserScreen");
        } else {
          navigation.navigate("ProfileScreenCarrier");
        }
      } else {
        save("token", "(result)");
        navigation.navigate("singIn");
      }
    }
  }, [resptoken]);

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
      <View>
        <Text>LOGIEXPRESS ES UNA APLICACIÓN DE LOGISTICA</Text>
      </View>
      <TouchableOpacity>
        <Text>Token guardado</Text>
      </TouchableOpacity>
    </ScrollView>
    // Container End
  );
};

export default Home;

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
