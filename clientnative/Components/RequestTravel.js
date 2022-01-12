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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
//Hook para la navegacion
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native";
import { Input } from "react-native-elements"



// funcion para calcular la distancia en km
function getDistanciaMetros(origen, destino) {
    var lat1 = origen.latitude;
    var lon1 = origen.longitude;
    var lat2 = destino.latitude;
    var lon2 = destino.longitude;
    rad = function (x) { return x * Math.PI / 180; }
    var R = 6378.137; //Radio de la tierra en km 
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) *
        Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    //aquí obtienes la distancia en metros por la conversion 1Km =1000m
    var d = R * c * 1000;
    return d / 1000;
}


const RequestTravel = () => {
    ////--> HOOK PARA LA NAVEGACION <-- ////
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location.coords);
            setPin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
        })();
    }, []);

    const [origen, setOrigen] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })

    const [destino, setDestino] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })



    //// --> Inicio de componente <-- ////
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ alignItems: "center", marginTop: "30%"}}>
            <Text style={{ fontWeight: "bold", fontSize: 40 }}>
                Solicitar Carga
            </Text>
            <View>
                <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 20 }}>
                    Origen
                </Text>
                <GooglePlacesAutocomplete
                    placeholder='Buscar'
                    fetchDetails={true}
                    GooglePlacesSearchQuery={{
                        rankby: "distance"
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(details.geometry.location.lat, details.geometry.location.lng);
                        setOrigen({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        })

                    }}

                    query={{
                        key: 'AIzaSyCctmpoWkqc4Te99YNkI0hgsyVfpbEci5M',
                        language: 'en',
                        components: "country:arg",
                        types: "geocode",
                        radius: 30000,
                        location: `${origen.latitude}, ${origen.longitude}`
                    }}
                    textInputProps={{
                        InputComp: Input,
                        leftIcon: { type: 'font-awesome', name: 'chevron-right' },
                        errorStyle: { color: 'red' },
                      }}
                    style={{
                        container: {
                          flex: 1,
                        },
                        textInputContainer: {
                          flexDirection: 'row',
                        },
                        textInput: {
                          backgroundColor: '#FFFFFF',
                          height: 44,
                          borderRadius: 5,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          fontSize: 15,
                          flex: 1,
                        }
                    }}
                    />
            </View>

            <View>
                <Text style={{ fontWeight: "bold", marginLeft: 15, fontSize: 25 }}>
                    Destino
                </Text>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    fetchDetails={true}
                    GooglePlacesSearchQuery={{
                        rankby: "distance"
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(details.geometry.location.lat, details.geometry.location.lng);
                        setDestino({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        })
                    }}
                    query={{
                        key: 'AIzaSyCctmpoWkqc4Te99YNkI0hgsyVfpbEci5M',
                        language: 'en',
                        components: "country:arg",
                        types: "geocode",
                        radius: 30000,
                        location: `${origen.latitude}, ${origen.longitude}`
                    }}
                    textInputProps={{
                        InputComp: Input,
                        leftIcon: { type: 'font-awesome', name: 'chevron-right' },
                        errorStyle: { color: 'red' },
                      }}
                />
                <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}>
                    Origen {`${origen.latitude}, ${origen.longitude}`}

                </Text>
                <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}>
                    Destino {`${destino.latitude}, ${destino.longitude}`}
                </Text>
                <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}>
                    Kilometros = {getDistanciaMetros(origen, destino)}
                </Text>
            </View>
        </View>
        </SafeAreaView>
      
    );
};

const styles = StyleSheet.create({
    iconBar: {
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 10,
        justifyContent: "space-between",
        backgroundColor: "white",
    },

    containerInputs: {
        flex: 1,
        textAlign: "center",

    },

    imgPerfil: {
        width: 170,
        height: 170,
        borderRadius: 100,
        borderColor: "#FFC107",
        borderWidth: 5,
        marginTop: 40,
    },
    imgAdd: {
        width: 50,
        height: 50,
        marginLeft: 135,
        marginTop: -70,
        borderWidth: 3,
        borderColor: "#511281",
        borderRadius: 50,
    },
    viewsInputs: {
        margin: 2,
        borderColor: "#511281",
        borderBottomWidth: 3,
        flexDirection: "row",
        justifyContent: "flex-start",
        width: 360,
        alignItems: "flex-start",
        marginBottom: 15,
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
        marginRight: 30,
    },

    textBtn: {
        color: "white",
        fontSize: 17,
        alignSelf: "center",
        marginTop: 12,
    },

    btn2: { flexDirection: "row", marginLeft: 20 },
});

export default RequestTravel;
