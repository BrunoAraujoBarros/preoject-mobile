import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable'

export default function Welcome(){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            
            
            <View style={styles.containerLogo} >
                <Animatable.Image 
                animation='flipInY'
                source={require("../../assents/system.jpeg")}
                style={{ width: '100%',  }}
                resizeMode="contain"
                />
            </View>
            <Animatable.View animation='fadeInUp' delay={600} style={styles.containerForm}>
                <Text style={styles.title}>Mude de Vida</Text>
                <Text style={styles.text}>Realize o login!</Text>

                <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate('SingnIn')}
                >
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#ADFF2F'

    },
    containerLogo:{
        flex:2,
        backgroundColor: '#ADFF2F',
        justifyContent:'center',
        alignItems: 'center',
        
        

    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'

    },
    title:{
        fontSize:24,
        fontWeight: 'bold',
        marginTop:28,
        marginBottom: 12
    },
    text:{
        color: '#a1a1a1'
    },
    button:{
        position: 'absolute',
        backgroundColor: '#38a69d',
        borderRadius:50,
        paddingVertical:8,
        width:'60%',
        alignSelf:'center',
        bottom:'15%',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        fontSize:18,
        color: '#FFF',
        fontWeight: 'bold'
    }
})