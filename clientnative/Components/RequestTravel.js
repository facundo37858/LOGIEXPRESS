import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Modal
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
import { LogBox } from 'react-native';
import SimpleModal20 from "./AlertasTravel/SimpleModalorigin";
import SimpleModal21 from "./AlertasTravel/SimpleModaldest";
import SimpleModal22 from "./AlertasTravel/SimpleModalweight";
import SimpleModal23 from "./AlertasTravel/SimpleModalprice";






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




const RequestTravel = (props) => {


    const socket = useSelector((store) => store.socket)


    ////--> HOOK PARA LA NAVEGACION <-- ////
    const navigation = useNavigation();
    const dispatch = useDispatch();
    /* const response = useSelector((store) => store.responseTravel) */
    const data = props.route.params

    console.log("esto me llega ", data)


    //Estados para las validaciones:

    // validacion Origen

    const [isModalVisible20, setisModalVisible20] = useState(false);
    const [chooseData20, setchooseData20] = useState();

    const changeModalVisible20 = (bool) => {
        setisModalVisible20(bool);
    };

    const setData20 = (data) => {
        setchooseData20(data);
    };

    // validacion modelo

    const [isModalVisible21, setisModalVisible21] = useState(false);
    const [chooseData21, setchooseData21] = useState();

    const changeModalVisible21 = (bool) => {
        setisModalVisible21(bool);
    };

    const setData21 = (data) => {
        setchooseData21(data);
    };
    // validacion color

    const [isModalVisible22, setisModalVisible22] = useState(false);
    const [chooseData22, setchooseData22] = useState();

    const changeModalVisible22 = (bool) => {
        setisModalVisible22(bool);
    };

    const setData22 = (data) => {
        setchooseData22(data);
    };

    // validacion capacidad

    const [isModalVisible23, setisModalVisible23] = useState(false);
    const [chooseData23, setchooseData23] = useState();

    const changeModalVisible23 = (bool) => {
        setisModalVisible23(bool);
    };

    const setData23 = (data) => {
        setchooseData23(data);
    };

    const sendMessage = (props) => {

        socket.emit('message', props, (resp) => {
            console.log(resp.status); // ok
            setResponse(resp.status);
        });
    }


    let [response, setResponse] = useState(null);

    console.log('ESTA ES LA RESPUESTAAAAAAA', response)
    /// --> ESTO ES PARA ELIMINAR EL WARNING QUE SALE EN LA PANTALLA <-- ///
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            /* console.log(location.coords); */
        })();
        if (response) {
            if(response[0] === 'Ya tiene un viaje en proceso') {
                alert('YA TIENE UN VIAJE EN PROCESO')
                navigation.navigate('ScreenWaiting', response[1])
            }
        }
    }, [response]);
/* 
    console.log("ESTO ES LA RESPUESTA DEL PEDIDO", response)
 */

    const [origen, setOrigen] = useState({
        latitude: 0,
        longitude: 0,
        name: null,
    })

    const [destino, setDestino] = useState({
        latitude: 0,
        longitude: 0,
        name: null,
    })

    const [weight, setWeight] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState({
        price: 0,
    })



    const handleQuote = () => {
        // en un objeto pongo lo que tengo en el estado inicial
        let distance = getDistanciaMetros(origen, destino)
        setPrice({
            price: Math.round(10 * (weight * distance))
        })
    };

    const handleSubmit = () => {
        const travel = {
            orig: `${origen.latitude}/${origen.longitude}/${origen.name}`,
            destination: `${destino.latitude}/${destino.longitude}/${destino.name}`,
            weight: parseFloat(weight),
            price: price.price,
            description: description,
            id: data,
        };


        //VALIDACIONES
        /* 
                if (travel.orig === `0/0/null`) {
                    changeModalVisible20(true)
                    return
                }
        
                if (travel.destination === `0/0/null`) {
                    changeModalVisible21(true)
                    return
                }
        
                if (!travel.weight) {
                    changeModalVisible22(true)
                    return
                }
                if (travel.price === 0) {
                    changeModalVisible23(true)
                    return
                }
         */
        sendMessage(travel)
        
        console.log("Estoy enviando:", travel)
    }

    if (origen.latitude > 0 && destino.latitude > 0) {
        let distance = getDistanciaMetros(origen, destino)
        let price = Math.round(10 * (weight * distance))
        return price
    }
    //// --> Inicio de componente <-- ////
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <View style={{ alignItems: "center", marginTop: "20%", marginLeft: 10, marginRight: 10 }}>
                    <View style={styles.title}>
                        <Text style={{ fontWeight: "bold", fontSize: 40, marginBottom: 10, }}>
                            Solicitar Carga
                        </Text>
                        <Image
                            source={require('./Utils/carga.gif')}
                            style={styles.gif}
                        />
                    </View>
                    <View style={styles.form}>
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
                                    placeholder='Buscar'
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
                                    placeholder="Carga en toneladas"
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
                                >${price.price}</Text>
                            </View>
                            <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 0, textAlign: "center" }}>
                                Descripción
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
                                    {/* validaciones */}
                                    <Modal
                                        transparent={true}
                                        animationType="fade"
                                        visible={isModalVisible20}
                                        nRequestClose={() => changeModalVisible20(false)}
                                    >
                                        <SimpleModal20
                                            changeModalVisible20={changeModalVisible20}
                                            setData20={setData20}
                                        />
                                    </Modal>
                                    <Modal
                                        transparent={true}
                                        animationType="fade"
                                        visible={isModalVisible21}
                                        nRequestClose={() => changeModalVisible21(false)}
                                    >
                                        <SimpleModal21
                                            changeModalVisible21={changeModalVisible21}
                                            setData21={setData21}
                                        />
                                    </Modal>
                                    <Modal
                                        transparent={true}
                                        animationType="fade"
                                        visible={isModalVisible22}
                                        nRequestClose={() => changeModalVisible22(false)}
                                    >
                                        <SimpleModal22
                                            changeModalVisible22={changeModalVisible22}
                                            setData22={setData22}
                                        />
                                    </Modal>
                                    <Modal
                                        transparent={true}
                                        animationType="fade"
                                        visible={isModalVisible23}
                                        nRequestClose={() => changeModalVisible23(false)}
                                    >
                                        <SimpleModal23
                                            changeModalVisible23={changeModalVisible23}
                                            setData23={setData23}
                                        />
                                    </Modal>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({

    title: {
        marginTop: 2,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 8,
    },
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
    form: {
        borderColor: '#000',
        width: 400,
        borderWidth: 2,
        padding: 10,
    },
    viewsInputs: {
        marginTop: 2,
        borderColor: "#000",
        borderWidth: 1,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        width: 380,
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
    gif: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    btn2: { flexDirection: "row", marginLeft: 30 }
});

export default RequestTravel;
