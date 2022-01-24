import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/Ionicons";
// prueba para las screens responsive
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

const HeaderBar = () => {

    const navigation = useNavigation();


    return (
        <View style={{ paddingHorizontal:  wp('3%'), flexDirection: "row",  paddingBottom: wp('4%'), marginTop: wp('10%')}}>
            <View style={{flex: 1, alignItems: "flex-start"}}>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}
                onPress={() => navigation.goBack()}
                >
                <Icon name="arrow-back" size={27} />
                {/* <Text style={{marginLeft: 5, fontSize: 19, fontWeight: 'bold', marginBottom: 3}}>Volver</Text> */}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HeaderBar

const styles = StyleSheet.create({})
