import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";

const CompleteProfileUser = () => {
 const dispatch = useDispatch();

 const[ user, setUser] = useState({
  //  name: '',
  //  lastname: '',
  //  eMail: '',
   identification: '',
   zone: '',
   phone: '',
   account: ''
 });

 //// --> HANDLERS <-- ////
 function handleChange(e){
   setUser({
     ...user,
     [e.target.name] : e.target.value
   })
 }

 function handleSubmit(e) {
   e.preventDefault();
   dispatch()
   setUser({
    identification: '',
    zone: '',
    phone: '',
    account: ''
   })
 }
 
  return (
    //// --> INICIO DE PANTALLA <-- ////
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontWeight: "bold",
            marginLeft: 15,
            marginTop: 50,
            fontSize: 25,
          }}
        >
          Perfil
        </Text>
        {/* Foto e iconito de agregar imagen */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../ruta.png")}
            style={{
              width: 190,
              height: 190,
              borderRadius: 100,
              borderWidth: 5,
              borderColor:  "#FFC107",
              marginTop: 40,
            }}
          />
          <View style={styles.add}>
            <TouchableWithoutFeedback
              onPress={() => Alert.alert("Buenop, acá haria lo de la img")}
            >
              <Image
                source={require("../add-image.png")}
                style={{
                  width: 60,
                  height: 60,
                  marginLeft: 220,
                  marginTop: -80,
                  borderWidth: 4,
                  borderColor: "#D5D5D5",
                  borderRadius: 50,
                }}
              />
            </TouchableWithoutFeedback>

            {/* Inicio de inputs formulario */}
            <View style={styles.containerInputs} onChange={(e) => handleChange(e)} onSubmit={(e) => handleSubmit(e)}>
              <View style={styles.viewsInputs}>
                <Icon name="person-circle-outline" size={26} style={{paddingBottom: 2}}/>
                <TextInput
                  value={user.name}
                  placeholder="Nombre"
                  name="name"
                  style={styles.textPlaceholder}
                  
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="person-circle-outline" size={26} style={{paddingBottom: 2}} />
                <TextInput
                  value={user.lastname}
                  placeholder="Apellido"
                  name="lastname"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="mail-outline" size={26} style={{paddingBottom: 2}} />
                <TextInput
                 value={user.eMail}
                  placeholder="sprint1.jebusayudanos@gmail.com"
                  name="eMail"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="reader-outline" size={26} style={{paddingBottom: 2}} />
                <TextInput
                 value={user.identification}
                  placeholder="Documento de identidad"
                  name="identification"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="navigate-outline" size={26} style={{paddingBottom: 2}} />
                <TextInput
                 value={user.zone}
                  placeholder="Lugar de residencia actual"
                  name="zone"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="phone-portrait-outline" size={26} style={{paddingBottom: 2}} />
                <TextInput
                 value={user.phone}
                  placeholder="Celular válido"
                  name="phone"
                  style={styles.textPlaceholder}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="card-outline" size={26} style={{paddingBottom: 2}} />
                <TextInput
                 value={user.account}
                  placeholder="Medio de pago válido"
                  name="account"
                  style={styles.textPlaceholder}
                />
              </View>
              <TouchableOpacity style={styles.btnEditar}>
                <Text style={styles.textBtn}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CompleteProfileUser;

const styles = StyleSheet.create({
  containerInputs: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 50,
  },
  textPlaceholder: {
    marginLeft: 15,
    fontSize: 17,
    marginBottom: 4,
  },
  btnEditar: {
    backgroundColor: "#FFC107",
    borderRadius: 10,
    width: 150,
    height: 50,
    marginTop: 20,
    alignSelf:'center'
  },
  textBtn: {
    color: "black",
    fontSize: 17,
    alignSelf:'center',
    marginTop: 12,
  },
  viewsInputs: {
    borderColor: "#D5D5D5",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 360,
    alignItems: "flex-start",
    marginBottom: 16,
    
    
  },
});
