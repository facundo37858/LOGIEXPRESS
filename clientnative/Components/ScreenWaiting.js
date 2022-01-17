import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderBar from './Utils/HeaderBar'
import { useNavigation } from "@react-navigation/core";
import { getTravelID } from '../actions/index'
import { useSelector, useDispatch } from "react-redux";




const ScreenWaiting = (payload) => {

    const dispatch = useDispatch();
    const data = payload.route.params;
    const navigation = useNavigation();
    const travel = useSelector((store) => store.travel)
    console.log("Esto es data", data)



    useEffect(() => {
        dispatch(getTravelID(data))
    }, [])



    /* console.log("Esto es lo que llegan en ScreenWaiting", travel[0].id)*/
    console.log("Esto es lo que llega de un viaje", travel[0].id) 
    const orig = travel[0]?.orig.split("/")
    const dest = travel[0]?.destination.split("/")    

    function renderComponent() {
        return (
            <View style={{
                marginTop: 24,
                marginHorizontal: 12,
                alignItems: 'center',
                borderRadius: 12,
                backgroundColor: '#FFC107'
            }}>
                <Text>ID del Viaje:{travel[0]?.id}</Text>
                <Text>Descripcion: {travel[0]?.description}</Text>
                <Text>Origen:{orig[2]} </Text>
                <Text>Destino: {dest[2]}</Text>
                <Text>Precio: ${travel[0]?.price}</Text>
                <Text>Peso: {travel[0]?.weigth} toneladas</Text>
                <Text>Solicitud creada: </Text>
            </View>
        )
    }




    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#fff"
            }}
        >
            <HeaderBar />
            <ScrollView>
                <View style={{ flex: 1, paddingBottom: 24, }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: "bold", fontSize: 25 }}>VIAJE SOLICITADO</Text>
                    </View>
                    {renderComponent()}
                    <View style={styles.btn2}>
                        <TouchableOpacity style={styles.btnEditar}
                            onPress={() => navigation.navigate('StartUser', travel[0])}
                        >
                            <Text style={styles.textBtn}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ScreenWaiting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
})
