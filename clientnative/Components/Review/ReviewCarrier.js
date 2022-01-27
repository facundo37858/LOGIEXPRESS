import React, { useState, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  YellowBox,
} from "react-native";
import StarRating from 'react-native-star-rating';
import HeaderBar from "../Utils/HeaderBar";
import {reviewCarrier} from "../../actions/index"
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

const StartUser = (props) => {

  const dispatch = useDispatch()
  // const data = props.route.params
  const navigation = useNavigation();

  const [review, setReview] = useState({
    rating: "",
    description: "",
  });

  
  const handelChangeRating = (rating) => {
    setReview({
      ...review,
      rating: rating,
    });
  };
  const handelChangeDescription = (description) => {
    setReview({
      ...review,
      description: description,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // en un objeto pongo lo que tengo en el estado inicial
    const obj = {
      idTravel: props.route.params,
      User_raiting: review.rating,
      User_comment: review.description,
    };

    //Validaciones:

    if (!obj.User_raiting || obj.User_raiting === 0 ) {
      alert('tiene que poner un rating')
      // changeModalVisible5(true)
      return;
    }
    // if (!obj.description) {
    //   alert('tiene que poner una descripcion')
    // //   changeModalVisible6(true)
    //   return;
    // }

    dispatch(reviewCarrier(obj));
    console.log("Estoy enviado", obj);
    setReview({
      rating: "",
      description: "",
    });
    navigation.navigate('ProfileScreenCarrier')
    //cuando se cumpla que respuesta != null
    //haga un console.log(respuesta)

  
  };

  // console.log("ESTO ES LO QUE LLEGAAAAAAAAAAA", data)

  return (
    //Container Start
    <SafeAreaView
      style={{ backgroundColor: "#f3f3f3"}}

    >


      <View style={{ backgroundColor: "#7952B3", marginTop: 20, height: 60 }}>
        <Text style={{ color: 'white', display: 'flex', alignSelf: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 15 }}>El Viaje ha finalizado</Text>
      </View>
      {/* <ImageBackground
        source={require("./camion2.gif")}
        style={{
          height: '40%',
          width: '40%',
          display: 'flex',
          alignSelf: 'center',
          marginLeft: 40,
          marginTop: 10,
        }}
      >
      </ImageBackground> */}
      <View>

        <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 20, fontWeight: '200' }}>Califica al Usuario</Text>
        {/* estrellas rating */}

        <View style={{ width: 240, alignSelf: 'center', marginTop: 50, }}>

        <StarRating
        disabled={false}
        maxStars={5}
        rating={Number(review.rating)}
        selectedStar={(rating) => handelChangeRating(rating)}
        fullStarColor='purple'
      />

        {/* <TextInput
            value={review.rating}
            onChangeText={(name) => handelChangeRating(name)}
            name="rating"
            placeholder="Rating*"
            style={styles.TextInput}
          ></TextInput> */}
          <TextInput
            value={review.description}
            onChangeText={(name) => handelChangeDescription(name)}
            name="description"
            placeholder="Description*"
            style={styles.TextInputt}
            size='32'
          ></TextInput>

          {/* <StarRating
            disabled={false}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={4}
            fullStarColor={'#7952B3'}
          ></StarRating>
          <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: '500' }}>Rating: 4/5</Text> */}
        </View>    
   

        {/* <View >
        
          MERCADOPAGO
 
          <View style={{ height: 35, marginTop: 3, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Id del Viaje: </Text>
            <Text style={{ fontSize: 17, fontWeight: '300' }}>{data.travel.id}</Text>
          </View>

        </View> */}
        <View  >

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={handleSubmit} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 13, height: '140%', width: '40%', backgroundColor: 'orange', borderRadius: 10 }}>

              <Text style={styles.aceptar}>Enviar </Text>

            </TouchableOpacity>
            {/* <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 13, height: '140%', width: '40%', backgroundColor: 'orange', borderRadius: 10 }}
            onPress={() => navigation.navigate('ProfileUserScreen')}
            >

              <Text style={styles.rechazar}>Rechazar</Text>

            </TouchableOpacity> */}

          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default StartUser;

const styles = StyleSheet.create({
  botones: {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  aceptar: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: '700'
  },
  rechazar: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: '700'
  },
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
  bottonView: {
    flex: 1.5,
    backgroundColor: "#ffffffff",
    bottom: 50,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  FormView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: -10,
  },
  TextInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "black",
    height: 52,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
    color: "black",
  },
  TextInputt: {
    alignItems:'flex-end',
    width: "110%",
    height:"40%",
    borderWidth: 1,
    borderColor: "black",
    // height: 52,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
    color: "black",
  },
  Button: {
    width: "90%",
    color: "#FFC107",
    height: 52,
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  SingUpText: {
    color: "#7952B3",
    fontSize: 20,
  },
  TextButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  preg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  pregunta: {
    color: "red",
  },
});
