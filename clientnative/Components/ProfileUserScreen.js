import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import StarRating from './StarRating'

const ProfileUserScreen = () => {
 
  const rating = 4;

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, alignItems: "center", justifyContent: 'center' }}>
          <View style={{ marginTop: 50}}>
          <View style={{ marginTop: 25 }}>
            <Image
              style={styles.userImg}
              source={require("./Utils/foto1.jpg")}
            />
          </View>
          </View>
          
          <Text style={styles.userName}>El Usuario</Text>
          <Text style={styles.aboutUser}>Calificacion</Text>
          <StarRating ratings={rating} reviews={rating}/>
        </View>
        <View>
          <TouchableOpacity style={styles.btnText}>
            <Icon
              name="person-circle-outline"
              size={23}
              style={{ marginRight: 10, marginTop: 2 }}
            />
            <Text style={styles.userBtnTxt}>Datos Personales</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnText}>
            <Icon
              name="receipt-outline"
              size={23}
              style={{ marginRight: 10, marginTop: 2 }}
            />
            <Text style={styles.userBtnTxt}>Historial de Viajes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnText}>
            <Icon
              name="construct-outline"
              size={23}
              style={{ marginRight: 10, marginTop: 2 }}
            />
            <Text style={styles.userBtnTxt}>Medio de Pago</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnText}>
            <Icon
              name="calculator-outline"
              size={23}
              style={{ marginRight: 10, marginTop: 2 }}
            />
            <Text style={styles.userBtnTxt}>Cotizar viaje</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnText2} onPress={() => navigation.navigate("RequestTravel")}>
            <Icon name="hand-right-outline" size={23} style={{ marginRight: 10, marginTop: 2 }} color={'#fff'} />
            <Text style={styles.userBtnTxt2}>Solicitar Viaje</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 25,
    width: "100%",
    height: 10,
  },
  userImg: {
    marginTop: 10,
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 5,
    borderColor: "#7952B3",
  },
  btnText: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
  },
  btnText2: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#828",
    width: "90%",
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
    marginBottom: 30,
  },
  userImg: {
    height: 180,
    width: 180,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: '#7952B3'
  },
  userName: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 3,
  },
  useStars: {
    justifyContent: "center",
    flexDirection: "row",
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    width: "45%",
    justifyContent: "center",
    flex: 1,
  },
  userBtnTxt: {
    color: "#000",
    textAlign: "center",
    fontSize: 23,
  },
  userBtnTxt2: {
    color: "#fff",
    textAlign: "center",
    fontSize: 23,
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
