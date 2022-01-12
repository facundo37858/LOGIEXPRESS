import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  Modal,
  Button,
} from "react-native";

import CheckBox from "expo-checkbox";

// import CheckBox from "@react-native-community/checkbox";
import { ModalPicker } from "./ModalPicker";
import { useDispatch, useSelector } from "react-redux";
import { registrarUsuario } from "../actions/index";

const SignUp = () => {
  const dispatch = useDispatch();

  const respuesta = useSelector((store) => store.responseReg)

  useEffect(()=>{
    //console.log('aqui esta la respuestaaaa:',respuesta);
    if(respuesta?.role === true){
      alert('Te has registrado exitosamente!')
      navigation.navigate("CompleteProfileUser");
    }if(respuesta?.role === false){
      alert('Te has registrado exitosamente!')
      navigation.navigate("CompleteProfileCarrier");
    }if(respuesta?.role === 1){
      alert('El mail ingresado ya se encuentra en uso!')
    }
  },[respuesta]);



  const navigation = useNavigation();
  const [reg, setReg] = useState({
    nombre: "",
    apellido: "",
    mail: "",
    contraseña: "",
    telefono: "",
    rol: "Seleccionar Perfil...",
  });

  const [check, setCheck] = useState(false);

  const CheckboxChange = (e) => {
    setCheck(!check);
  };

  // const ChangeInput = (e) => {
  //   setReg({
  //     // y sino es  generos y platforms, directamente pongo lo que escribo en el input
  //     ...reg,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // en un objeto pongo lo que tengo en el estado inicial
    let rolex = undefined;
    if (chooseData === "◉ Usuario") {
      rolex = true;
    } if(chooseData === "◉ Transportista") {
      rolex = false;
    }
    const obj = {
      name: reg.nombre,
      lastName: reg.apellido,
      phone: reg.telefono,
      eMail: reg.mail,
      password: reg.contraseña,
      terminosCondiciones: check,
      role: rolex, 
    };

    //validaciones 
    if (!obj.name ) {
      alert("Por favor escribe el Nombre correctamente!")
      return
  }
  if (!obj.lastName) {
      alert("Por favor escribe el Apellido correctamente!")
      return
  }
  if (!obj.eMail.includes('.com') || !obj.eMail.includes('@')  ) {
    alert("Por favor escribe un correo electrónico válido!")
    return
} if (!obj.password) {
  alert("Por favor escribe una Contraseña válida!")
  return
}
if (!obj.phone) {
      alert("Por favor escribe un número de telefono válido!")
      return
  }if (obj.terminosCondiciones === false) {
    alert("Debes aceptar los términos para poder registrarte!")
    return
  }if (obj.role === undefined) {
  alert("Por favor elije un Rol!")
  return
}



    dispatch(registrarUsuario(obj));
    console.log("Estoy enviado", obj);
    setReg({
      nombre: "",
      apellido: "",
      mail: "",
      contraseña: "",
      telefono: "",
      // rol: "",
    });

    console.log(obj);
  };

  //funciones para cambiar e.value de los inputs

  const handelChangeName = (name) => {
    setReg({
      ...reg,
      nombre: name,
    });
  };
  const handelChangeLastName = (name) => {
    setReg({
      ...reg,
      apellido: name,
    });
  };
  const handelChangeMail = (name) => {
    setReg({
      ...reg,
      mail: name,
    });
  };
  const handelChangePass = (name) => {
    setReg({
      ...reg,
      contraseña: name,
    });
  };
  const handelChangeTel = (name) => {
    setReg({
      ...reg,
      telefono: name,
    });
  };

  const [chooseData, setchooseData] = useState("Seleccionar Perfil...");
  const [isModalVisible, setisModalVisible] = useState(false);

  const changeModalVisibility = (bool) => {
    setisModalVisible(bool);
  };

  const setData = (option) => {
    setchooseData(option);
  };
  return (
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
          <Text style={{ color: "#7952B3", fontSize: 24 }}>
            Ingresa a LogiExpress
          </Text>
        </View>
        {/* inputs */}
        <View style={styles.FormView} onSubmit={(e) => handleSubmit(e)}>
          <TextInput
            name="nombre"
            value={reg.nombre}
            onChangeText={(name) => handelChangeName(name)}
            placeholder="Nombre*"
            style={styles.TextInput}
          ></TextInput>

          <TextInput
            value={reg.apellido}
            onChangeText={(name) => handelChangeLastName(name)}
            name="apellido"
            placeholder="Apellido*"
            style={styles.TextInput}
          ></TextInput>

          <TextInput
            icon="mail"
            value={reg.mail}
            onChangeText={(name) => handelChangeMail(name)}
            name="mail"
            placeholder="Dirección de Mail*"
            style={styles.TextInput}
          ></TextInput>

          <TextInput
            value={reg.contraseña}
            onChangeText={(name) => handelChangePass(name)}
            name="contraseña"
            placeholder="Contraseña*"
            secureTextEntry={true}
            style={styles.TextInput}
          ></TextInput>

          <TextInput
            keyboardType={'phone-pad'}
            value={reg.telefono}
            onChangeText={(name) => handelChangeTel(name)}
            name="telefono"
            placeholder="Telefono*"
            style={styles.TextInput}
          ></TextInput>
          <View style={styles.checkbox}>
            <Text style={{ fontWeight: "bold" }}>
              Al registrarme acepto ser mayor de 18 años.
            </Text>
            <CheckBox
              style={styles.checkboxx}
              value={check}
              onValueChange={CheckboxChange}
            ></CheckBox>
          </View>

          <SafeAreaView style={styles.container}>
            <TouchableOpacity
              onPress={() => changeModalVisibility(true)}
              style={styles.TouchableOpacity}
            >
              <Text style={styles.text}>{chooseData}</Text>
            </TouchableOpacity>
            <Modal
              transparent={true}
              animationType="fade"
              visible={isModalVisible}
              nRequestClose={() => changeModalVisibility(false)}
            >
              <ModalPicker
                changeModalVisibility={changeModalVisibility}
                setData={setData}
              />
            </Modal>
          </SafeAreaView>

          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText} onPress={handleSubmit}>
              Registrarme!
            </Text>
          </TouchableOpacity>
          <Button
            title="Perfil usuario"
            onPress={() => navigation.navigate("ProfileUserScreen")}
          />
          <Button
            title="Perfil transportista"
            onPress={() => navigation.navigate("ProfileScreen")}
          />
          <Button
            title="Elegir perfil"
            onPress={() => navigation.navigate("Componentedeauxilio")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
    backgroundColor: "white",
    bottom: 50,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  FormView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: -20,
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
    color: "black",
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
    color: "#E1E8EB",
  },
  SingUpText: {
    color: "#4632a1",
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
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
    marginTop: 20,
    borderRadius: 20,
  },
  text: {
    // marginVertical: 20,
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  TouchableOpacity: {
    backgroundColor: "#FFC107",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  checkboxx: {
    marginTop: 15,
  },
});
