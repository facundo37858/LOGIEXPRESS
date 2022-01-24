import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Payment from './Payment';

export default function App(props) {
  console.log('data paymentData: ',props.route.params.userReg.id)
  return (
    
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test_51KHp41KDcJ8UiNxjjfe3Hu14nV8NBZdLtNKoxphiEmAc47pFn4KnSTJ7s68Hpy4dOQbtnadCYbhYtovQbPa9nkx10013QK2vqD">
        <Payment info={props}/>
      </StripeProvider>
      {/* <StatusBar style="auto" backgroundColor="red" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});