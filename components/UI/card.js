import React from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
// import Card, {
//   Cards,
//   CARD_HEIGHT as DEFAULT_CARD_HEIGHT,
// } from "../Transformations/components/Card";
import CityList from '../CityList'

const { width } = Dimensions.get("window");
const ratio = 95 / 362; ///=>>>>>>>>>>>  Редактируем соотношение сторон
//11 90/362 0.248 0.462  828 × 1792
//12 95/362  0.262 0.462 1170 × 2532
export const CARD_WIDTH = width * 0.8;
export const DEFAULT_CARD_HEIGHT = CARD_WIDTH * ratio;

export const MARGIN = 16;
export const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN*1.75 ;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight *0.72;
const styles = StyleSheet.create({
  card: {
    marginVertical: MARGIN,
    paddingHorizontal:20
    // alignSelf: "center",
  },
});



const WalletCard = ( {type, y, index, navigation }) => {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: "clamp",
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: "clamp",
    })
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });
  return (
    <Animated.View
      style={[styles.card, { opacity, transform: [{ translateY }, { scale }] }]}
      key={index}
    >
     <CityList 
       onButtonClicked={()=>{console.log("tap")}}
       name={"Minsk"+index} 
       key={index}
       title={"Minsk"+index}
       // loadWeather={props.LoadWeather}
       temp={"10"}
       weather={"sun"}
       navigation={navigation}
     />
    </Animated.View>
  );
};

export default WalletCard;

