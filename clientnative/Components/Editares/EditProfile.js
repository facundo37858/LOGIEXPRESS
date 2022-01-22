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
//Hook para la navegacion
import { useNavigation } from "@react-navigation/core";
//Agarrar imagen del celu
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { editProfileUser } from "../../actions";
// prueba para las screens responsive
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const EditProfile = () => {
  const dispatch = useDispatch();
  const datosUser = useSelector((store) => store.responseLog)
  useEffect(() => {
    //console.log("SOY DATOS DEL USER", datosUser);
  }, [datosUser]);

  ////--> HOOK PARA LA NAVEGACION <-- ////
  const navigation = useNavigation();

  ////--> IMAGE PICKER <-- ////
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Se requiere el permiso para acceder a la cámara");
      return;
    }

    //Si es true va a venir a pickerResult
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (pickerResult.cancelled !== true) {
      let newFile = {
        uri: pickerResult.uri,
        type: `logi/${pickerResult.uri.split(".")[1]}`,
        name: `logi.${pickerResult.uri.split(".")[1]}`,
      };
      handleUpload(newFile);
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "logiexpress");
    data.append("cloud_name", "elialvarez");

    fetch("https://api.cloudinary.com/v1_1/elialvarez/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setSelectedImage(data.url);
      });
  };

  //// --> ESTADO PARA LOS INPUTS <-- ////
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    identification: '',
    zone: '', 
    phone: '',

  });

  
  //// ---> HANDLERS INPUTS <--- ////
  const handleChangeName = (name) => {
    setUser({
      ...user,
      name : name,
    });
  };

  const handleChangeLastName = (lastName) => {
    setUser({
      ...user,
      lastName : lastName,
    });
  };

  const handleChangeIdentification = (identification) => {
    setUser({
      ...user,
      identification: identification,
    });
  };

  const handleChangeZone = (zone) => {
    setUser({
      ...user,
      zone: zone,
    });
  };

  const handleChangePhone = (phone) => {
    setUser({
      ...user,
      phone: phone,
    });
  };

  //// --> HANDLE SUBMIT <-- ////
 function handleSubmit(e) {
   e.preventDefault();
   const edit= {
     name : user.name,
     lastName: user.lastName,
     identification: user.identification,
     zone: user.zone,
     phone: user.phone,
     photo: selectedImage,
      id: datosUser.id
   }
   dispatch(editProfileUser(edit))
   console.log("soy lo que se envia el front", edit);
 }

  //// --> Inicio de componente <-- ////
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}  onSubmit={(e) => handleSubmit(e)}>
      <ScrollView
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconBar}>
          <TouchableOpacity
            //no esta conectado a ningun lugar
            onPress={() => navigation.navigate("ProfileUserScreen")}
          >
            <Icon name="chevron-back-outline" size={30} />
          </TouchableOpacity>
        </View>
        <Text style={{ fontWeight: "bold", marginLeft: 15, fontSize: 25 }}>
          Editar perfil
        </Text>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri:
                selectedImage !== null
                  ? selectedImage.localUri
                  : "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg",
            }}
            style={styles.imgPerfil}
          />

          <View>
            <TouchableWithoutFeedback onPress={openImagePickerAsync}>
              <Image
                source={require("./add-photo.png")}
                style={styles.imgAdd}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>

        {/* INICIO DEL FORMULARIO */}
        <View style={styles.containerInputs}>
          <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}>
            Datos personales
          </Text>
          <View style={styles.viewsInputs}>
            <Icon name="person-outline" size={26} />
            <TextInput
             value={user.name}
              placeholder="Nombre"
              name="name"
              style={styles.textPlaceholder}
              onChangeText={(name) =>
                handleChangeName(name)
              }
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="person-outline" size={26} />
            <TextInput
            value={user.lastName}
              placeholder="Apellido"
              name="lastname"
              style={styles.textPlaceholder}
              onChangeText={(lastName) =>
                handleChangeLastName(lastName)
              }
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="reader-outline" size={26} />
            <TextInput
            value={user.identification}
              placeholder="Documento de identidad"
              name="identification"
              style={styles.textPlaceholder}
              onChangeText={(identification) =>
                handleChangeIdentification(identification)
              }
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="phone-portrait-outline" size={26} />
            <TextInput
            value={user.phone}
              placeholder="Celular válido"
              name="phone"
              style={styles.textPlaceholder}
              onChangeText={(phone) =>
                handleChangePhone(phone)
              }
            />
          </View>
          <View style={styles.viewsInputs}>
            <Icon name="map-outline" size={26} />
            <TextInput
            value={user.zone}
              placeholder="Lugar de residencia actual"
              name="zone"
              style={styles.textPlaceholder}
              onChangeText={(zone) => handleChangeZone(zone)}
            />
          </View>
          <View style={styles.btn2}>
            <TouchableOpacity
              style={styles.btnEditar}
              ///---> PONER A DONDE TIENE QUE VOLVER <--- ///
              onPress={() => navigation.navigate("DatosPersonalesUser")}
            >
              <Text style={styles.textBtn}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnEditar}>
              <Text style={styles.textBtn} onPress={handleSubmit}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    borderColor: "#FFC107",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: wp('85%'),
    alignItems: "flex-start",
    marginBottom: 15,
  },
  textPlaceholder: {
    marginLeft: 20,
    fontSize: 17,
    marginBottom: 2,
  },
  btnEditar: {
    backgroundColor:"#FFC107",
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
