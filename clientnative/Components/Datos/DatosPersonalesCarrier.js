import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import StarRating from "../StarRating";

const DatosPersonalesCarrier = () => {
  const rating = 2
  
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
              style={styles.userImg}
              source={require("./default-user.jpg")}
            />
          </View>
          <View style={styles.boxDatos}>
            <Text style={styles.userName}>Eliana Alvarez</Text>
            <Text style={{fontSize: 15}}>Macarenam328@gmail.com</Text>
            <Text style={{fontSize: 15}}>Villa Angela</Text>
          </View>
        </View>
        <StarRating ratings={rating} reviews={rating}  style={styles.starRating}/>
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
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#7952B3",
  },
  userName: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 4
  },
  boxDatos: { 
    flexDirection: "column",
    marginTop: 40,
    marginLeft: 15
   }
});
