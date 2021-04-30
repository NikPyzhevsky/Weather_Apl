import React, { useState } from 'react'
import {View,  StyleSheet, Dimensions, Modal} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';



export default function Input(props){
   
    return(
          <View  style={styles.CitiesSearch} >
            <View>
                <EvilIcons style={styles.TextIcon} name="search" size={40} color="#DADADA" />
            </View>
            <View style={styles.InputCont}>
                <TextInput 
                    style={styles.input}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    placeholder="Enter city here..."
                    // inlineImageLeft={EvilIcons}
                    maxFontSizeMultiplier={0}
                />
                
                    <IconButton
                    icon="close-circle"
                    color="#cdcdcd"
                    size={17}
                    onPress={() => props.cancel()}
                />
                
                
            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
    
    input:{
        fontSize:20,
        color:"#575757",
        // backgroundColor:'yellow',
        flex:1,
         
    },
    CitiesSearch:{
        marginHorizontal:20,
        // marginTop:  Dimensions.get('window').height*0.05 ,
        // marginBottom:Dimensions.get('window').height*0.03,
        borderWidth:2,
        borderColor:'#CDCDCD',
        height:50,
        borderRadius:3,
        paddingLeft:5,
        alignItems:'center',
        flexDirection:'row',
        backgroundColor: `white`
        
    },
    InputCont:{
        justifyContent:'space-between',
        // backgroundColor:'yellow',
        flexDirection:'row',
        flex:1
    },
    ActivityIndicator:{
        marginRight:Dimensions.get('window').height*0.03,
    }
    
  });