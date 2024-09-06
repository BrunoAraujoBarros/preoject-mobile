import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/queries';
import * as Animatable from 'react-native-animatable';
import { DEL_USER_MUTATION } from '../../graphql/mutations';
import { TouchableOpacity } from 'react-native';
import { useMutation } from '@apollo/client';

export default function TelaInicial() {
    const [token, setToken] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const { loading, error, data, refetch } = useQuery(GET_ALL_USERS, {
        skip: !token,
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : '',
            }
        }
    });
    const [deleteUser] = useMutation(DEL_USER_MUTATION, {
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          }
        },
        onCompleted: (response) => {
          const updatedData = data.findAllUsers.filter(
            (user) => user.id !== response.deleteUser.id
          );
          setData({ findAllUsers: updatedData });
    
          Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
        },
        onError: (error) => {
          console.error('Erro ao excluir o usuário:', error);
          Alert.alert('Erro', 'Não foi possível excluir o usuário. Tente novamente mais tarde.');
        },
      });
      
      const handleDelete = (userId) => {
        deleteUser({ variables: { removeUsersId: userId } });
      };

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await SecureStore.getItemAsync('userToken');
            if (storedToken) {
                setToken(storedToken);
            } else {
                console.error('Nenhum token armazenado encontrado.');
            }
        };

        fetchToken();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (token) {
                refetch();
            }
        }, 3000); 

        return () => clearInterval(intervalId); r
    }, [token]);

    //const handleRefresh = async () => {
    //    setRefreshing(true);
    //    try {
    //        await refetch(); 
    //        console.error('Erro ao atualizar dados:', error);
    //    } finally {
    //        setRefreshing(false);
    //    }
    //};

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View style={styles.container}>
            <Animatable.Text style={styles.textTitle} animation="fadeInDown">
                Bem-vindo! - Pessoas Cadastradas
            </Animatable.Text>
            {/*<Button title="Atualizar Dados" onPress={handleRefresh} color={styles.button.backgroundColor} />*/}
            {data && data.findAllUsers && (
                <FlatList
                    data={data.findAllUsers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Animatable.View animation="fadeInLeft" style={styles.itemContainer}>
                            {item.url ? (
                                <Image
                                    source={{ uri: item.url }}
                                    style={styles.image}
                                />
                            ) : (
                                <Text style={styles.textSubtitle}>Sem imagem disponível</Text>
                            )}
                            <Text style={styles.textTitle}>Nome: {item.name}</Text>
                            <Text style={styles.textSubtitle}>Usuário ID: {item.UserId}</Text>
                            <Text style={styles.textSubtitle}>Data de Criação: {item.createdAt}</Text>
                            <Text style={styles.textSubtitle}>Data de Atualização: {item.updatedAt}</Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    )}
                    refreshing={refreshing}
                    /*onRefresh={handleRefresh}*/
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    itemContainer: {
        marginBottom: 16,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 8,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#007bff',
        resizeMode: 'cover',
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 4,
    },
    textSubtitle: {
        fontSize: 16,
        color: '#6c757d',
    },
    button: {
        backgroundColor: '#28a745', 
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: '#dc3545', 
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});