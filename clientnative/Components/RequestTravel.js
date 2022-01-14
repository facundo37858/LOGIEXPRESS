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
import { useSelector, useDispatch } from "react-redux";
import { cotizarViaje, requestTravel } from "../actions/index.js"


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
    const dispatch = useDispatch();


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location.coords);
        })();
    }, [price]);

    const price = useSelector((state) => state.price)

    const [origen, setOrigen] = useState({
        latitude: 0,
        longitude: 0,
        name:null,
    })

    const [destino, setDestino] = useState({
        latitude: 0,
        longitude: 0,
        name:null,
    })

    const [weight, setWeight] = useState("");
    const [description, setDescription ] = useState("");
    
    

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

    const handleSubmit = () => {
        const travel = {
            orig: `${origen.latitude}/${origen.longitude}/${origen.name}`,
            destination: `${destino.latitude}/${destino.longitude}/${destino.name}`,
            weight: parseFloat(weight),
            price: price,
            description: description,
            id: "973ee39e-40ad-4b8f-aa71-70ea7d99ac33",
        };
        dispatch(requestTravel(travel))
        console.log("Estoy enviando:", travel)
    }

    //// --> Inicio de componente <-- ////
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <View style={{ alignItems: "center", marginTop: "20%", marginLeft: 10, marginRight: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 40, marginBottom: 30 }}>
                        Solicitar Carga
                    </Text>
                    <View style={styles.containerInputs} >
                        <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 0, textAlign: "center" }}>
                            Origen
                        </Text>
                        <ScrollView keyboardShouldPersistTaps={'handled'} style={{ flex: 1 }}>
                            <GooglePlacesAutocomplete
                                placeholder='Buscar'
                                fetchDetails={true}
                                GooglePlacesSearchQuery={{
                                    rankby: "distance"
                                }}
                                onPress={(data, details = null) => {
                                    // 'details' is provided when fetchDetails = true
                                    console.log(details.formatted_address);
                                    setOrigen({
                                        latitude: details.geometry.location.lat,
                                        longitude: details.geometry.location.lng,
                                        name: details.formatted_address,
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
                        </ScrollView>
                        <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 0, textAlign: "center" }}>
                            Destino
                        </Text>
                        <ScrollView keyboardShouldPersistTaps={'handled'} style={{ flex: 1 }}>
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
                                        name: details.formatted_address,
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
                        </ScrollView>
                        <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 0, textAlign: "center" }}>
                            Peso
                        </Text>
                        <View style={styles.viewsInputs}>
                            <Icon name="push-outline" size={26} />
                            <TextInput
                                placeholder="Ingrese peso de la cargas..."
                                name="weight"
                                style={styles.textPlaceholder}
                                onChangeText={(text) => setWeight(text)}
                            />
                        </View>
                        <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 0, textAlign: "center" }}>
                            Precio
                        </Text>
                        <View style={styles.viewsInputs}>
                            <Icon name="cash-outline" size={26} />
                            <Text
                                style={styles.textPlaceholder}
                            >${price}</Text>
                        </View>
                        <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 0, textAlign: "center" }}>
                            Descripcion
                        </Text>
                        <View style={styles.viewsInputs}>
                            <Icon name="reader-outline" size={26} />
                            <TextInput
                                style={styles.textPlaceholder}
                                multiline={true}
                                numberOfLines={3}
                                onChangeText={(text) => setDescription(text)}
                            />
                        </View>
                        <View style={styles.btn2}>
                            <TouchableOpacity style={styles.btnEditar} onPress={handleQuote}>
                                <Text style={styles.textBtn}>Cotizar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnEditar} onPress={handleSubmit}>
                                <Text style={styles.textBtn}>Solicitar</Text>
                            </TouchableOpacity>
                        </View>
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
            </ScrollView>
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
        borderColor: "#000",
        borderWidth: 1,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        width: 400,
        alignItems: "flex-start",
        marginBottom: 15,
        padding: 8,
    },
    textPlaceholder: {
        marginLeft: 20,
        fontSize: 17,
        marginBottom: 2,
    },
    btnEditar: {
        backgroundColor: "#FFC107",
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

    btn2: { flexDirection: "row", marginLeft: 30 }
});

export default RequestTravel;
