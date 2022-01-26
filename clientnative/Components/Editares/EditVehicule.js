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
} from "react-native";
//iconos
import Icon from "react-native-vector-icons/Ionicons";
// HOOK PARA LA NAVEGACION
import { useNavigation } from "@react-navigation/core";
import HeaderBar from "../Utils/HeaderBar";
// prueba para las screens responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { editVehicule } from "../../actions";
import SimpleModal from "./SimpleModal";
import { desmount  } from "../../actions";


const EditVehicule = () => {
  ////--> HOOK PARA LA NAVEGACION <-- ////
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const vehicule = useSelector((store) => store.editVehicule)
  //console.log(editUser)

  // useEffect(() => {
  //   if(editUser?.msg) {
  //    // changeModalVisible(true)
  //   }
  // }, [vehicule]);

  useEffect(() => {
    return () => {
     dispatch(desmount())
    };
  }, [dispatch]);


  return (
    <View style={styles.container}>
      <View>
        <HeaderBar  screen={'null'}/>
        <Text style={styles.textEditar}>Editar datos del vehiculo</Text>
        <View style={styles.containerInputs}>
          <View style={styles.viewsInputs}>
            <Icon name="newspaper-outline" style={styles.icons} />
            <TextInput
              placeholder="Licencia actualizada"
              name="license"
              style={styles.textPlaceholder}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="car-outline" style={styles.icons} />
            <TextInput
              placeholder="Scania, Mercedes-Benz, etc."
              name="brand"
              style={styles.textPlaceholder}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="document-outline" style={styles.icons} />
            <TextInput
              placeholder="Número de patente"
              name="patent"
              style={styles.textPlaceholder}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="car-sport-outline" style={styles.icons} />
            <TextInput
              placeholder="Modelo de vehículo"
              name="model"
              style={styles.textPlaceholder}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="color-palette-outline" style={styles.icons} />
            <TextInput
              placeholder="Color del vehículo"
              name="color"
              style={styles.textPlaceholder}
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="construct-outline" style={styles.icons} />
            <TextInput
              placeholder="Capacidad de carga en toneladas"
              name="capacity"
              style={styles.textPlaceholder}
            />
          </View>
        </View>

        <View style={styles.btn2}>
          <TouchableOpacity
            style={styles.btnEditar}
            onPress={() => navigation.navigate("DetallesVehicule")}
          >
            <Text style={styles.textBtn}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
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
  container: {
    flex: 1,
    alignItems: "center",
  },
  textEditar: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    paddingHorizontal: wp("3%"),
  },
  containerInputs: {
    marginTop: wp('8%'),
  },
  viewsInputs: {
    padding: wp('2.7%'),
    backgroundColor: "#E8EAE6",
    borderRadius: wp('3%'),
    flexDirection: "row",
    width: wp('92%'),
    marginBottom: wp('4.8%'),
  },
  textPlaceholder: {
    marginLeft: 20,
    fontSize: hp('2%'),
    marginBottom: wp('0.25%'),
  },
  icons:{
    fontSize: hp('3.3%'),
  },
  btnEditar: {
    backgroundColor: "#511281",
    borderRadius: wp('3%'),
    width: wp('43%'),
    height: hp('7%'), 
  },
  textBtn: {
    color: "white",
    fontSize: hp('2.25%'),
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: wp('3%')
  },
  btn2: { 
    flexDirection: "row",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: wp('30%'),
    width: wp('90%')
    
  },
});

export default EditVehicule;
