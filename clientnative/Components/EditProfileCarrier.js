import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
//iconos
import Icon from "react-native-vector-icons/Ionicons";
import EditFormCarrier from './EditFormCarrier';

import { useNavigation } from "@react-navigation/core";

const EditProfileCarrier = () => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconBar}>
          <TouchableOpacity
          //no esta conectado a ningun lugar
          // onPress={() => navigation.navigate()}
          >
            <Icon name="chevron-back-outline" size={30} />
          </TouchableOpacity>
        </View>
        <Text style={{ fontWeight: 'bold', marginLeft: 15, fontSize: 25}}> Perfil</Text>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("./ruta.png")}
            style={{
              width: 170,
              height: 170,
              borderRadius: 100,
              marginTop: 30,
            }}
          />

          <View style={styles.add}>
            <TouchableWithoutFeedback onPress={() => Alert.alert("Buenop, acá haria lo de la img")}>
              {/* <Icon name="add-circle-outline" size={40} style={{ marginLeft: 80, marginTop: -35}}/> */}
              <Image
                source={require("./add-photo.png")}
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 135,
                  marginTop: -70,
                  borderWidth: 3,
                  borderColor: "#FFD523",
                  borderRadius: 50,
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
               
        <View style={styles.containerComp}>
          <EditFormCarrier />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerComp: {
    marginTop: 50,
    backgroundColor: "white",
  },
  iconBar: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 2,
    marginHorizontal: 10,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: "contain",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  add: {},
});

export default EditProfileCarrier;
