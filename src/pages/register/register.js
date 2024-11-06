import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import * as Animatable from 'react-native-animatable'
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../../graphql/mutations";

export default function Register(){
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [Password, setPassword] = useState('');
    const [UserId, setUserId] = useState('');
    const [createUsers, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);

    const handleRegister = async () => {
      if (Password !== confirmPassword) {
        alert('As senhas não coincidem');
        return;
      }
    
      try {
        const { data } = await createUsers({
          variables: {
            data: {
              name,
              Password: Password,
              UserId,
              url,
            },
          },
        });
    
        if (data) {
          console.log('Usuário registrado:', data);
          alert('Usuário registrado com sucesso!');
        }
      } catch (e) {
        console.error(e);
        alert('Erro ao registrar usuário');
        navigation.navigate('SingnIn');
      }
    }
      return (
        <View style={styles.container}>

          <Animatable.View>
            <Text style={styles.headerText}>Crie sua conta</Text>
            <TextInput 
            placeholder="Foto de Perfil"
            style={styles.textInput}
            value={url}
            onChangeText={setUrl}
            /> 
            <TextInput 
            placeholder="Nome"
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            /> 
            <TextInput 
            placeholder="Senha"
            style={styles.textInput}
            secureTextEntry
            value={Password}
            onChangeText={setPassword}
            /> 
            <TextInput 
            placeholder="Confirme a Senha"
            style={styles.textInput}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            /> 
            <TextInput 
            placeholder="Seu nome de usuario"
            style={styles.textInput}
            value={UserId}
            onChangeText={setUserId}
            />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>

      {loading && <Text>Registrando...</Text>}
      {error && <Text style={{ color: 'red' }}>Erro: {error.message}</Text>}

          </Animatable.View>
    
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      alertIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
      },
      headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333333',
      },
      message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
        color: '#666666',
      },
      subMessage: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 30,
        color: '#999999',
      },
      button: {
        backgroundColor: '#4CAF50', // Mesma cor verde do botão no layout
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
    });
    