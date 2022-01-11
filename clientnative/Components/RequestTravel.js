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



// funcion para calcular la distancia en km
function getDistanciaMetros(origen, destino) {
  var lat1 = origen.latitude;
  var lon1 = origen.longitude;
  var lat2 = destino.latitude;
  var lon2 = destino.longitude;
  rad = function(x) {return x*Math.PI/180;}
  var R = 6378.137; //Radio de la tierra en km 
  var dLat = rad( lat2 - lat1 );
  var dLong = rad( lon2 - lon1 );
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * 
  Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  //aquí obtienes la distancia en metros por la conversion 1Km =1000m
  var d = R * c * 1000; 
  return d/1000 ; 
}


const EditProfile = () => {
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
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.iconBar}>
                <TouchableOpacity
                    //no esta conectado a ningun lugar
                    onPress={() => navigation.navigate("ProfileUserScreen")}
                >
                    <Icon name="chevron-back-outline" size={30} />
                </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: "bold", marginLeft: 15, fontSize: 25 }}>
                Solicitar Carga
            </Text>
            <View>
                <Text style={{ fontWeight: "bold", marginLeft: 15, fontSize: 25 }}>
                    Origen
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
                    styles={{

                        textInputContainer: { backgroundColor: 'grey' },
                        container: { flex: 0, width: "80%" }
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
                    styles={{

                        textInputContainer: { backgroundColor: 'grey' },
                        container: { flex: 0, width: "80%" }
                    }}
                />
            </View>

            {/* INICIO DEL FORMULARIO */}
            <View style={styles.containerInputs}>
                <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}>
                    Origen {`${origen.latitude}, ${origen.longitude}`}

                </Text>
                <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}>
                    Destino {`${destino.latitude}, ${destino.longitude}`}
                </Text>
                <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}>
                    Kilometros = { getDistanciaMetros(origen,destino) }
                </Text>
                <View style={styles.viewsInputs}>
                    <Icon name="person-outline" size={26} />
                    <TextInput
                        placeholder="Nombre"
                        name="name"
                        style={styles.textPlaceholder}
                    />
                </View>
                <View style={styles.viewsInputs}>
                    <Icon name="person-outline" size={26} />
                    <TextInput
                        placeholder="Apellido"
                        name="lastname"
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
                <View style={styles.btn2}>
                    <TouchableOpacity
                        style={styles.btnEditar}
                        ///---> PONER A DONDE TIENE QUE VOLVER <--- ///
                        onPress={() => navigation.navigate("ProfileUserScreen")}
                    >
                        <Text style={styles.textBtn}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnEditar}>
                        <Text style={styles.textBtn}>Editar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        alignItems: "flex-start",
        marginTop: 40,
        marginLeft: 20,
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

export default EditProfile;
