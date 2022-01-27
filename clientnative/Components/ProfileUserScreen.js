import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { requestPermisse , deletePermisse } from "./../actions/index";
import { useSelector, useDispatch } from "react-redux";

const ProfileUserScreen = () => {
  const resptoken = useSelector((store) => store.respToken);
  const data = useSelector((store) => store.responseLog);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const respPermisse = useSelector((store) => store.respPermisse) 




  useEffect(() => {

      if(respPermisse === 'user sin travel') {
        console.log("AQUI ESTA LA RESPUESTA DEL HANDLeeEEEEEEEEEEE", respPermisse)
        navigation.navigate('RequestTravel', data?.idRole)
       }  
      if(respPermisse?.menssage === 'user travel') {
        console.log("llege aca", respPermisse.payload[0].id)
        navigation.navigate('ScreenWaiting', respPermisse.payload[0].id)
      }  
    return () => {
      dispatch(deletePermisse())
    };
  }, [data, respPermisse]);
  

  console.log("AQUI ESTA LA RESPUESTA DEL HANDLE", respPermisse);
  // console.log("AQUI RESPTOKEN en PROFILEUSERScreen", resptoken);


  const handleRequest = (props) => {
    console.log(props)
    dispatch(requestPermisse(props))
  }



  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.perfilTex}>¡Bienvenid@s!</Text>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{ marginTop: 25 }}>
            <Image
              source={{
                uri:
                  data?.photo !== null
                    ? data.photo
                    : "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg",
              }}
              style={styles.userImg}
            />
          </View>
          <Text style={styles.userName}>
            {data.name} {data.lastname}
          </Text>
        </View>
        <View style={{ flex: 1, marginBottom: 90 }}>
          <TouchableOpacity
            style={styles.btnText}
            onPress={() => {
              navigation.navigate("DatosPersonalesUser");
            }}
          >
            <Icon name="person-circle-outline" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Datos Personales</Text>
            <View style={{ marginLeft: 103 }}>
              <Icon name="chevron-forward-outline" style={styles.icons3} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnText}
            onPress={() => {
              navigation.navigate("HistorialDeViaje");
            }}
          >
            <Icon name="bus-outline" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Historial de viajes</Text>
            <View style={{ marginLeft: 110 }}>
              <Icon name="chevron-forward-outline" style={styles.icons3} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnText}
            onPress={() => navigation.navigate("CotizarViaje")}
          >
            <Icon name="calculator-outline" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Cotizar viaje</Text>
            <Icon name="chevron-forward-outline" style={styles.icons2} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn2}
            onPress={() => handleRequest(data?.idRole)}
          >
            <Image
              style={{ width: 60, height: 40, marginLeft: -4 }}
              source={require("./Utils/UserProfile.png")}
            />
            <Text style={styles.userBtnTxt2}>Solicitar Viaje</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileUserScreen;

const styles = StyleSheet.create({
/*   custom_shape_divider_bottom_1643157144: {
    position: absolute,
    bottom: 0,
    left: 0,
    width: '100%',
    overflow: hidden,
    line_height: 0
}

.custom-shape-divider-bottom-1643157144 svg {
    position: relative;
    display: block;
    width: calc(155% + 1.3px);
    height: 274px;
}

.custom-shape-divider-bottom-1643157144 .shape-fill {
    fill: #FFC107;
} */
  icons: {
    marginRight: 10,
    marginTop: 4,
    fontSize: 22,
  },
  icons2: {
    fontSize: 22,
    marginLeft: "45%",
    marginTop: 4,
  },
  icons3: {
    fontSize: 22,
    alignSelf: "stretch",
    marginTop: 4,
  },
  perfilTex: {
    fontSize: 19,
    fontWeight: "bold",
    alignItems: "flex-start",
    marginTop: 40,
    marginLeft: 20,
  },
  btnText: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    width: "85%",
    height: "14%",
    padding: 10,
    paddingBottom: 10,
    borderRadius: 15,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 27,
    borderColor: "#E1E8EB",
    borderWidth: 1.5,
  },
  btn2: {
    alignContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#FFC107",
    width: "85%",
    height: "18%",
    padding: 10,
    paddingBottom: 10,
    borderRadius: 15,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 25,
  },

  userImg: {
    marginTop: 10,
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 5,
    borderColor: "#FFC107",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 7,
    marginBottom: 20,
  },
  userBtnTxt: {
    marginTop: 2,
    color: "black",
    textAlign: "center",
    fontSize: 18,
    marginTop: 3,
  },
  userBtnTxt2: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 9,
    marginRight: 15,
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
