import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
//Agarrar imagen del celu
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";
import { completeProfileUser } from "../../actions/index.js";
import SimpleModal from "./SimpleModal.js";

const CompleteProfileUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const datosUser = useSelector((store) => store.responseReg);
  useEffect(() => {
    console.log("SOY DATOS DEL USER", datosUser);
  }, [datosUser]);




  /// --> ESTADO PARA EL MODAL <-- ///
  const [isModalVisible, setisModalVisible] = useState(false);
  const [chooseData, setchooseData] = useState();

  const changeModalVisible = (bool) => {
    setisModalVisible(bool);
  };

  const setData = (data) => {
    setchooseData(data);
  };
  //// --> ESTADO PARA INPUTS <-- ////
  const [user, setUser] = useState({
    identification: "",
    zone: "",
    account: "",
  });

  ////--> IMAGE PICKER <-- ////
  const [selectedImage, setSelectedImage] = useState(null);
  //console.log(selectedImage) --> la imagen esta en el estado
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Se requiere el permiso para acceder a la cámara");
      return;
    }

    //Si es true va a venir a pickerResult
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (pickerResult.cancelled !== true) {
      let newFile = {
        uri: pickerResult.uri,
        type: `logi/${pickerResult.uri.split(".")[1]}`,
        name: `logi.${pickerResult.uri.split(".")[1]}`,
      };
      handleUpload(newFile);
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "logiexpress");
    data.append("cloud_name", "elialvarez");

    fetch("https://api.cloudinary.com/v1_1/elialvarez/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setSelectedImage(data.url);
      });
  };

  //// ---> HANDLERS INPUTS <--- ////
  const handleChangeIdentification = (identification) => {
    setUser({
      ...user,
      identification: identification,
    });
  };

  const handleChangeZone = (zone) => {
    setUser({
      ...user,
      zone: zone,
    });
  };

  const handleChangeAccount = (account) => {
    setUser({
      ...user,
      account: account,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      identification: user.identification,
      zone: user.zone,
      account: user.account,
      photo: selectedImage,
      id: datosUser.id
    };
    dispatch(completeProfileUser(obj));
    console.log("soy lo que se envia", obj);
  }

  return (
    //// --> INICIO DE PANTALLA <-- ////
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontWeight: "bold",
            marginLeft: 15,
            marginTop: 50,
            fontSize: 25,
          }}
        >
          Perfil
        </Text>
        {/* Foto e iconito de agregar imagen */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri:
                selectedImage !== null
                  ? selectedImage
                  : "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg",
            }}
            style={styles.imgPerfil}
          />
          <View style={styles.add}>
            <TouchableWithoutFeedback onPress={openImagePickerAsync}>
              <Image
                source={require("../add-image.png")}
                style={styles.imgAdd}
              />
            </TouchableWithoutFeedback>

            {/* Inicio de inputs formulario */}
            <View
              style={styles.containerInputs}
              onSubmit={(e) => handleSubmit(e)}
            >
              <View style={styles.viewsInputs}>
                <Icon name="person-circle-outline" size={26} />
                <Text style={{ fontSize: 18, marginLeft: 15 }}>
                  {datosUser.name}
                </Text>
                <TextInput style={styles.textPlaceholder} />
              </View>

              <View style={styles.viewsInputs}>
                <Icon name="person-circle-outline" size={26} />
                <Text style={{ fontSize: 18, marginLeft: 15 }}>
                  {datosUser.lastName}
                </Text>
                <TextInput style={styles.textPlaceholder} />
              </View>

              <View style={styles.viewsInputs}>
                <Icon name="mail-outline" size={26} />
                <Text style={{ fontSize: 18, marginLeft: 15 }}>
                  {datosUser.eMail}
                </Text>
                <TextInput style={styles.textPlaceholder} />
              </View>

              <View style={styles.viewsInputs}>
                <Icon
                  name="reader-outline"
                  size={26}
                  style={{ paddingBottom: 2 }}
                />
                <TextInput
                  value={user.identification}
                  placeholder="Documento de identidad SIN PUNTOS"
                  name="identification"
                  style={styles.textPlaceholder}
                  onChangeText={(identification) =>
                    handleChangeIdentification(identification)
                  }
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={styles.viewsInputs}>
                <Icon
                  name="navigate-outline"
                  size={26}
                  style={{ paddingBottom: 2 }}
                />
                <TextInput
                  value={user.zone}
                  onChangeText={(zone) => handleChangeZone(zone)}
                  placeholder="Lugar de residencia actual"
                  name="zone"
                  style={styles.textPlaceholder}
                />
              </View>

              <View style={styles.viewsInputs}>
                <Icon
                  name="phone-portrait-outline"
                  size={26}
                  style={{ paddingBottom: 2 }}
                />
                <Text style={{ fontSize: 18, marginLeft: 15 }}>
                  {datosUser.phone}
                </Text>
                <TextInput style={styles.textPlaceholder} />
              </View>

              <View style={styles.viewsInputs}>
                <Icon
                  name="card-outline"
                  size={26}
                  style={{ paddingBottom: 2 }}
                />
                <TextInput
                  value={user.account}
                  onChangeText={(account) => handleChangeAccount(account)}
                  placeholder="Medio de pago: mercadoPago"
                  name="account"
                  style={styles.textPlaceholder}
                />
              </View>

              <TouchableOpacity
                style={styles.btnEditar}
                onPress={handleSubmit}
                onPressIn={() => changeModalVisible(true)}
              >
                <Text style={styles.textBtn}>Aceptar</Text>
                {/* MODAL */}
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible}
                  nRequestClose={() => changeModalVisible(false)}
                >
                  <SimpleModal
                    changeModalVisible={changeModalVisible}
                    setData={setData}
                  />
                </Modal>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CompleteProfileUser;

const styles = StyleSheet.create({
  iconBar: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  containerInputs: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 50,
  },
  textPlaceholder: {
    marginLeft: 15,
    fontSize: 17,
    marginBottom: 4,
  },
  btnEditar: {
    backgroundColor: "#FFC107",
    borderRadius: 10,
    width: 150,
    height: 50,
    marginTop: 20,
    alignSelf: "center",
  },
  textBtn: {
    color: "black",
    fontSize: 17,
    alignSelf: "center",
    marginTop: 12,
  },
  viewsInputs: {
    borderColor: "#D5D5D5",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 360,
    alignItems: "flex-start",
    marginBottom: 16,
  },
  imgPerfil: {
    width: 190,
    height: 190,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#FFC107",
    marginTop: 40,
  },
  imgAdd: {
    width: 60,
    height: 60,
    marginLeft: 220,
    marginTop: -80,
    borderWidth: 4,
    borderColor: "#D5D5D5",
    borderRadius: 50,
  },
});
