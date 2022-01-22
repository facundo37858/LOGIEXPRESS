import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/Ionicons";


const HeaderBar = () => {

    const navigation = useNavigation();


    return (
        <View style={{ paddingHorizontal: 17, flexDirection: "row"}}>
            <View style={{flex: 1, alignItems: "flex-start"}}>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}
                onPress={() => navigation.goBack()}
                >
                <Icon name="arrow-back" size={30} />
                {/* <Text style={{marginLeft: 5, fontSize: 19, fontWeight: 'bold', marginBottom: 3}}>Volver</Text> */}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HeaderBar

const styles = StyleSheet.create({})
