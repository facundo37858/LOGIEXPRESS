import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderBar from './Utils/HeaderBar'

const ScreenWaiting = () => {

    function renderComponent() {
        return (
            <View style={{
                marginTop: 24,
                marginHorizontal: 12,
                alignItems: 'center',
                borderRadius: 12,
                backgroundColor: '#FFC107'
            }}>
                <Text>HOLA SOY UN TEXTOO</Text>
                <Text>HOLA SOY UN TEXTOO</Text>
                <Text>HOLA SOY UN TEXTOO</Text>
                <Text>HOLA SOY UN TEXTOO</Text>
                <Text>HOLA SOY UN TEXTOO</Text>
                <Text>HOLA SOY UN TEXTOO</Text>
                <Text>HOLA SOY UN TEXTOO</Text>
            </View>
        )
    }




    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#fff"
            }}
        >
            <HeaderBar />
            <ScrollView>
                <View style={{ flex: 1, paddingBottom: 24, }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: "bold", fontSize: 25}}>VIAJE SOLICITADO</Text>
                    </View>
                    {renderComponent()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ScreenWaiting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
