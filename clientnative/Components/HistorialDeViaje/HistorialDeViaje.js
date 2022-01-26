import { ScrollView, StyleSheet, Text, View, Button, Image } from "react-native";
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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

const HistorialDeViaje = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const datosUser = useSelector((store) => store.responseLog);

  //nos traemos el estado para saber si lo hicimos bien
  const dataTravels = useSelector((store) => store.travelsUser.payload);
   console.log('ey, lo hicimos bien?', dataTravels)

  // // const travelsCarrier = useSelector((store) => store.travelsCarrier)
  // // console.log('viajes carrier', travelsCarrier)

  const idUserReg = datosUser.id;
  useEffect(() => {
    dispatch(getTravelUser(idUserReg));
  }, [dispatch]);

  /// --> INICIO DEL COMPONENTE <-- ///
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar />
        <View style={styles.containerHeaders}>
          <HeaderBar  screen={'null'}/>
          <Text style={{ fontSize: hp("2.5%"), fontWeight: "bold" }}>
            Historial de viajes
          </Text>
          <Text style={styles.textViajes}>
            Tus viajes realizados con sus detalles.
          </Text>
        </View>
        <View style={styles.viewAnterior}>
          <Text style={styles.textAnterior}>EN CURSO</Text>
        </View>
        <View style={styles.containerCards}>
          <View style={styles.cards}>
            <View style={styles.insideCard1}>
              
             <View>
             <Text>Descripcion del viaje: Medicamentos</Text>
              <Text>Villa Angela, Chaco, Argentina</Text>
              <Text>Buenos Aires, Argentina</Text>
              <Text style={{ color: "green", fontWeight: "bold" }}>
                En proceso
              </Text>
              <Text style={styles.price1}>$ 10000</Text>
             </View>
             <View style={{marginTop: wp('-3%'), marginLeft: wp('11')}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate("Chat");
                  }}
                >
                  <Image
                    source={require("./burbuja-de-dialogo.png")}
                    style={{ width: wp("16%"), height: hp("7%")}}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.viewAnterior}>
          <Text style={styles.textAnterior}>ANTERIORES</Text>
        </View>
        {dataTravels?.map((datos, index) => {
          const orig = datos.orig.split("/");
          const dest = datos.destination.split("/");
          return (
            <View key={index}>
              <View style={styles.containerCards}>
                <View style={styles.cards}>
                  <View style={styles.insideCard}>
                    <Text>Descripcion del viaje: {datos.description}</Text>
                    <Text>Peso en toneladas: {datos.weight}</Text>
                    <Text>{orig[2]}</Text>
                    <Text>{dest[2]}</Text>
                    <Text style={styles.textFinished}>{datos.finishedTravel}</Text>
                    <Text style={styles.price}>$ {datos.price}</Text>
                  </View>
                </View>
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
    width: wp("95%"),
    marginHorizontal: wp("2.5%"),
    marginTop: wp("1%"),
    paddingBottom: wp("2.75%"),
  },
  containerHeaders: {
    flex: 1,
    marginLeft: wp("5%"),
    paddingBottom: wp("2%"),
  },
  textHistorial: {
     fontSize: hp("2.5%"), 
     fontWeight: "bold" 
    },
    textViajes: { 
      fontSize: hp("1.75%") 
    },
  viewAnterior: {
    padding: wp("2%"),
    backgroundColor: "#DDDDDD", //"#FFC107",
    width: wp("95%"),
    marginLeft: wp("2%"),
    marginTop: wp("1%"),
    marginBottom: wp("2.5%"),
    borderColor: "#DDDDDD",
    borderBottomWidth: wp("0.55%"),
    borderTopWidth: wp("0.55%"),
  },
  textAnterior: {
    fontSize: hp("1.60%"),
    marginLeft: wp("2%"),
    fontWeight: "bold",
  },
  cards: {
    backgroundColor: "#F6F6F6",
    borderRadius: wp("3%"),
  },
  insideCard: {
    width: wp("91%"),
    padding: wp("5%"),
    
  },
  insideCard1: {
    width: wp("91%"),
    padding: wp("5%"),
    flexDirection: 'row'
  },
  price: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
  price1: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: hp("2%"),
    marginLeft: wp('18%')
  },
  textFinished: {color: 'red', fontWeight: 'bold'}
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
