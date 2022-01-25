import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
// prueba para las screens responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { editProfileCarrier } from "../../actions";

const Chat = () => {
  //Lo traemos del store
  const socket = useSelector((store) => store.socket);
  //console.log('soy sockets', socket)

  //const fullData = useSelector((store) => store)
  //console.log('soy fulldata', fullData)

  const datos = useSelector((store) => store.responseLog);
  //console.log("traigo datos", datos);

  //disconect esta variable donde vamos a guardar la respuesta del back
  //que nos permitira saber si estan ambos conctados al chat
  const [disconect, setDisconect] = useState("");
  //room: en esta variable guardaremos el id del travel para crear el room del chat
  //y mantenerlo vinculado
  const [room, setRoom] = useState("");
  //currentMessage: aqui se guarda el mensaje actual
  const [currentMessage, setCurrentMessage] = useState("");
  //messageList: se va guardando toda la lista de mensajes
  const [messageList, setMessageList] = useState([]);
  //username: se guardará el usuario actual
  const [username, setUsername] = useState([]);

  socket.emit("join_room", room, (response) => {
    //aqui estamos envian al back el id del travel para crear el room

    //Response.status contiene la respuesta enviada desde el back
    //que en este caso creamos un objeto con todos los datos del travel vinculados
    //con las tablas User y carrier
    //console.log('SOY LINEA 41', response.status);
    setRoom(response.status.travelId); // ok
    //con la variable userType estamos contralando cual de los usuarios esta desconectado
    //si userType es 1 es usuario conectado es User y el desconectado carrier
    // y si es 0 lo contraio
    if (datos.role === true) {
      setUsername(response.status.Us[0].name);
      setDisconect(response.status.Car[0].name);
    }
    if (datos.role === false) {
      setUsername(response.status.Car[0].name);
      setDisconect(response.status.Us[0].name);
    }
  });

  //La funcion sendMessage es la funcion que nos va a permitir enviar los mensajes
  //esta sera usada al momento de darle al boton enviar mensaje
  const sendMessage = async () => {
    if (currentMessage !== "") {
      //messageDate es el objeto que nos permitira agrupar
      //los datos necesarios para enviar los mensajes
      const messageData = {
        room: room,
        author: username, //agregar nombre de usuario
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      //en este sockets enviaremos el mensaje al back
      await socket.emit("send_message", messageData, (response) => {
        //este envio nos devolvera una respuesta quenos servira para valiar
        //si el otro usuario esta conectado y crear la respuesta de usuario offline user
        //console.log(response.status);
        if (response.status !== "") {
          let messageData = {
            room: room,
            author: disconect, //agregar nombre de usuario
            message: response.status,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          };

          setMessageList((list) => [...list, messageData]);
        }
      });

      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  //en este useEffect estamos escuchando las respuestas de los
  //mensaje recibidos que vienen del back

  useEffect(() => {
    socket.on("receive_message", (data) => {
      //console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.text}>ExpressChat</Text>
      </View>
      <ScrollView>
        <View>
          {messageList.map((messageContent, index) => {
            return (
              <View
                key={index}
                id={
                  username === messageContent.author || username === disconect
                    ? "you"
                    : "other"
                }
              >
                <View>
                  <View>
                    <Text>{messageContent.message}</Text>
                  </View>
                  <View>
                    <Text>{messageContent.time}</Text>
                    <Text>{messageContent.author}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.containerInpBtn}>
        <View style={styles.viewsInputs}>
          <TextInput
            style={styles.textInputs}
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChangeText={(text) => {
              setCurrentMessage(text);
            }}
            multiline={true}
            // onKeyPress={(text) => {
            //  text.key === "Enter" && sendMessage();
            // }}
          />
        </View>
        {/* hacemos uso de la funcion sendMessage  */}
        <TouchableOpacity style={styles.btn} onPress={sendMessage}>
          <Image
            source={require("./enviar-mensaje.png")}
            style={{
              width: wp("8%"),
              height: hp("4%"),
              alignSelf: "center",
              marginTop: wp("1.2%"),
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp("35%"),
    width: wp("100%"),
    backgroundColor: "#FAFAFA",
  },
  containerHeader: {
    backgroundColor: "#7952B3",
  },
  text: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    textAlign: "center",
    padding: wp("4%"),
    backgroundColor: "#7952B3",
    marginTop: wp("9%"),
    color: "white",
  },
  btn: {
    backgroundColor: "#FFC107",
    padding: wp("2.5%"),
    width: wp("16%"),
    height: hp("8%"),
    borderRadius: wp("40%"),
  },
  BtnTxt: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
  containerInpBtn: {
    flexDirection: "row",
    padding: wp("2.5%"),
    width: wp("100%"),
    justifyContent: 'center',
    borderTopWidth: wp('1%'),
    borderColor:  "#F0F0F0"
    
  },
  viewsInputs:{
    width: wp('70%'),
    padding: wp('4%'),
    backgroundColor: "#EEEEEE",
    borderRadius: wp('10%'),
    marginRight: wp('2%')
  },
  textInputs:{
    fontSize: hp('2%')
  }
});
