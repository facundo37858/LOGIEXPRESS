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
import FormVehiculeCarrier from "./FormVehiculeCarrier";

import { useNavigation } from "@react-navigation/core";

const EditVehiculeCarrier = () => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconBar}>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfileCarrier")}
          >
            <Icon name="chevron-back-outline" size={30} />
          </TouchableOpacity>
        </View>
        <Text style={{ fontWeight: "bold", marginLeft: 15, fontSize: 25 }}>
          Agregar vehiculo
        </Text>

        <View style={styles.containerComp}>
          <FormVehiculeCarrier />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerComp: {
    marginTop: 50,
    backgroundColor: "white",
    alignContent: 'center',
    
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

export default EditVehiculeCarrier;
