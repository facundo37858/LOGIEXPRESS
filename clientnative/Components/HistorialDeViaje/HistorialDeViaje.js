import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { useEffect } from "react";
import React from "react";
import HeaderBar from "../Utils/HeaderBar";
// prueba para las screens responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import { getTravelUser } from "../../actions";

const HistorialDeViaje = () => {
  const dispatch = useDispatch();
  const datosUser = useSelector((store) => store.responseLog);

  //nos traemos el estado para saber si lo hicimos bien
  const dataTravels = useSelector((store) => store.travelsUser.payload);
  // console.log('ey, lo hicimos bien?', dataTravels)

  const idUserReg = datosUser.id;
  useEffect(() => {
    dispatch(getTravelUser(idUserReg));
  }, [dispatch]);

  /// --> INICIO DEL COMPONENTE <-- ///
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginTop: wp("10%"), marginLeft: wp("5%") }}>
          <HeaderBar />
          <Text style={{ fontSize: hp("2.5%")}}>Historial de viajes</Text>
        </View>
        {/* <View>
          <Text
            style={{
              marginLeft: wp("5%"),
              // backgroundColor: "#DDDDDD",
              padding: wp("3"),
            }}
          >
            Anteriores
          </Text>
        </View> */}
        {dataTravels?.map((datos, index) => {
          const orig = datos.orig.split("/");
          const dest = datos.destination.split("/");
          return (
            <View key={index}>
              <View style={styles.containerCards}>               
                <Text>{datos.description}</Text>
                <Text>{datos.weight}</Text>
                <Text>{orig[2]}</Text>
                <Text>{dest[2]}</Text>
                <Text>{datos.finishedTravel}</Text>
                <Text>${datos.price}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HistorialDeViaje;

const styles = StyleSheet.create({
  containerCards: {
    flex: 1,
    width: wp("91%"),
    justifyContent: "center",
    alignItems: "flex-start",
    margin: wp("5%"),
    backgroundColor: '#EEEEEE',
    borderColor: 'black',
    borderWidth: hp('0.1%'),
  
  },
});

/*container: { flex: 1 },
  textWrapper: {
    height: hp('70%'), // 70% of height device screen
    width: wp('80%')   // 80% of width device screen
  },
  myText: {
    fontSize: hp('5%') // End result looks like the provided UI mockup
  }
});*/


