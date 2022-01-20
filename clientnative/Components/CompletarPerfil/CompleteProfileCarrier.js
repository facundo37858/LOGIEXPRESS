import React, { useEffect, useState } from "react";
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
  Modal
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
//Agarrar imagen del celu
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { completeProfileCarrier } from "../../actions/index.js";
import SimpleModal from "./SimpleModal.js";

const CompleteProfileUser = () => {
  const dispatch = useDispatch();

  const datosCarrier = useSelector((store) => store.responseReg);

  useEffect(() => {
    console.log("SOY DATOS DEL CARRIER", datosCarrier);
  }, [datosCarrier]);

   /// --> ESTADO PARA EL MODAL <-- ///
   const [isModalVisible, setisModalVisible] = useState(false)
   const [chooseData, setchooseData] = useState();
 
   const changeModalVisible = (bool) => {
     setisModalVisible(bool)
   }
 
   const setData = (data) => {
     setchooseData(data)
   }
   
  //// --> ESTADO PARA LOS INPUTS <-- ////

  const [carrier, setCarrier] = useState({
    //Datos del carrier//
    documentID: "",
    license: "",
    phone: "",
    location: "",
    //Datos del vehiculo//
    brand: "",
    patent: "",
    model: "",
    color: "",
    capacity: "",
  });

  ////--> IMAGE PICKER <-- ////
  const [selectedImage, setSelectedImage] = useState(null);

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
  //Carrier//
  const handleChangeDocumentID = (documentID) => {
    setCarrier({
      ...carrier,
      documentID: documentID,
    });
  };

  const handleChangeLicense = (license) => {
    setCarrier({
      ...carrier,
      license: license,
    });
  };


  const handleChangeLocation = (location) => {
    setCarrier({
      ...carrier,
      location: location,
    });
  };
   
  //Vehicule//
  const handleChangeBrand = (brand) => {
    setCarrier({
      ...carrier,
      brand: brand, 
    });
  };

  const handleChangePatent = (patent) => {
    setCarrier({
      ...carrier,
      patent: patent,
    });
  };

  const handleChangeModel = (model) => {
    setCarrier({
      ...carrier,
      model: model,
    });
  };

  const handleChangeColor = (color) => {
    setCarrier({
      ...carrier,
      color: color,
    });
  };

  const handleChangeCapacity = (capacity) => {
    setCarrier({
      ...carrier,
      capacity: capacity,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      id:datosCarrier.id,
      documentID: carrier.documentID,
      license: carrier.license,
      location: carrier.location,
      photo: selectedImage,
      // Vehicule //
      brand: carrier.brand,
      patent: carrier.patent,
      model: carrier.model,
      color: carrier.color,
      capacity: carrier.capacity,
    };
    dispatch(completeProfileCarrier(obj));
    console.log("soy lo que se envia", obj);
    // setCarrier({
    //   //Datos del carrier//
    //   documentID: "",
    //   license: "",
    //   location: "",
    //   Cuenta: "",
    //   //Datos del vehiculo//
    //   brand: "",
    //   patent: "",
    //   model: "",
    //   color: "",
    //   capacity: "",
    // });
  }

  //// --> Inicio de componente <-- ////

  return (
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
            fontSize: 23,
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
                source={require("./add-image.png")}
                style={styles.imgAdd}
              />
            </TouchableWithoutFeedback>

            {/* Inicio de inputs formulario */}
            <View
              style={styles.containerInputs}
              onSubmit={(e) => handleSubmit(e)}
            >
              <Text
                style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}
              >
                Datos personales
              </Text>
              <View style={styles.viewsInputs}>
                <Icon name="person-circle-outline" size={26} />
                <Text style={{ fontSize: 18, marginLeft: 15 }}>
                  {datosCarrier.name}
                </Text>
                <TextInput style={styles.textPlaceholder} />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="person-circle-outline" size={26} />
                <Text style={{ fontSize: 18, marginLeft: 15 }}>
                  {datosCarrier.lastName}
                </Text>
                <TextInput style={styles.textPlaceholder} />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="mail-outline" size={25} />
                <Text style={{ fontSize: 18, marginLeft: 15 }}>
                  {datosCarrier.eMail}
                </Text>
                <TextInput style={styles.textPlaceholder} />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="reader-outline" size={26} />
                <TextInput
                  value={carrier.documentID}
                  placeholder="Documento de identidad SIN PUNTOS"
                  name="documentID"
                  style={styles.textPlaceholder}
                  onChangeText={(documentID) =>
                    handleChangeDocumentID(documentID)
                  }
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="phone-portrait-outline" size={26} />
                <Text style={{ fontSize: 18, marginLeft: 15 }}>
                  {datosCarrier.phone}
                </Text>
                <TextInput style={styles.textPlaceholder} />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="map-outline" size={26} />
                <TextInput
                  value={carrier.location}
                  onChangeText={(location) => handleChangeLocation(location)}
                  placeholder="Lugar de residencia actual"
                  name="location"
                  style={styles.textPlaceholder}
                />
              </View>
              
              {/* Inicio de los input de completar vehiculo */}

              <View style={{ marginTop: 30 }}>
                <Text
                  style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}
                >
                  Datos del vehiculo
                </Text>
                <View style={styles.viewsInputs}>
                  <Icon name="newspaper-outline" size={26} />
                  <TextInput
                    value={carrier.license}
                    onChangeText={(license) => handleChangeLicense(license)}
                    placeholder="Licencia actualizada"
                    name="license"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="car-outline" size={26} />
                  <TextInput
                    value={carrier.brand}
                    onChangeText={(brand) => handleChangeBrand(brand)}
                    placeholder="Scania, Mercedes-Benz, etc."
                    name="brand"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="document-outline" size={26} />
                  <TextInput
                    value={carrier.patent}
                    onChangeText={(patent) => handleChangePatent(patent)}
                    placeholder="Patente del vehiculo"
                    name="patent"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="car-sport-outline" size={26} />
                  <TextInput
                    value={carrier.model}
                    onChangeText={(model) => handleChangeModel(model)}
                    placeholder="Modelo, año de salida al mercado"
                    name="model"
                    keyboardType="decimal-pad"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="color-palette-outline" size={26} />
                  <TextInput
                    value={carrier.color}
                    onChangeText={(color) => handleChangeColor(color)}
                    placeholder="Rojo, gris, negro, óxido"
                    name="color"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="construct-outline" size={26} />
                  <TextInput
                    value={carrier.capacity}
                    onChangeText={(capacity) => handleChangeCapacity(capacity)}
                    placeholder="Capacidad de carga vehiculo"
                    name="capacity"
                    style={styles.textPlaceholder}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.btnEditar}  onPress={handleSubmit} onPressIn={() => changeModalVisible(true)}>
                <Text style={styles.textBtn}>
                  Enviar
                </Text>
                 {/* MODAL */}
                 <Modal
                   transparent={true}
                   animationType="fade"
                   visible={isModalVisible}
                   nRequestClose={()=> changeModalVisible(false)}
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
    marginLeft: 20,
    fontSize: 17,
    marginBottom: 2,
  },
  imgPerfil: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderColor: "#511281",
    borderWidth: 6,
    marginTop: 30,
  },
  imgAdd: {
    width: 55,
    height: 55,
    marginLeft: 222,
    marginTop: -82,
    borderWidth: 4,
    borderColor: "#D5D5D5",
    borderRadius: 50,
  },

  btnEditar: {
    backgroundColor: "#7952B3",
    borderRadius: 10,
    width: 150,
    height: 50,
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
  textBtn: {
    color: "white",
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
    marginBottom: 15,
  },
});
