import { Dimensions, StyleSheet, Text, View, icon ,TouchableNativeFeedback,TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';


const CityBox = ({city, onButtonClicked, ...props})=>{
    
    let TouchableCmp = TouchableOpacity
    // console.log(props.weather)
    
    if(Platform.OS === 'android' && Platform.Version>=21)
     TouchableCmp = TouchableNativeFeedback /*background={TouchableNativeFeedback.Ripple("black", false)};*/
    return (
        <View style={styles.card}>
            <View style={styles.touchable}>
            <TouchableCmp onPress={()=>onButtonClicked(city.name, city.temp, city.weather)} backg round={TouchableNativeFeedback.Ripple("black", false)}>
                    <View>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>{city.name}</Text>
                        </View>
                        <View style={styles.weatherContainer}>
                        <Feather style={styles.CityIcon} name={city.weather} size={Dimensions.get('window').height*0.057} color="black" />
                            <View style={styles.temp}>
                                <Text>{city.temp>0?"+"+city.temp:city.temp}C</Text>
                            </View>
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderWidth: 2,
        borderColor: "black",
        margin: 10,
        marginHorizontal: 20,
        borderRadius: 10
    },
    weatherContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    temp: {
        paddingVertical: 5
    },
    logo: {
        width: 50,
        height: 50
    },
    title: {
        padding: 10,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 9
    }
})

  export default CityBox;