import { useStripe} from "@stripe/stripe-react-native";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Alert, ImageBackground, Dimensions, StyleSheet } from "react-native";
import axios from 'axios'
import { useSelector} from "react-redux";
import { Ionicons } from "@expo/vector-icons";




const Payment = () => {

  
 
  const info = useSelector((store) => store.responseLog)
  
  const [name, setName] = useState(info.eMail);
  const stripe = useStripe();

  useEffect(()=>{
    console.log('llega bien el mail?',info.eMail)
    subscribe();
    
  },[])
  
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
     
      const response = await axios.post(`http://192.168.0.111:3001/api/pay`, { name })
      //.then(res=>res.data)

      console.log(response.data.key)
      console.log(response.status)
      
      
  
      //const data = await response.data;
      // if (!response.ok) return Alert.alert('error1',data.message);
      if (response.data.key=='400') return Alert.alert('error1',`${response.data.message}`);
      
      

    const clientSecret = response.data.clientSecret;
    console.log(clientSecret)
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Merchant Name',
      });
      
    if (initSheet.error) return Alert.alert('error2',initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert('error3',presentSheet.error.message);
      Alert.alert("Payment complete, thank you!");


      
     } catch (err) {
    console.error(err);
    Alert.alert("Something went wrong, try again later!");
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#ffffffff",alignSelf: 'stretch', }}
      showsVerticalScrollIndicator={false}
      
    >
         <ImageBackground
        source={require("../ruta.png")}
        style={{
          height: Dimensions.get("window").height / 1.1,
          width:'100%'
        }}
      >
        <View style={styles.brandView}>
          <Ionicons
            name="location-sharp"
            style={{ color: "#FFC107", fontSize: 100 }}
          />
          <Text style={styles.brandViewText}>LOGIEXPRESS</Text>
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
})