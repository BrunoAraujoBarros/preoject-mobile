import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import * as Animatable from 'react-native-animatable';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native'; 

export default function SingnIn(){
    const [UserId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigation = useNavigation();

    const handleCreateAccount = () => {
        console.log('Login button pressed');
        navigation.navigate('Register')
      };

    const handleLogin = async () => {
        setLoading(true);
        setError('');
    
        try {
            console.log('Tentando conectar ao servidor...');
            const response = await axios.post('http://10.0.2.2:3000/auth/login', {
                UserId,
                password,
            });
    
            console.log('Resposta recebida:', response.data);
    
            const { token, expirexIn } = response.data;
    
            if (token) {
                console.log('Token recebido:', token);
    
                await SecureStore.setItemAsync('userToken', token)
                    .then(() => {
                        console.log('Token armazenado com sucesso!');
                        navigation.navigate('TelaInicial'); 
                    })
                    .catch(err => {
                        console.error('Erro ao armazenar token:', err);
                        setError('Erro ao armazenar token de segurança. Tente novamente.');
                    });
            } else {
                console.error('Token não encontrado ou inválido');
                setError('Token não encontrado ou inválido');
            }
        } catch (err) {
            console.error('Erro na solicitação:', err);
            setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        } finally {
            setLoading(false);
        }
    };
    return(
        <View style={style.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={style.containerHeader}>
                <Text style={style.message}>Bem-Vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation='fadeInUp' style={style.containerForm}>
                <Text style={style.title}>User-Id</Text>
                <TextInput 
                placeholder="Digite um user-id..."
                style={style.input}
                value={UserId}
                onChangeText={setUserId}
                />

                <Text style={style.title}>Senha</Text>
                <TextInput 
                placeholder="Sua senha..."
                style={style.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                />

                {error ? (
                    <Text style={style.errorText}>{error}</Text>
                ) : null}

                <TouchableOpacity style={style.buttom} onPress={handleLogin} disabled={loading}>
                    <Text style={style.buttomText}>{loading ? 'Carregando...' : 'Acessar'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.buttomRegister} onPress={handleCreateAccount}>
                    <Text style={style.registerText}>Cadastre-se</Text>
                </TouchableOpacity>
            </Animatable.View>

        </View>
    )
}
const style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ADFF2F'
    },
    errorText: {
        color: 'red',
        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerHeader:{
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%'

    },
    message:{
        fontSize:28,
        fontWeight: 'bold',
        color: '#FFF'
    },
    containerForm:{
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'

    },
    title:{
        fontSize: 20,
        marginTop: 20
    },
    input:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,

    },
    buttom:{
        backgroundColor: '#ADFF2F',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttomText:{
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttomRegister:{
        marginTop: 14,
        alignSelf: 'center',
    },
    registerText:{
        color: '#a1a1a1'
    }

})