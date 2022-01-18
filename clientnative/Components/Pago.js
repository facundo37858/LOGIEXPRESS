import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { API_URL } from "./Config";

const Pago = () => {
    const [name, setName] = useState('');
    const {confirmPayment, loading} = useConfirmPayment();

    const handlePayPress = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent` ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                paymentMethodType: 'card',
                currency: 'usd',
              }),
        })
        
        const {clientSecret} = await response.json();

        const {error, paymentIntent} = await confirmPayment(clientSecret, {
            type: 'Card',
            billingDetails: {name}
        })
        
        if(error) {
            Alert.alert(`Error code: ${error.code}`, error.message)
        } else if (paymentIntent) {
            Alert.alert('Success', `Payment successful: ${paymentIntent.id}` )
        }
    }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Metodo de pago</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="Name"
        keyboardType="name-phone-pad"
        onChange={(value) => setName(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
      postalCodeEnabled={false}
       placeholder={{
        number: '4242 4242 4242 4242',
      }}
      onCardChange={(cardDetails) => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
      style={styles.cardField}
      cardStyle={{
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 10
      }}
      />
      <Button title='Pagar' onPress={handlePayPress} disabled={loading}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    // paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderBottomColor: "pink",
    borderBottomWidth: 1.5,
  },
  cardField: {
    width: '90%',
    height: 40,
    marginVertical: 30,
  },
});

export default Pago;
