import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CompleteProfileUser = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontWeight: "bold",
            marginLeft: 15,
            marginTop: 50,
            fontSize: 23,
          }}
        >
          Perfil
        </Text>
        {/* Foto e iconito de agregar imagen */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../conductor.png")}
            style={{
              width: 190,
              height: 190,
              borderRadius: 100,
              borderWidth: 5,
              borderColor: "#7952B3",
              marginTop: 40,
            }}
          />

          <View style={styles.add}>
            <TouchableWithoutFeedback
              onPress={() => Alert.alert("Buenop, acá haria lo de la img")}
            >
              <Image
                source={require("../add-image.png")}
                style={{
                  width: 60,
                  height: 60,
                  marginLeft: 220,
                  marginTop: -80,
                  borderWidth: 4,
                  borderColor: "#D5D5D5",
                  borderRadius: 50,
                }}
              />
            </TouchableWithoutFeedback>

            {/* Inicio de inputs formulario */}
            <View style={styles.containerInputs}>
              <Text
                style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}
              >
                Datos personales
              </Text>
              <View style={styles.viewsInputs}>
                <Icon name="person-circle-outline" size={26} />
                <TextInput
                  placeholder="Nombre"
                  name="name"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="person-circle-outline" size={26} />
                <TextInput
                  placeholder="Apellido"
                  name="lastname"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="mail-outline" size={26} />
                <TextInput
                  placeholder="sprint1.jebusayudanos@gmail.com"
                  name="email"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="reader-outline" size={26} />
                <TextInput
                  placeholder="Documento de identidad"
                  name="documentID"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="phone-portrait-outline" size={26} />
                <TextInput
                  placeholder="Celular válido"
                  name="phone"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="map-outline" size={26} />
                <TextInput
                  placeholder="Lugar de residencia actual"
                  name="location"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="card-outline" size={26} />
                <TextInput
                  placeholder="Medio de pago válido"
                  name="CBU"
                  style={styles.textPlaceholder}
                />
              </View>
              {/* Inicio de los input de completar vehiculo */}

              <View style={{ marginTop: 30 }}>
                <Text
                  style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}
                >
                  Datos del vehiculo
                </Text>
                <View style={styles.viewsInputs}>
                  <Icon name="newspaper-outline" size={26} />
                  <TextInput
                    placeholder="Licencia actualizada"
                    name="license"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="car-outline" size={26} />
                  <TextInput
                    placeholder="Scania, Mercedes-Benz, etc."
                    name="brand"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="document-outline" size={26} />
                  <TextInput
                    placeholder="Patente del vehiculo"
                    name="patent"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="car-sport-outline" size={26} />
                  <TextInput
                    placeholder="Modelo, año de salida al mercado"
                    name="model"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="color-palette-outline" size={26} />
                  <TextInput
                    placeholder="Rojo, gris, negro, óxido"
                    name="color"
                    style={styles.textPlaceholder}
                  />
                </View>
                <View style={styles.viewsInputs}>
                  <Icon name="construct-outline" size={26} />
                  <TextInput
                    placeholder="Capacidad de carga vehiculo"
                    name="capacity"
                    style={styles.textPlaceholder}
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.btnEditar}>
                <Text style={styles.textBtn}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CompleteProfileUser;

const styles = StyleSheet.create({
  containerInputs: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 50,
  },
  textPlaceholder: {
    marginLeft: 20,
    fontSize: 17,
    marginBottom: 2,
  },
  btnEditar: {
    backgroundColor: "#7952B3",
    borderRadius: 10,
    width: 150,
    height: 50,
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
  textBtn: {
    color: "white",
    fontSize: 17,
    alignSelf: "center",
    marginTop: 12,
  },
  viewsInputs: {
    borderColor: "#D5D5D5",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 360,
    alignItems: "flex-start",
    marginBottom: 15,
  },
});
