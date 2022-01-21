import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { logiarUsuario } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import StarRating from "../StarRating";

const DatosPersonalesCarrier = () => {
  const data = useSelector((store) => store.responseLog);
  const navigation = useNavigation();
  const rating = 4
    v
  useEffect(() => {
    //console.log("data", data)
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.perfilTex}>Perfil</Text>
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
            <Text style={{ fontSize: 15 }}>{data.eMail}</Text>
            <Text style={{ fontSize: 15 }}>{data.location}</Text>
            <View style={{ marginTop: 2}}>
              <StarRating
                ratings={rating}
                reviews={rating}
                size={23}
              ></StarRating>
            </View>
          </View>
        </View>
        <View style={styles.botones}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('EditProfileCarrier')}>
            <Text style={styles.textBtn}>Editar perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CambiarContraseña')}>
            <Text style={styles.textBtn}>Cambiar contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn}>
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
    fontSize: 21,
    fontWeight: "bold",
    alignItems: "flex-start",
    marginTop: 40,
    marginLeft: 20,
  },
  userImg: {
    marginTop: 10,
    height: 110,
    width: 110,
    borderRadius: 55,
    borderWidth: 5,
    borderColor: "#7952B3",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 1,
  },
  boxDatos: {
    flexDirection: "column",
    marginTop: 40,
    marginLeft: 15,
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
    borderColor: "#7952B3",
    width: 250,
    height: 50,
    marginBottom: 20,
    borderRadius: 15,
  },
  textBtn: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
});
