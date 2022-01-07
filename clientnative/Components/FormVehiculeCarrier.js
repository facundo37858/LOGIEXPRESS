import React from "react";
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
//iconos
import Icon from "react-native-vector-icons/Ionicons";
//Formik
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/core";

const FormVehiculeCarrier = () => {
 // const navigation = useNavigation();

  return (  
    <>
      <Formik
        initialValues={{ marca: "", patente: "", modelo: "", color: "", dimensiones: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <View>
              <Text style={styles.textInputs}>Marca del vehiculo</Text>
              <View style={styles.viewsInputs} >
                <Icon name="speedometer-outline" size={25} />
                <TextInput
                  placeholder="Scania, Mercedez-Benz, etc."
                  onChangeText={handleChange("marca")}
                  onBlur={handleBlur("marca")}
                  value={values.marca}
                  style={styles.textPlaceholder}
                />
              </View>
            </View>
            <View>
              <Text style={styles.textInputs}>Número de patente</Text>
              <View style={styles.viewsInputs}>
                <Icon name="newspaper-outline" size={25} />
                <TextInput
                  placeholder="Número de patente del vehiculo"
                  onChangeText={handleChange("patente")}
                  onBlur={handleBlur("patente")}
                  value={values.patente}
                  style={styles.textPlaceholder}
                />
              </View>
            </View>
            <View >
              <Text style={styles.textInputs}>Modelo del vehiculo</Text>
              <View style={styles.viewsInputs} >
                <Icon name="car-sport-outline" size={25} />
                <TextInput
                  placeholder="Iluminame dios, no tengo ni idea"
                  onChangeText={handleChange("modelo")}
                  onBlur={handleBlur("modelo")}
                  value={values.modelo}
                  style={styles.textPlaceholder}
                />
              </View>
            </View>
            <View>
              <Text style={styles.textInputs}>Color del vehiculo</Text>
              <View style={styles.viewsInputs} >
                <Icon name= "color-palette-outline" size={25} />
                <TextInput
                  placeholder= "Gris, blanco, rojo, oxidado"
                  onChangeText={handleChange("color")}
                  onBlur={handleBlur("color")}
                  value={values.color}
                  style={styles.textPlaceholder}
                />
              </View>
            </View>
            <View>
              <Text style={styles.textInputs}>Dimensiones/Capacidad de carga</Text>
              <View style={styles.viewsInputs} >
                <Icon name="car-outline" size={25} />
                <TextInput
                  placeholder="¿Lugar disponible para transportar?"
                  onChangeText={handleChange("dimensiones")}
                  onBlur={handleBlur("dimensiones")}
                  value={values.dimensiones}
                  style={styles.textPlaceholder}
                />
              </View>
            </View>
            <TouchableOpacity
           // onPress={() => navigation.navigate('EditVehiculeCarrier')}
            style={styles.btnEditar}
            >
              <Text style={styles.textBtn}></Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </>
  );
};
export default FormVehiculeCarrier;

const styles = StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: "white",
    alignItems: "center",
     justifyContent: "center",
  },
  viewsInputs: {
      margin: 2,
      borderColor: '#FFD523',
      borderBottomWidth: 4,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: 300,
      alignItems: "flex-start",
      marginBottom: 17
  },
  textInputs: {
    fontSize: 18,
    fontWeight: 'bold',

  },
  textPlaceholder: {
    marginLeft: 15,
    fontSize: 15,
    marginBottom: 3
  },
  btnEditar:{
    backgroundColor: '#FFD523',
    borderRadius: 10,
    width: 150,
    height: 50,
    marginTop: 20

  },
  textBtn:{
    color: 'black',
    fontSize: 15,
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 35,
    marginTop: 12
  }
});

