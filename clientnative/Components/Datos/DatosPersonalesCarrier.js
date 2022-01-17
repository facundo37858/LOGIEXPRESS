import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

const DatosPersonalesCarrier = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.perfilTex}>Perfil</Text>
        <View style={{flexDirection: 'row', alignContent: 'flex-start'}}>
        
          <View style={{ marginTop: 25 }}>
            <Image
              style={styles.userImg}
              source={require("./default-user.jpg")}
            />
          </View>
          <Text style={styles.userName}>Eliana Alvarez</Text>
          <Text>Villa Angela</Text>
  
         
        </View>

       
      </ScrollView>
    </View>
  );
};

export default DatosPersonalesCarrier;

const styles = StyleSheet.create({
  perfilTex: {
    fontSize: 19,
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
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 7,
    marginBottom: 20,
  },
});
