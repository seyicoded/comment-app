import { View, Text, StyleSheet, Image, Dimensions, ImageBackground, StatusBar } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import { Color } from '../../constants/color/color';

const MONEY_DIMENSIONS = { width: 49, height: 26 };
const SCREEN_DIMENSIONS = Dimensions.get('window');
const WIGGLE_ROOM = 50;

export default function SplashScreen() {
    
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={Color.PRIMARY} />
        <Animatable.Image style={styles.floating} source={require("../../assets/resources/splashC.png")} />    
        <Animatable.Text style={styles.title} delay={500} animation={"zoomInDown"} duration={2800}>Seyi-TFX</Animatable.Text>
        <Animatable.Text style={styles.text} animation={"fadeIn"} delay={3000} duration={2800}>Global transaction solution</Animatable.Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.PRIMARY
    },
    title: {
        fontSize: 48,
        textTransform: 'uppercase',
        zIndex: 99,
        fontWeight: '600'
    },
    floating: {
        opacity: 0.2,
        position: 'absolute',
        left: 1
    },
    text: {
        color: Color.PRIMARY_LIGHT,
        fontSize: 11.87,
        fontWeight: '400'
    }
})