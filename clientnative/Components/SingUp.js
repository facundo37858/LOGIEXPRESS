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
import SimpleModal1 from "./AlertasReg/SimpleModalok.js";
import SimpleModal2 from "./AlertasReg/SimpleModalok2.js";
import SimpleModal3 from "./AlertasReg/SimpleModalname.js";
import SimpleModal4 from "./AlertasReg/SimpleModalLastname.js";
import SimpleModal5 from "./AlertasReg/SimpleModalmail.js";
import SimpleModal6 from "./AlertasReg/SimpleModalpass.js";
import SimpleModal7 from "./AlertasReg/SimpleModalphone.js";
import SimpleModal8 from "./AlertasReg/SimpleModalterms.js";
import SimpleModal9 from "./AlertasReg/SimpleModalrole.js";


import CheckBox from "expo-checkbox";

// import CheckBox from "@react-native-community/checkbox";
import { ModalPicker } from "./ModalPicker";
import { useDispatch, useSelector } from "react-redux";
import { registrarUsuario } from "../actions/index";

const SignUp = () => {
  const dispatch = useDispatch();

  const respuesta = useSelector((store) => store.responseReg)




  // ALERTAS:

  //REGISTRO USUARIO OK
  const [isModalVisible1, setisModalVisible1] = useState(false);
  const [chooseData1, setchooseData1] = useState();

  const changeModalVisible1 = (bool) => {
    setisModalVisible1(bool);
  };

  const setData1 = (data) => {
    setchooseData1(data);
  };

  // REGISTRO TRANSPORTISTA OK
  const [isModalVisible2, setisModalVisible2] = useState(false);
  const [chooseData2, setchooseData2] = useState();

  const changeModalVisible2 = (bool) => {
    setisModalVisible2(bool);
  };

  const setData2 = (data) => {
    setchooseData2(data);
  };


  // NOMBRE MAL INGRESADO
  const [isModalVisible3, setisModalVisible3] = useState(false);
  const [chooseData3, setchooseData3] = useState();

  const changeModalVisible3 = (bool) => {
    setisModalVisible3(bool);
  };

  const setData3 = (data) => {
    setchooseData3(data);
  };

  // APELLIDO MAL INGRESADO

  const [isModalVisible4, setisModalVisible4] = useState(false);
  const [chooseData4, setchooseData4] = useState();

  const changeModalVisible4 = (bool) => {
    setisModalVisible4(bool);
  };

  const setData4 = (data) => {
    setchooseData4(data);
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
  // TELEFONO MAL INGRESADO

  const [isModalVisible7, setisModalVisible7] = useState(false);
  const [chooseData7, setchooseData7] = useState();

  const changeModalVisible7 = (bool) => {
    setisModalVisible7(bool);
  };

  const setData7 = (data) => {
    setchooseData7(data);
  };
  // NO ACEPTA TERMINOS
  const [isModalVisible8, setisModalVisible8] = useState(false);
  const [chooseData8, setchooseData8] = useState();

  const changeModalVisible8 = (bool) => {
    setisModalVisible8(bool);
  };

  const setData8 = (data) => {
    setchooseData8(data);
  };

  // NO ELIJE ROL
  const [isModalVisible9, setisModalVisible9] = useState(false);
  const [chooseData9, setchooseData9] = useState();

  const changeModalVisible9 = (bool) => {
    setisModalVisible9(bool);
  };

  const setData9 = (data) => {
    setchooseData9(data);
  };


  useEffect(()=>{
    //console.log('aqui esta la respuestaaaa:',respuesta);
    if(respuesta?.role === true){
      // alert('Te has registrado exitosamente!')
      // navigation.navigate("CompleteProfileUser");
      changeModalVisible1(true)
    }if(respuesta?.role === false){
      // alert('Te has registrado exitosamente!')
      // navigation.navigate("CompleteProfileCarrier");
      changeModalVisible2(true)
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
      changeModalVisible3(true)
      return
  }
  if (!obj.lastName) {
      // alert("Por favor escribe el Apellido correctamente!")
      changeModalVisible4(true)
      return
  }
  if (!obj.eMail.includes('.com') || !obj.eMail.includes('@')  ) {
    changeModalVisible5(true)
    // alert("Por favor escribe un correo electrónico válido!")
    return
} if (!obj.password) {
  changeModalVisible6(true)
  // alert("Por favor escribe una Contraseña válida!")
  return
}
if (!obj.phone) {
  changeModalVisible7(true)
      // alert("Por favor escribe un número de telefono válido!")
      return
  }if (obj.terminosCondiciones === false) {
    changeModalVisible8(true)
    // alert("Debes aceptar los términos para poder registrarte!")
    return
  }if (obj.role === undefined) {
    changeModalVisible9(true)
  // alert("Por favor elije un Rol!")
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
            <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible1}
                  nRequestClose={() => changeModalVisible1(false)}
                >
                  <SimpleModal1
                    changeModalVisible1={changeModalVisible1}
                    setData1={setData1}
                  />
                  
                  </Modal>
                  <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible2}
                  nRequestClose={() => changeModalVisible2(false)}
                >
                  <SimpleModal2
                    changeModalVisible2={changeModalVisible2}
                    setData2={setData2}
                  />
                  
                  </Modal>
                  <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible3}
                  nRequestClose={() => changeModalVisible3(false)}
                >
                  <SimpleModal3
                    changeModalVisible3={changeModalVisible3}
                    setData3={setData3}
                  />
                  
                  </Modal>
                  <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible4}
                  nRequestClose={() => changeModalVisible4(false)}
                >
                  <SimpleModal4
                    changeModalVisible4={changeModalVisible4}
                    setData4={setData4}
                  />
                  
                  </Modal>
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
                  visible={isModalVisible7}
                  nRequestClose={() => changeModalVisible7(false)}
                >
                  <SimpleModal7
                    changeModalVisible7={changeModalVisible7}
                    setData7={setData7}
                  />                  
                  </Modal>
                  <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible8}
                  nRequestClose={() => changeModalVisible8(false)}
                >
                  <SimpleModal8
                    changeModalVisible8={changeModalVisible8}
                    setData8={setData8}
                  />                  
                  </Modal>
                  <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible9}
                  nRequestClose={() => changeModalVisible9(false)}
                >
                  <SimpleModal9
                    changeModalVisible9={changeModalVisible9}
                    setData9={setData9}
                  />
                  
                  </Modal>
          </TouchableOpacity>
          <Button
          title="RequestTravel"
          onPress={() => navigation.navigate("RequestTravel")}/>

         
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
