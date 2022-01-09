import * as React from 'react';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function App() {

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

    const [pin, setPin] = useState({
        latitude: -24.8385129,
        longitude:  -65.4435753,
    })

    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })



    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: "distance"
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    setRegion({
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
                    types: "establishment",
                    radius: 30000,
                    location: `${region.latitude}, ${region.longitude}`
                }}
                styles={{
                    container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 }
                }}
            />
            <MapView style={styles.map}
                initialRegion={{
                    latitude: pin.latitude,
                    longitude: pin.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider="google"
            >
                {
                    <Marker coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                    pinColor='black' />
                }
                {
                    <Marker
                        coordinate={pin}
                        image={require('../Components/Utils/puntero.png')}
                        draggable={true}
                        onDragStart={(e) => {
                            console.log("Drag Star", e.nativeEvent.coordinate)
                        }}
                        onDragEnd={(e) => {
                            setPin({
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude
                            })
                        }}
                    >
                        <Callout>
                            <Text>Estoy Aqui!</Text>
                        </Callout>
                    </Marker>
                }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0, flex: 1
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});