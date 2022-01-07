import React from "react";
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
//iconos
import Icon from "react-native-vector-icons/Ionicons";
//Formik
import { Formik } from "formik";

const EditFormUser = () => {
  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", locacion: "", phone: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <View>
              <Text style={styles.textInputs}>Nombre completo</Text>
              <View style={styles.viewsInputs} >
                <Icon name="person-outline" size={25} />
                <TextInput
                  placeholder="Nombre completo"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  style={styles.textPlaceholder}
                />
              </View>
            </View>
            <View>
              <Text style={styles.textInputs}>Email</Text>
              <View style={styles.viewsInputs}>
                <Icon name="mail-outline" size={25} />
                <TextInput
                  placeholder="grupo@gmail.com"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={styles.textPlaceholder}
                />
              </View>
            </View>
            <View >
              <Text style={styles.textInputs}>Locacion</Text>
              <View style={styles.viewsInputs} >
                <Icon name="earth-outline" size={25} />
                <TextInput
                  placeholder="Ciudad donde vives"
                  onChangeText={handleChange("locacion")}
                  onBlur={handleBlur("locacion")}
                  value={values.locacion}
                  style={styles.textPlaceholder}
                />
              </View>
            </View>
            <View>
              <Text style={styles.textInputs}>Celular</Text>
              <View style={styles.viewsInputs} >
                <Icon name="phone-portrait-outline" size={25} />
                <TextInput
                  placeholder="Número de celular"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  style={styles.textPlaceholder}
                />
              </View>
            </View>
            <TouchableOpacity
            onPress={handleSubmit}
            style={styles.btnEditar}
            >
              <Text style={styles.textBtn}>Editar perfil</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </>
  );
};
export default EditFormUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  viewsInputs: {
      margin: 5,
      borderColor: '#511281',
      borderBottomWidth: 4,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: 300,
      alignItems: "flex-start",
      marginBottom: 20
  },
  textInputs: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  textPlaceholder: {
    marginLeft: 15,
    fontSize: 15,
    marginBottom: 3
  },
  btnEditar:{
    backgroundColor: '#511281',
    borderRadius: 10,
    width: 150,
    height: 50,
    marginTop: 30

  },
  textBtn:{
    color: '#EAEAEA',
    fontSize: 16,
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    marginTop: 12
  }
});
