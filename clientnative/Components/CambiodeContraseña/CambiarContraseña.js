import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
//iconos
import Icon from "react-native-vector-icons/Ionicons";
//Hook para la navegacion
import { useNavigation } from "@react-navigation/core";
import ModalContraseña from "./ModalContraseña";

const CambiarContraseña = () => {
  const data = useSelector((store) => store.responseLog);
  const editPassword = useSelector((store) => store. editPassword);

  useEffect(() => {
    console.log("data",  editPassword)
  }, [data,  editPassword]);

  /// --> ESTADO PARA EL INPUT <-- ///
  const [contraseña, setContraseña] = useState("");

  /// --> ESTADO PARA EL MODAL <-- ///
  const [isModalVisible, setisModalVisible] = useState(false);
  const [chooseData, setchooseData] = useState();

  const changeModalVisible = (bool) => {
    setisModalVisible(bool);
  };

  const setData = (data) => {
    setchooseData(data);
  };

  return (
    <View style={styles.container}>
      {/* <BOTON DE VOLVER ATRÁS */}
      <View style={{ alignSelf: "flex-end", margin: 35 }}>
        <Image source={require("../Utils/salida.png")} />
      </View>
      <View style={styles.containerImg}>
        <Image
          source={require("./contrasena2.png")}
          style={{ height: 170, width: 170 }}
        />
        <Text style={styles.textPass}>Cambiar contraseña</Text>
      </View>
      <Text style={styles.textNewContra}>Nueva contraseña</Text>

      <View style={styles.viewsInputs}>
        <TextInput
          placeholder="¡Por favor, una que no te olvides!"
          secureTextEntry={true}
          style={styles.textPlaceholder}
          onChangeText={(text) => setContraseña(text)}
        />
      </View>

      <TouchableOpacity
        style={styles.btnEditar}
        onPressIn={() => changeModalVisible(true)}
      >
        <Text style={styles.textBtn}>Cambiar</Text>
        {/* MODAL */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          nRequestClose={() => changeModalVisible(false)}
        >
          <ModalContraseña
            changeModalVisible={changeModalVisible}
            setData={setData}
            id={data.id}
            contraseña={contraseña}
          />
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  viewsInputs: {
    marginTop: 10,
    backgroundColor: "#DDDDDD",
    height: 55,
    width: "85%",
    marginBottom: 15,
    borderRadius: 15,
    marginLeft: 30,
  },
  textPlaceholder: {
    fontSize: 17,
    marginLeft: 15,
    marginTop: 12,
  },
  containerImg: {
    alignContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  textNewContra: {
    textAlign: "center",
    fontSize: 20,
    marginLeft: 15,
    fontWeight: "bold",
  },
  textPass: {
    marginTop: 35,
    marginBottom: 40,
    fontSize: 25,
    fontWeight: "bold",
  },
  btnEditar: {
    alignSelf: "center",
    backgroundColor: "#FFC107",
    borderRadius: 10,
    width: "40%",
    height: 50,
    marginTop: 60,
  },
  textBtn: {
    color: "white",
    fontSize: 19,
    alignSelf: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default CambiarContraseña;
