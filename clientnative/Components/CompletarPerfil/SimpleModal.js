import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

const WIDTH = Dimensions.get("window").width;
const HEIGTH_MODAL = 150;

const SimpleModal = (props) => {
 const navigation = useNavigation();

    closeModal = (bool, data) => {
       props.changeModalVisible(bool);
       props.setData(data)
    }

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textView}>
            <Text>¡Tu perfil fue completado exitosamente!</Text>
        </View>
        <View>
            <TouchableOpacity
            onPress={()=> closeModal(false, 'Aceptar')}
            onPress={() => navigation.navigate("singIn")}
            >
                <Text>Aceptar</Text>
            </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SimpleModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    height: HEIGTH_MODAL,
    width: WIDTH - 80,
    paddingTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
