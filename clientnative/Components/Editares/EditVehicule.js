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
//iconos
import Icon from "react-native-vector-icons/Ionicons";
// HOOK PARA LA NAVEGACION
import { useNavigation } from "@react-navigation/core";

const EditVehicule = () => {
 ////--> HOOK PARA LA NAVEGACION <-- ////
 const navigation = useNavigation();

  return (
    <View>
      {/* Inicio de los input de completar vehiculo */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}>
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
            placeholder="Número de patente del vehiculo"
            name="patent"
            style={styles.textPlaceholder}
          />
        </View>
        <View style={styles.viewsInputs}>
          <Icon name="car-sport-outline" size={26} />
          <TextInput
            placeholder="Modelo de vehículo"
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
        <View style={styles.btn2}>
              <TouchableOpacity
                style={styles.btnEditar}
                onPress={() => navigation.navigate("ProfileScreenCarrier")}
              >
                <Text style={styles.textBtn}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                ///---> PONER A DONDE TIENE QUE VOLVER <--- ///
                style={styles.btnEditar}
              >
                <Text style={styles.textBtn}>Editar</Text>
              </TouchableOpacity>
            </View>
      </View>
    </View>
  );
};

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
      marginTop: 40,
      marginLeft: 20,
    },
    imgPerfil: {
      width: 170,
      height: 170,
      borderRadius: 100,
      borderColor: "#511281",
      borderWidth: 6,
      marginTop: 40,
    },
    imgAdd: {
      width: 50,
      height: 50,
      marginLeft: 135,
      marginTop: -70,
      borderWidth: 3,
      borderColor: "#FFC107",
      borderRadius: 50,
    },
  
    textPlaceholder: {
      marginLeft: 20,
      fontSize: 17,
      marginBottom: 2,
    },
    btnEditar: {
      backgroundColor: "#511281",
      borderRadius: 10,
      width: 150,
      height: 50,
      marginTop: 20,
      alignSelf: "center",
      marginBottom: 20,
      marginRight: 30,
    },
    textBtn: {
      color: "white",
      fontSize: 17,
      alignSelf: "center",
      marginTop: 12,
    },
    viewsInputs: {
      margin: 2,
      borderColor: "#511281",
      borderBottomWidth: 2,
      flexDirection: "row",
      width: 360,
      alignItems: "flex-start",
      marginBottom: 15,
    },
    btn2: { flexDirection: "row", marginLeft: 20 },
  });

  export default EditVehicule;