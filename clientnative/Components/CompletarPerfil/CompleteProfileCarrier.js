import React, { useState } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
//Agarrar imagen del celu
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";

const CompleteProfileUser = () => {
  ////--> IMAGE PICKER <-- ////
  const [selectedImage, setSelectedImage] = useState(null);

  const navigation = useNavigation();

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Se requiere el permiso para acceder a la cámara");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  //// --> Inicio de componente <-- ////

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconBar}>
          <TouchableOpacity
            //no esta conectado a ningun lugar
            onPress={() => navigation.navigate("Componentedeauxilio")}
          >
            <Icon name="chevron-back-outline" size={30} />
          </TouchableOpacity>
        </View>
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
                  ? selectedImage.localUri
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
            <View style={styles.containerInputs}>
              <Text
                style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}
              >
                Datos personales
              </Text>
              <View style={styles.viewsInputs}>
                <Icon name="person-circle-outline" size={26} />
                <TextInput
                  placeholder="Nombre"
                  name="name"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="person-circle-outline" size={26} />
                <TextInput
                  placeholder="Apellido"
                  name="lastname"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="mail-outline" size={26} />
                <TextInput
                  placeholder="sprint1.jebusayudanos@gmail.com"
                  name="email"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="reader-outline" size={26} />
                <TextInput
                  placeholder="Documento de identidad"
                  name="documentID"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="phone-portrait-outline" size={26} />
                <TextInput
                  placeholder="Celular válido"
                  name="phone"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="map-outline" size={26} />
                <TextInput
                  placeholder="Lugar de residencia actual"
                  name="location"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="card-outline" size={26} />
                <TextInput
                  placeholder="Medio de pago válido"
                  name="CBU"
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
                    placeholder="Licencia actualizada"
                    name="license"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="car-outline" size={26} />
                  <TextInput
                    placeholder="Scania, Mercedes-Benz, etc."
                    name="brand"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="document-outline" size={26} />
                  <TextInput
                    placeholder="Patente del vehiculo"
                    name="patent"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="car-sport-outline" size={26} />
                  <TextInput
                    placeholder="Modelo, año de salida al mercado"
                    name="model"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="color-palette-outline" size={26} />
                  <TextInput
                    placeholder="Rojo, gris, negro, óxido"
                    name="color"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="construct-outline" size={26} />
                  <TextInput
                    placeholder="Capacidad de carga vehiculo"
                    name="capacity"
                    style={styles.textPlaceholder}
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.btnEditar}>
                <Text style={styles.textBtn}>Enviar</Text>
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
