import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
//iconos
import Icon from "react-native-vector-icons/Ionicons";
import EditFormUser from "./EditFormUser";
import { useNavigation } from "@react-navigation/core";

const EditProfile = () => {
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

        <View style={{ alignItems: "center" }}>
          <Image
            source={require("./ruta.png")}
            style={{
              width: 170,
              height: 170,
              borderRadius: 100,
              marginTop: 45,
            }}
          />
        </View>

        <View style={styles.containerComp}>
          <EditFormUser />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerComp: {
    marginTop: 75,
    backgroundColor: "white",
  },
  iconBar: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
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
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditProfile;
