import React, { useState } from "react";
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
} from "react-native";

import CheckBox from "expo-checkbox";

// import CheckBox from "@react-native-community/checkbox";
import { ModalPicker } from "./ModalPicker";
import { useDispatch } from "react-redux";
import { registrarUsuario } from "../actions/index";

const SignUp = () => {
  const dispatch = useDispatch();

  const [reg, setReg] = useState({
    nombre: "",
    apellido: "",
    mail: "",
    contraseña: "",
    telefono: "",
    rol: "Seleccionar Perfil...",
  });

  const [check, setCheck] = useState(false);
  const [isSelected, setSelection] = useState(false)

  const CheckboxChange = (e) => {
    setCheck(!check);
  };

  const ChangeInput = (e) => {
    
    setReg({
      // y sino es  generos y platforms, directamente pongo lo que escribo en el input
      ...reg,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // en un objeto pongo lo que tengo en el estado inicial
    const obj = {
      name: reg.nombre,
      lastName: reg.apellido,
      phone: reg.telefono,
      eMail: reg.mail,
      password: reg.contraseña,
      terminosCondiciones: check,
      role: true,
    };
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

  const [chooseData, setchooseData] = useState("Seleccionar Perfil...");
  const [isModalVisible, setisModalVisible] = useState(false);

  const changeModalVisibility = (bool) => {
    setisModalVisible(bool);
  };

  const setData = (option) => {
    setchooseData(option);
  };

  const handelChangeName=(name)=>{
    setReg({
      ...reg,
      nombre:name
    })
  }
  const handelChangeLastName=(name)=>{
    setReg({
      ...reg,
      apellido:name
    })
  }
  const handelChangeMail=(name)=>{
    setReg({
      ...reg,
      mail:name
    })
  }
  const handelChangePass=(name)=>{
    setReg({
      ...reg,
      contraseña:name
    })
  }
  const handelChangeTel=(name)=>{
    setReg({
      ...reg,
      telefono:name
    })
  }
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
            style={{ color: "#ffbe0b", fontSize: 100 }}
          />
          <Text style={styles.brandViewText}>LOGIEXPRESS</Text>
        </View>
      </ImageBackground>
      {/* Botton View */}
      <View style={styles.bottonView}>
        {/* Welcome View */}
        <View style={{ padding: 40, display: "flex", alignItems: "center" }}>
          <Text style={{ color: "#4632a1", fontSize: 24 }}>
            Ingresa a LogiExpress
          </Text>
        </View>
        {/* inputs */}
        <View
          style={styles.FormView}
          //onChange={(e) => ChangeInput(e)}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextInput
            name="nombre"
            value={reg.nombre}
            // onChangeText={(text) => setReg({ ...reg, nombre: text })}
            onChangeText={(name)=>handelChangeName(name)}
            placeholder="Nombre*"
            style={styles.TextInput}
          ></TextInput>

          <TextInput
            value={reg.apellido}
            onChangeText={(text) => handelChangeLastName(text)}
            name="apellido"
            placeholder="Apellido*"
            style={styles.TextInput}
          ></TextInput>

          <TextInput
            icon="mail"
            value={reg.mail}
            onChangeText={(text) => handelChangeMail(text)}
            name="mail"
            placeholder="Dirección de Mail*"
            style={styles.TextInput}
          ></TextInput>

          <TextInput
            value={reg.contraseña}
            onChangeText={(text) =>handelChangePass(text)}
            name="contraseña"
            placeholder="Contraseña*"
            secureTextEntry={true}
            style={styles.TextInput}
          ></TextInput>

          <TextInput
            value={reg.telefono}
            onChangeText={(text) => handelChangeTel(text)}
            name="telefono"
            placeholder="Telefono*"
            style={styles.TextInput}
          ></TextInput>
          {/* <View>
            <Text>
              Al registrarme acepto los términos y condiciones del sitio.
            </Text>
             <CheckBox value={check} onChange={CheckboxChange}></CheckBox> 
            <CheckBox
          
          onValueChange={CheckboxChange}
          
        />
          </View> */}
          <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={check}
          onValueChange={CheckboxChange}
          
        />
        <Text>Do you like React Native?</Text>
      </View>
      <Text>Is CheckBox selected: {check ? "👍" : "👎"}</Text>
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
            <Text style={styles.ButtonText} onPress={(e)=>handleSubmit(e)}>
              Registrarme!
            </Text>
          </TouchableOpacity>
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
    color: "#ffbe0b",
    fontSize: 45,
    fontWeight: "bold",
    textTransform: "uppercase",
    // justifyContent:'flex-start'
  },
  bottonView: {
    flex: 1.5,
    backgroundColor: "#ffffffff",
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
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
    color: "yellow",
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
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  TouchableOpacity: {
    backgroundColor: "#ffbe0b",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
