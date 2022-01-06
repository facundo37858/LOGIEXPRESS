import React from "react";
import { Ionicons } from '@expo/vector-icons';
import {Text,ScrollView, ImageBackground, Dimensions, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';


const SingIn = ({navigation}) =>{

    function navigate(){
        navigation.navigate('singUp');
    }


    return (
        //Container Start
        <ScrollView 
        style={{flex: 1, backgroundColor: '#ffffffff'}} 
        showsVerticalScrollIndicator={false}>
            {/* Brand View */}
            <ImageBackground 
            source={require('./ruta.png')}
                style={{
                    height: Dimensions.get('window').height / 2.5,
                    }}>
                        <View style={styles.brandView}>
                            <Ionicons name='location-sharp' style={{color:'#ffbe0b', fontSize:100}}/>
                            <Text style={styles.brandViewText}>LOGIEXPRESS</Text>
                        </View>
                    </ImageBackground>
                    {/* Botton View */}
                    <View style={styles.bottonView}>
                        {/* Welcome View */}
                        <View style={{padding: 40, display:'flex', alignItems:'center'}}>
                            <Text style={{color:'#4632a1', fontSize:34}}>Bienvenido</Text>
                            
                                                                                   
                        </View>
                        {/* inputs */}
                        <View style={styles.FormView}>
                        <TextInput placeholder="Dirección de Mail*" style={styles.TextInput}></TextInput>                
                        <TextInput placeholder="Contraseña*" secureTextEntry={true} style={styles.TextInput}></TextInput>                    
                        <TouchableOpacity style={styles.Button}>
                           <Text style={styles.ButtonText}>Iniciar Sesión</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.preg}>
                        <Text style={styles.pregunta}>No tienes una cuenta? </Text>
                        </View>
                        
                        <TouchableOpacity style={styles.TextButton} onPress={navigate}>
                        <Text style={styles.SingUpText}>Registrate Ahora</Text>
                        </TouchableOpacity>
                        

                       
                    </View>
                    
        </ScrollView>
        // Container End
    );
};

export default SingIn;

const styles = StyleSheet.create({
    brandView: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    brandViewText:{
        color:'#ffbe0b',
        fontSize:45,
        fontWeight:'bold',
        textTransform:'uppercase',
        // justifyContent:'flex-start'
    },
    bottonView:{
        flex:1.5,
        backgroundColor:'#ffffffff',
        bottom:50,
        borderTopStartRadius:60,
        borderTopEndRadius:60,
    },  
    FormView:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginTop:-10,
    },
    TextInput:{
        width:'90%',
        borderWidth:1,
        borderColor:'black',
        height:52,
        borderRadius:10,
        paddingLeft:10,
        marginTop:20,
        color: 'black'
    },
    Button:{
        width:'90%',
        color:'yellow',
        height:52,
        backgroundColor: 'black',
        borderRadius:10,
        marginTop:20,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    ButtonText:{
        fontWeight:'bold',
        fontSize:18,
        color:'white'
    },
    SingUpText:{
        color:'#4632a1',
        fontSize:20,
    },
    TextButton:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        marginTop:10,
    },
    preg:{
        
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    pregunta:{
        color:'red',
    }
})

