import { useStripe } from "@stripe/stripe-react-native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Modal
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import config from "../../config/config";
import SimpleModal60 from "../AlertasPago/SimpleModalpagok";
import SimpleModal61 from "../AlertasPago/SimpleModalpagok";
const Payment = () => {
  const info = useSelector((store) => store.responseLog);
  const token = useSelector((store) => store.token);

  const [name, setName] = useState(info.eMail);
  const [tokenn, setToken] = useState(token);
  const stripe = useStripe();


   // validaciones

    // pago ok
    const [isModalVisible60, setisModalVisible60] = useState(false);
    const [chooseData60, setchooseData60] = useState();
  
    const changeModalVisible60 = (bool) => {
      setisModalVisible60(bool);
    };
  
    const setData60 = (data) => {
      setchooseData60(data);
    };

    // pago mal

    const [isModalVisible61, setisModalVisible61] = useState(false);
    const [chooseData61, setchooseData61] = useState();
  
    const changeModalVisible61 = (bool) => {
      setisModalVisible61(bool);
    };
  
    const setData61 = (data) => {
      setchooseData61(data);
    };

  useEffect(() => {
    console.log("llega bien el mail?", info.eMail, tokenn);
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      // sending request
      // const response = await fetch("http://192.168.0.10:3001/pay", {
      //   method: "POST",
      //   body: JSON.stringify({ name }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      const response = await axios.post(`http://${config.ip}:3001/api/pay`, {
        name,tokenn,
      });
      //.then(res=>res.data)

      console.log(response.data.key);
      console.log(response.status);

      //const data = await response.data;
      // if (!response.ok) return Alert.alert('error1',data.message);
      if (response.data.key == "400")
        return Alert.alert("error1", `${response.data.message}`);

      const clientSecret = response.data.clientSecret;
      console.log(clientSecret);
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Merchant Name",
      });

      if (initSheet.error)
        return Alert.alert("error2", initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error)
        return Alert.alert("error3", presentSheet.error.message);
        changeModalVisible60(true)
      // Alert.alert("Payment complete, thank you!");
    } catch (err) {
      console.error(err);
      changeModalVisible61(true)
      // Alert.alert("Something went wrong, try again later!");
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#ffffffff", alignSelf: "stretch" }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../ruta.png")}
        style={{
          height: Dimensions.get("window").height / 1.1,
          width: "100%",
        }}
      >
        <View style={styles.brandView}>
          <Ionicons
            name="location-sharp"
            style={{ color: "#FFC107", fontSize: 100 }}
          />
          <Text style={styles.brandViewText}>LOGIEXPRESS</Text>
          <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible60}
                  nRequestClose={() => changeModalVisible60(false)}
                >
                  <SimpleModal60
                    changeModalVisible60={changeModalVisible60}
                    setData60={setData60}
                  />
                  
                  </Modal>
                  <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible61}
                  nRequestClose={() => changeModalVisible61(false)}
                >
                  <SimpleModal61
                    changeModalVisible61={changeModalVisible61}
                    setData61={setData61}
                  />
                  
                  </Modal>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brandViewText: {
    color: "#FFC107",
    fontSize: 45,
    fontWeight: "bold",
    textTransform: "uppercase",

    // justifyContent:'flex-start'
  },
});
