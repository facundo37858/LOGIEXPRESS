import { useStripe} from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from 'axios'





const Payment = () => {
 
 
  
  const [name, setName] = useState("");
  const stripe = useStripe();
  
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
     
      const response = await axios.post(`http://192.168.2.104:3001/api/pay`, { name })
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
    <View>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="e-mail"
        style={{
          width: 300,
          fontSize: 20,
          padding: 10,
          borderWidth: 1,
        }}
      />
      
      <Button title="Pay Carrier" onPress={subscribe} />
    </View>
  );
};

export default Payment;
