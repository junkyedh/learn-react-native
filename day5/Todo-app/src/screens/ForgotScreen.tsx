import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootNavigationProps } from '../navigation/RootNavigator';
import { authApis } from '../services/apis/authApis';
import { NavigatorNames } from '../navigation/NavigatorNames';
import { getJSON, setJSON } from '../utils/JSONStorage';
import { StorageKeys } from '../common/storage_keys.constants';
import { User } from '../types/user.types';

export function ForgotScreen() {
    const navigation = useNavigation<RootNavigationProps>();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [isPassed, setIsPassed] = useState<boolean>(false);

    const handleCheck = async () => {
        const userInfo = await getJSON(StorageKeys.USER_INFO);
        if (userInfo && userInfo.username === username) {
            setError(false);
            setIsPassed(true);
        }
        else {
            setError(true);
        }
    }

    const handleReset = async () => {
        const userInfo: User = await getJSON(StorageKeys.USER_INFO);
        const newUserInfo = { ...userInfo, password };
        await setJSON<User>(StorageKeys.USER_INFO, newUserInfo);
        Alert.alert('Success', 'Password reset successfully!', [
            {
                text: 'OK',
                onPress: () => navigation.goBack(),
            },
        ]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset your password</Text>
            {!isPassed && <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                    style={[styles.input, error && { borderColor: 'red' }]}
                    value={username}
                    onChangeText={setUsername}
                />
            </View>
            }
            {
                error && <View style={styles.inputContainer}>
                    <Text style={{ color: 'red' }}>Username not exist!</Text>
                </View>
            }

            {
                isPassed && <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>New Password</Text>
                    <TextInput
                        style={[styles.input, error && { borderColor: 'red' }]}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
            }

            <TouchableOpacity style={styles.button} onPress={isPassed ? handleReset : handleCheck}>
                <Text style={styles.buttonText}>
                    {isPassed ? 'Reset Password' : 'Check username'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30
    },
    title: {
        alignSelf: 'center',
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
        color: '#2F4156',
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: '#2F4156',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
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
