import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
//iconos
import Icon from "react-native-vector-icons/Ionicons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
//Hook para la navegacion
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native";
import { Input } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { cotizarViaje, requestTravel } from "../actions/index.js";
import { LogBox } from "react-native";
import HeaderBar from "./Utils/HeaderBar";
import { APIKEY_GOOGLE } from "@env"




const CotizarViaje = () => {
  ////--> HOOK PARA LA NAVEGACION <-- ////
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const price = useSelector((state) => state.price);

  /// --> ESTO ES PARA ELIMINAR EL WARNING QUE SALE EN LA PANTALLA <-- ///
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, [price]);

  /// --> ESTADO PARA LOS INPUTS <-- ///
  const [origen, setOrigen] = useState({
    latitude: 0,
    longitude: 0,
    name: null,
  });

  const [destino, setDestino] = useState({
    latitude: 0,
    longitude: 0,
    name: null,
  });

  const [weight, setWeight] = useState("");

  const handleQuote = () => {
    // en un objeto pongo lo que tengo en el estado inicial
    const quote = {
      origen: `${origen.latitude}/${origen.longitude}`,
      destino: `${destino.latitude}/${destino.longitude}`,
      weight: parseFloat(weight),
    };
    dispatch(cotizarViaje(quote));
    console.log("Estoy enviado", quote);
  };

  //// --> Inicio de componente <-- ////
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderBar  screen={'null'}/>
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <View style={styles.container}>
          <Text style={styles.textCotiza}>¡Cotiza tu viaje!</Text>
          <View style={styles.containerInputs}>
            <Text style={styles.textsOriDes}>Origen</Text>
            <ScrollView
              keyboardShouldPersistTaps={"handled"}
              style={{ flex: 1 }}
            >
              <GooglePlacesAutocomplete
                placeholder="Lugar de origen del envío"
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                  rankby: "distance",
                }}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(details.formatted_address);
                  setOrigen({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    name: details.formatted_address,
                  });
                }}
                query={{
                  key: `${APIKEY_GOOGLE}`,
                  language: "en",
                  components: "country:arg",
                  types: "geocode",
                  radius: 30000,
                  location: `${origen.latitude}, ${origen.longitude}`,
                }}
                // textInputProps={{
                //   InputComp: Input,
                //   leftIcon: { type: "font-awesome", name: "chevron-right", backgroundColor: 'white',  },
                //   errorStyle: { color: "red" },
                // }}
              />
            </ScrollView>
            <Text style={styles.textsOriDes}>Destino</Text>
            <ScrollView
              keyboardShouldPersistTaps={"handled"}
              style={{ flex: 1 }}
            >
              <GooglePlacesAutocomplete
                placeholder="Lugar de destino del envío"
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                  rankby: "distance",
                }}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(
                    details.geometry.location.lat,
                    details.geometry.location.lng
                  );
                  setDestino({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    name: details.formatted_address,
                  });
                }}
                query={{
                  key: `${APIKEY_GOOGLE}`,
                  language: "en",
                  components: "country:arg",
                  types: "geocode",
                  radius: 30000,
                  location: `${origen.latitude}, ${origen.longitude}`,
                }}
                // textInputProps={{
                //   InputComp: Input,
                //   leftIcon: { type: "font-awesome", name: "chevron-right" },
                //   errorStyle: { color: "red" },
                // }}
              />
            </ScrollView>

            {/* PESO */}
            <Text style={styles.textPeso}>Peso estimativo de la carga</Text>
            <View style={styles.viewsInputs}>
              <TextInput
                placeholder="Peso en Toneladas"
                name="weight"
                style={styles.textPlaceholder}
                onChangeText={(text) => setWeight(text)}
              />
            </View>
            {/* INPUT DE PRECIO */}
            <Text style={styles.textPrecio}>Precio</Text>
            <View style={styles.ViewPrecio}>
              <Image
                source={require("./Utils/dinero.png")}
                style={styles.imgDinero}
              />
              <Text style={{ fontSize: 21, marginLeft: 22, fontWeight: 'bold' }}>$ {price}</Text>
            </View>
            {/* BOTON */}
            <View style={{ marginTop: 80, marginLeft: 25 }}>
              <TouchableOpacity style={styles.btnEditar} onPress={handleQuote}>
                <Text style={styles.textBtn}>Cotizar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginLeft: 18,
    marginTop: 50,
  },
  textCotiza: {
    fontWeight: "bold",
    fontSize: 27,
    // marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  textsOriDes: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 20
  },

  containerInputs: {
    flex: 1,
    textAlign: "center",
  },
 
  textBtn: {
    color: "white",
    fontSize: 19,
    alignSelf: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  ViewPrecio: {
    flexDirection: "row",
    marginTop: 8,
    backgroundColor: "white",
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    alignContent: "center",
  },
  viewsInputs: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: 45,
    marginTop: 8,
    borderRadius: 10,
  },
  textPrecio: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  },
  imgDinero: {
    width: 45,
    height: 42,
    marginLeft: 10,
  },
  textPeso: {
    fontWeight: "bold",
    fontSize: 19,
    marginTop: 20,
  },
  textPlaceholder: {
    marginLeft: 10,
    marginTop: 6,
    fontSize: 15,
    alignSelf:'center'
  },
  btnEditar: {
    backgroundColor:"#FFC107",
    borderRadius: 10,
    width: 150,
    height: 50,
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
    marginRight: 30,
  },
});

export default CotizarViaje;
