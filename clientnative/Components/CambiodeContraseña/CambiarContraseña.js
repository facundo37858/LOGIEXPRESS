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
  Modal
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
//iconos
import Icon from "react-native-vector-icons/Ionicons";
//Hook para la navegacion
import { useNavigation } from "@react-navigation/core";
import ModalContraseña from './ModalContraseña';


const CambiarContraseña = () => {
   

    const data = useSelector((store) => store.responseLog);

    useEffect(() => {
        //console.log("data", data)
      }, [data]);

 /// --> ESTADO PARA EL INPUT <-- ///
 const [contraseña, setContraseña] = useState('');
 
//  const handleChange = (contraseña) => {
//      setContraseña({
//          ...contraseña,
//          contraseña : contraseña

//      })
//  }

 
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
    <View
      style={{
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <Image
        source={require("./contrasena2.png")}
        style={{ height: 170, width: 170, marginTop: 40 }}
      />
      <Text style={styles.textPass}>Cambiar contraseña</Text>
      <View>
        <Text style={{textAlign: 'left', fontSize: 18}}>Nueva contraseña</Text>
      </View>

      <View style={styles.viewsInputs}>
        <TextInput
        //value={contraseña.contraseña}
          placeholder="Nueva contraseña"
          name="phone"
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
                id = {data.id}
                contraseña = {contraseña}
              />
            </Modal>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewsInputs: {
    marginTop: 10,
    backgroundColor: "#F0D9FF",
    justifyContent: "flex-start",
    height: 55,
    width: "89%",
    alignItems: "flex-start",
    marginBottom: 15,
    borderRadius: 20,
  },
  textPlaceholder: {
    marginLeft: 10,
    fontSize: 17,
  },
  textPass: {
    marginTop: 30,
    marginBottom: 40,
    fontSize: 24,
    fontWeight: "bold",
  },
  btnEditar: {
    backgroundColor: "#FFC107",
    borderRadius: 10,
    width: 150,
    height: 50,
    marginTop: 40,
    alignSelf: "center",
    marginBottom: 20,
  },

  textBtn: {
    color: "white",
    fontSize: 17,
    alignSelf: "center",
    marginTop: 12,
  },
});

export default CambiarContraseña;
