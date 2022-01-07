import React, {useState} from "react";
import { Ionicons } from '@expo/vector-icons';
import {Text, StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView, ImageBackground, Dimensions, SafeAreaView, Modal} from 'react-native';
import {ModalPicker} from "./ModalPicker"
import {useDispatch} from "react-redux"
import { registrarUsuario } from "../actions/index";




const SignUp = ()=>{

    const dispatch = useDispatch();

    const [reg, setReg] = useState({
        nombre: "",
        apellido: "",
        mail: "",
        contraseña: "",
        telefono: "",
        rol: "Seleccionar Perfil...",
    });

    const ChangeInput = (e) => {
        setReg({ // y sino es  generos y platforms, directamente pongo lo que escribo en el input
            ...reg,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // en un objeto pongo lo que tengo en el estado inicial
        const obj = {
        nombre: reg.nombre,
        apellido: reg.apellido,
        mail: reg.mail,
        contraseña: reg.contraseña,
        telefono: reg.telefono,
        // rol: reg.rol,
        };

    //     // 30) Validaciones
    //     // if (!obj.nombre) {
    //     //     alert("Please write the name of the videogame!")
    //     //     return
    //     // }
    //     // if (!obj.description) {
    //     //     alert("Please write the description of the videogame!")
    //     //     return
    //     // }if (!obj.released) {
    //     //     alert("Please enter a release date!")
    //     //     return
    //     // }if (obj.rating > 5 || obj.rating < 0) {
    //     //     alert("The rating must be between 0 and 5!")
    //     //     return
    //     // }

        //acá despacho la accion pasandole el obj como payload
        dispatch(registrarUsuario(obj));
        // e.target.reset(); // reseteo todo los target
        // alert("Videogame created!"); //aviso con una alerta que se creó el videojuego
        
        // limpio todo el estado j, para una nueva creación
        setReg({
            nombre: "",
            apellido: "",
            mail: "",
            contraseña: "",
            telefono: "",
            // rol: "",
        });
        
        
    };

    const [chooseData, setchooseData] = useState('Seleccionar Perfil...');
    const [isModalVisible, setisModalVisible] = useState(false);

    const changeModalVisibility = (bool) =>{
        setisModalVisible(bool)
    }

    const setData= (option) =>{
        setchooseData(option)
    }
    return (
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
                            <Text style={{color:'#4632a1', fontSize:24}}>Ingresa a LogiExpress</Text>
                            
                                                                                   
                        </View>
                        {/* inputs */}
                        <View style={styles.FormView} onChange={(e) => ChangeInput(e)} onSubmit={(e) => handleSubmit(e)}>

                        <TextInput name="nombre"  value={reg.nombre}
                        onChangeText={(text) => setReg({nombre: text})} placeholder="Nombre*" style={styles.TextInput}></TextInput>
        
                        <TextInput value={reg.apellido} onChangeText={(text) => setReg({apellido: text})} name="apellido"  placeholder="Apellido*" style={styles.TextInput}></TextInput> 

                        <TextInput icon='mail' value={reg.mail} onChangeText={(text) => setReg({mail: text})} name="mail"  placeholder="Dirección de Mail*" style={styles.TextInput}></TextInput>     

                        <TextInput value={reg.contraseña} onChangeText={(text) => setReg({contraseña: text})} name="contraseña"  placeholder="Contraseña*" secureTextEntry={true} style={styles.TextInput}></TextInput>

                        <TextInput value={reg.telefono} onChangeText={(text) => setReg({telefono: text})} name="telefono" placeholder="Telefono*" style={styles.TextInput}></TextInput>

                        <SafeAreaView style={styles.container}>
                            <TouchableOpacity
                            onPress={() => changeModalVisibility(true)}
                            style={styles.TouchableOpacity}
                            >
                                <Text style={styles.text}>{reg.rol}</Text>
                            </TouchableOpacity>
                            <Modal
                                transparent={true}
                                animationType='fade'
                                visible={isModalVisible}
                                nRequestClose={() => changeModalVisibility(false)}
                                >
                                <ModalPicker
                                changeModalVisibility={changeModalVisibility}
                                setData={setData}
                                
                                />
                            </Modal>
                        </SafeAreaView>
                        
                        <TouchableOpacity style={styles.Button}>
                           <Text style={styles.ButtonText} onPress={handleSubmit}>Registrarme!</Text>
                            </TouchableOpacity>
                        </View>
                      
                        

                       
                    </View>
                    
        </ScrollView>
    )
}

export default SignUp

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
        marginTop:-20,
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
    },
    container:{
        flex:1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        marginTop:20,
        borderRadius:20,
    },
    text:{
        // marginVertical: 20,
        fontSize: 25,
        color:'white',
        fontWeight:'bold'
    },
    TouchableOpacity:{
        backgroundColor:'#ffbe0b',
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        paddingVertical:10,
        borderRadius:10,
    }
})



