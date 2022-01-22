import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderBar from "../Utils/HeaderBar";
// prueba para las screens responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const HistorialDeViaje = () => {
  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ flex: 1, marginTop: wp("10%"), marginLeft: wp('5%')  }}
        >
          <HeaderBar />
          <Text style={{ fontSize: hp("2.5%")}}>Historial de viaje</Text>
        </View>
        <View>
          <Text style={{marginLeft: wp('5%')  }} >Datos del viaje</Text>

        </View>
      </ScrollView>
    </View>
  );
};

export default HistorialDeViaje;

const styles = StyleSheet.create({});

/*container: { flex: 1 },
  textWrapper: {
    height: hp('70%'), // 70% of height device screen
    width: wp('80%')   // 80% of width device screen
  },
  myText: {
    fontSize: hp('5%') // End result looks like the provided UI mockup
  }
});*/
