import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, Modal } from "react-native";
import { logiarUsuario } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import StarRating from "../StarRating";
import HeaderBar from "../Utils/HeaderBar";


const DatosPersonalesCarrier = (props) => {
  const data = useSelector((store) => store.responseLog);
  const navigation = useNavigation();
  const rating = 3;

  async function save(key, value) {
    //FUNCION PARA GUARDAR LA INFO EN EL STORE, KEY = token , VALUE=el string del token
    await SecureStore.setItemAsync(key, value);
  }

  const cerrarsesion = () =>{
    save("token", '')
    navigation.navigate('singIn')
  }

  useEffect(() => {
    //console.log("data", data)
  }, [data]);

  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginTop: 35}}>
        <HeaderBar/>
      </View>
        <Text style={styles.perfilTex}>Datos personales</Text>
        <View
          style={{
            flexDirection: "row",
            alignContent: "flex-start",
            marginLeft: 25,
          }}
        >
          <View style={{ marginTop: 25 }}>
          <Image
              source={{
                uri:
                  data.photo !== null
                    ? data.photo
                    : "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg",
              }}
              style={styles.userImg}
            />
          </View>
          <View style={styles.boxDatos}>
            <Text style={styles.userName}>
              {data.name} {data.lastname}
            </Text>
            <Text style={{ fontSize: 17 }}>{data.eMail}</Text>
            <Text style={{ fontSize: 17 }}>{data.location}</Text>
            <View style={{ marginTop: 2, marginStart:-5}}>
              <StarRating
                ratings={rating}
                reviews={rating}
                size={30}
              ></StarRating>
            </View>
          </View>
        </View>

        <View style={styles.botones}>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={styles.textBtn}
              onPress={() => navigation.navigate("EditProfile")}
            >
              Editar perfil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} 
           onPress={() => navigation.navigate("CambiarContraseña")}
            >
            <Text style={styles.textBtn}>Cambiar contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => cerrarsesion()}>
            <Text style={styles.textBtn}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DatosPersonalesCarrier;

const styles = StyleSheet.create({
  perfilTex: {
    fontSize: 25,
    fontWeight: "bold",
    alignItems: "flex-start",
    marginTop: 30,
    marginLeft: 20,
  },
  userImg: {
    marginTop: 10,
    height: 110,
    width: 110,
    borderRadius: 55,
    borderWidth: 5,
    borderColor: "#FFC107",
  },
  userName: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 1,
  },
  boxDatos: {
    flexDirection: "column",
    marginTop: 45,
    marginLeft: 20,
  },
  estrellitas: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 20,
  },
  botones: {
    alignContent: "center",
    alignItems: "center",
    margin: 100,
  },
  btn: {
    borderWidth: 4,
    borderColor: "#FFC107",
    width: 250,
    height: 50,
    marginBottom: 20,
    borderRadius: 15,
    justifyContent:'center'
  },
  textBtn: {
    display:'flex',
    textAlign: "center",
    fontSize: 21,
    fontWeight: "bold",
    
  },
  viewStars: {},
});
