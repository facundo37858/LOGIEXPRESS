import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HeaderBar from "./Utils/HeaderBar";
import { useNavigation } from "@react-navigation/core";
import { getTravelID, desmount } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";
import SimpleModal70 from "./AlertasTravel/SimpleModalcanceltrip";

const ScreenWaiting = (payload) => {



  const socket = useSelector((store) => store.socket)
  const dispatch = useDispatch();
  const id = {
    id: payload.route.params
  }

  const navigation = useNavigation();
  const travel = useSelector((store) => store.travel);
  console.log("Esto LLEGA POR PAYLOADDDDDDD", travel);

  useEffect(() => {
    dispatch(getTravelID(id));
    
  }, [dispatch]);

      // COMBINACION MAIL Y PASS MAL
      const [isModalVisible70, setisModalVisible70] = useState(false);
      const [chooseData70, setchooseData70] = useState();
      const [activar70, setActivar70] = useState(false);
    
      const changeModalVisible70 = (bool) => {
        setisModalVisible70(bool);
      };
    
      const setData70 = (data) => {
        setchooseData70(data);
      };

      const setActivacion70 = (boole) => {
        setActivar70(boole);
      };


/*   useEffect(() => {
    if(respDelete) {
      alert('Viaje elimando');
      navigation.navigate('ProfileUserScreen')
    }
    return () => {
      setRespDelete(null)
    };
  }, [respDelete]); */
  

  const [objCarrier, SetObjCarrrier] = useState(null)



  useEffect(() => {
    if (travel) {
      if (travel.carrier) {
        SetObjCarrrier(travel.carrier)
      }
    };
    return () => {
      SetObjCarrrier(null)
    };
  }, [travel]);
  


  console.log("ESTO ES OBJCARRIER", objCarrier)

  if(activar70 === true){
    const deleteTravel = () => {
      id
      socket.emit('delete', id, (response) => {
        console.log("ESTA SERIA LA RESPUESTA",response.status)
        setRespDelete(response) 
      });
    };
    console.log(id);
    deleteTravel();
  }

 

  const [response, setResponse] = useState(null)
  const [respDelete, setRespDelete] = useState(null)

  useEffect(() => {
    socket.on('response', (data) => {
      console.log(data);
      setResponse(data);
    });
    if(respDelete) {
      if(respDelete.status === 'Viaje eliminado exitosamente') {
        // alert('Viaje eliminado exitosamente')
        navigation.navigate('ProfileUserScreen')
      }
      console.log("ESTO ES LA RESPUESTA DE DELETE",respDelete.status);
    }
    return () => {
     setRespDelete(null)
    };
  }, [socket, respDelete]);

 
  
  
  /* 
    console.log("Esto es lo que llegan en ScreenWaiting", travel[0].id) */
  /* const orig = travel[0]?.orig.split("/")
    const dest = travel[0]?.destination.split("/") */

  function renderComponentTravel() {
    const orig = travel?.travel.orig.split("/");
    const dest = travel?.travel.destination.split("/");

    return (
      <View
        style={{
          marginTop: 24,
          marginHorizontal: 12,
          alignItems: "center",
          borderRadius: 12,
          backgroundColor: "#FFC107",
        }}
      >
        <Text>ID del Viaje:{travel.travel?.id.slice(24)}</Text>
        <Text>Descripcion: {travel.travel?.description}</Text>
        <Text>Origen:{orig[2]} </Text>
        <Text>Destino: {dest[2]}</Text>
        <Text>Precio: {travel.travel?.price}</Text>
        <Text>Peso: {travel.travel?.weight} toneladas</Text>
        <Text>Solicitud creada: {travel.travel?.createdAt} </Text>
      </View>
    );
  }

  function renderComponentCarrier() {

    return (
      <View
        style={{
          marginTop: 24,
          marginHorizontal: 12,
          alignItems: "center",
          borderRadius: 12,
          backgroundColor: "#FFC107",
        }}
      >
        <Text>TRANPOSRTISTA</Text>
        <View style={{ alignItems: "center", flexDirection: "column" }}>
          <Image source={{
            uri:
              objCarrier?.photo !== null
                ? objCarrier?.photo
                : "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg"
          }} style={styles.cardImage} />
        </View>
        <Text>Nombre:{objCarrier?.user_Reg.name}</Text>
        <Text>Apellido: {objCarrier?.user_Reg.lastName}</Text>
        <Text>ID: {objCarrier?.user_Reg.id.slice(24)} </Text>
      </View>
    );
  }



  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 30,
      }}
    >  
      <HeaderBar screen={'ProfileUserScreen'}/>
      <ScrollView>
        <View style={{ flex: 1, paddingBottom: 24 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              VIAJE SOLICITADO
            </Text>
          </View>
          <View>
            {travel !== null ? (
              renderComponentTravel()
            ) : (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
          </View>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              ESPERANDO ACEPTACION
            </Text>
          </View>
          <View style={(styles.container, styles.horizontal)}>
            {
              objCarrier !== null ? (renderComponentCarrier()) : (<ActivityIndicator size="large" color="#0000ff" />)
            }

          </View>
          <View style={styles.horizontal}>
            <View style={styles.btn2}>
              <TouchableOpacity
                style={styles.btnEditar}
                onPress={() => navigation.navigate("StartUser", travel)}
              >
                <Text style={styles.textBtn}>Aceptar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btn2}>
              <TouchableOpacity
                style={styles.btnEditar}
                onPress={()=> changeModalVisible70(true)}
              >
                <Text style={styles.textBtn}>Cancelar Viaje</Text>
              </TouchableOpacity>
              <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible70}
                  nRequestClose={() => changeModalVisible70(false)}
                >
                  <SimpleModal70
                    changeModalVisible70={changeModalVisible70}
                    setData70={setData70}
                    setActivacion70={setActivacion70}
                  />
                  
                  </Modal>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenWaiting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  btn2: { flexDirection: "row", marginLeft: 30 },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  cardImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
});
