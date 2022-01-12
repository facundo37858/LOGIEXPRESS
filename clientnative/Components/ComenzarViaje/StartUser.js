import React, { useState, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  YellowBox,
} from "react-native";

const StartUser = ({ navigation }) => {

    return (
        //Container Start
        <ScrollView
          style={{ backgroundColor: "#f3f3f3" }}
          showsVerticalScrollIndicator={false}
        >
          {/* Brand View */}
          <View style={{backgroundColor:"#7952B3",marginTop:20,height:60}}>
          <Text style={{ color:'white',display:'flex',alignSelf:'center', fontSize:30, fontWeight:'bold', marginTop:15}}>Comenzar Viaje</Text>
          </View>
          <ImageBackground
            source={require("./camion2.gif")}
            style={{
              height: '60%',
              width:'90%',
              display:'flex',
              alignSelf:'center',
              marginLeft:40,
              marginTop:10,
            }}
          >
              </ImageBackground>
              <View>
                  
                      <Text style={{marginLeft:20,marginTop:-80,marginBottom:10, fontSize:20, fontWeight:'200'}}>Información sobre el Conductor</Text>
                      {/* NOMBRE */}
                      <View style={{height:35,backgroundColor:'white',flexDirection:'row', justifyContent:'space-between', paddingLeft:20, paddingRight:20, alignItems:'center'}}>
                  <Text style={{fontSize: 18, fontWeight:'500', }}>Nombre: </Text>
                    <Text style={{fontSize: 17, fontWeight:'300'}}>Gonzalo Lucero</Text>
                  </View>
                  {/* TELEFONO */}
                  <View style={{height:35,marginTop:3,backgroundColor:'white',flexDirection:'row', justifyContent:'space-between', paddingLeft:20, paddingRight:20,alignItems:'center'}}>
                  <Text style={{fontSize: 18, fontWeight:'500'}}>Teléfono: </Text>
                    <Text style={{fontSize: 17, fontWeight:'300'}}>1534490811</Text>
                  </View>
              <View >
                  <View>
                  <Text style={{marginLeft:20,marginTop:10,marginBottom:10, fontSize:20, fontWeight:'200'}}>Detalle del Envío</Text>
                  </View>
                  {/* ORIGEN */}
                  <View style={{height:35,backgroundColor:'white',flexDirection:'row', justifyContent:'space-between', paddingLeft:20, paddingRight:20,alignItems:'center'}}>
                  <Text style={{fontSize: 18, fontWeight:'500'}}>Desde: </Text>
                    <Text style={{fontSize: 17, fontWeight:'300'}}>Buenos Aires</Text>
                  </View>
                  {/* DESTINO */}
              <View style={{height:35,marginTop:3,backgroundColor:'white',flexDirection:'row', justifyContent:'space-between', paddingLeft:20, paddingRight:20,alignItems:'center'}}>
                  <Text style={{fontSize: 18, fontWeight:'500'}}>Hasta: </Text>
                    <Text style={{fontSize: 17, fontWeight:'300'}}>Rosario</Text>
                  </View>
                  {/* PESO */}
              <View style={{height:35,marginTop:3,backgroundColor:'white',flexDirection:'row', justifyContent:'space-between', paddingLeft:20, paddingRight:20,alignItems:'center'}}>
                  <Text style={{fontSize: 18, fontWeight:'500'}}>Peso de la Carga: </Text>
                    <Text style={{fontSize: 17, fontWeight:'300'}}>200 kg</Text>
                  </View>
              </View>
                       
              </View>
              <View  >
              <View style={{height:40,marginTop:15,flexDirection:'row', justifyContent:'space-between', paddingLeft:20, paddingRight:20,backgroundColor:'white'}}>
                  <Text style={{fontSize: 22, fontWeight:'700', alignSelf:'center'}}>Total a Pagar: </Text>
                    <Text style={{fontSize: 21, fontWeight:'300',alignSelf:'center'}}>$ 12.000.26</Text>
                  </View>   

                  <View style={{display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
                  <TouchableOpacity style={{ display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop:20, height:'120%',width:'40%',backgroundColor:'orange', borderRadius:10 }}>
                  
                  <Text style={styles.aceptar}>Aceptar</Text>
              
                  </TouchableOpacity>
                  <TouchableOpacity style={{ display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop:20, height:'120%',width:'40%',backgroundColor:'orange', borderRadius:10 }}>
                  
                  <Text style={styles.rechazar}>Rechazar</Text>
              
                  </TouchableOpacity>

                  </View>
            
              </View>
              </ScrollView>
)}

export default StartUser;

const styles = StyleSheet.create({
    botones:{
        backgroundColor:'black',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    aceptar:{
        alignSelf:'center',
        color:'white',
        fontSize:22,
        fontWeight:'700'
    },
    rechazar:{
        alignSelf:'center',
        color:'white',
        fontSize:22,
        fontWeight:'700'
    }
  });