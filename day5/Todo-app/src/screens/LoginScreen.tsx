import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootNavigationProps } from '../navigation/RootNavigator';
import { authApis } from '../services/apis/authApis';
import { NavigatorNames } from '../navigation/NavigatorNames';

export function LoginScreen() {
    const navigation = useNavigation<RootNavigationProps>();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const handleLogin = async () => {
        const response = await authApis.login(username, password);
        if (response) {
            setError(false);
            navigation.replace(NavigatorNames.TODO_LIST);
        }
        else {
            setError(true);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder='Enter your username'
                value={username}
                onChangeText={(text) => {
                    setUsername(text);
                    setError(false);
                }}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder='Enter your password'
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    setError(false);
                }}
            />
            {
                error && <Text style={styles.errorText}>Invalid username or password</Text>
            }
            <View style={[styles.inputContainer, { flexDirection: 'row', gap: 3}]}>
                <TouchableOpacity onPress={() => navigation.navigate(NavigatorNames.FORGOT_PASSWORD)}>
                    <Text style={{ color: 'blue' }}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#2F4156",
    },
    label: {
        alignSelf: "flex-start",
        marginBottom: 5,
        marginLeft: 40,
        fontSize: 18,
        fontWeight: "bold",
        color: "#2F4156",
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
        justifyContent: "flex-end",
    },
    input: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
    },
    inputError: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
    button: {
        width: "80%",
        height: 50,
        backgroundColor: "#2F4156",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
