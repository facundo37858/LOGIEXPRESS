import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  requireNativeComponent,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
// prueba para las screens responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import { getVehicules } from "../../actions";
import HeaderBar from "../Utils/HeaderBar";

const DetallesVehicule = () => {
  const dispatch = useDispatch();
  const datosCarrier = useSelector((store) => store.responseLog);
  ////--> HOOK PARA LA NAVEGACION <-- ////
  const navigation = useNavigation();

  //nos traemos el estado para saber si lo hicimos bien
  const vehicules = useSelector((store) => store.vehicules);
  //console.log("soy datos del vehicule", vehicules);

  const idRole = datosCarrier.idRole;
  useEffect(() => {
    // console.log(idRole)
    dispatch(getVehicules(idRole));
  }, [dispatch]);

  /// --> INICIO DEL COMPONENTE <-- ///
  return (
    <View style={styles.container}>
      <ScrollView     
        showsVerticalScrollIndicator={false}> 
        <HeaderBar />
        <Text style={styles.textDetalle}>Detalle del vehículo</Text>
        <View style={styles.viewDetail}>
          <View>
            <Image source={require("./box-truck.png")} style={styles.img} />
          </View>
          <View style={styles.viewText}>
            <Text style={styles.textBrand}>
              {vehicules.brand} {vehicules.model}
            </Text>
            <Text>{vehicules.color}</Text>
            <View style={styles.patent}>
              <Text style={styles.textPatent}>{vehicules.patent}</Text>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditVehicule");
            }}
            style={styles.btnEditar}
          >
            <Text style={styles.textBtn}>Editar vehículo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetallesVehicule;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  textDetalle: {
    marginLeft: wp("4%"),
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
  btnEditar: {
    backgroundColor: "#511281",
    borderRadius: 10,
    width: wp("80%"),
    height: hp("7%"),
    marginTop: wp("10%"),
    alignSelf: "center",
    marginBottom: 20,
  },
  textBtn: {
    color: "white",
    fontSize: hp("2.25%"),
    alignSelf: "center",
    marginTop: 12,
    fontWeight: "bold",
  },
  img: {
    width: wp("30%"),
    height: hp("15%"),
  },
  viewDetail: {
    alignItems: 'center',
    padding: wp("3%"),
    flexDirection: "row",
    marginTop: wp("8%"),
    backgroundColor: "#E8EAE6",
    height: hp('20%'),
    width: wp('92%'),
    borderRadius: hp('2%')
  },
  viewText: {
    flexDirection: "column",
    marginLeft: wp("5%"),
  },
  patent: {
    padding: wp("1%"),
    borderColor: "#9D9D9D",
    borderWidth: wp('0.75%'),
    borderRadius: wp("5%"),
    marginTop: wp("7%"),
  },
  textBrand: {
    fontWeight: "bold",
    fontSize: hp("2.40%"),
  },
  textPatent: {
    fontSize: hp("2%"),
    textAlign: "center",
    fontWeight: "bold",
  },
});
