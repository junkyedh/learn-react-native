import AntDesign from '@expo/vector-icons/AntDesign';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TodoDetailScreen } from '../screens/TodoDetail';
import { TodoListScreen } from '../screens/TodoList';
import { NavigatorNames } from './NavigatorNames';
import { LoginScreen } from '../screens/LoginScreen';
import { ForgotScreen } from '../screens/ForgotScreen';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
    [NavigatorNames.LOGIN]: undefined;
    [NavigatorNames.FORGOT_PASSWORD]: undefined;
    [NavigatorNames.TODO_LIST]: undefined;
    [NavigatorNames.TODO_DETAIL]: { id?: string } | undefined;
};

export type RootNavigationProps = NativeStackNavigationProp<RootStackParamList>;
export const navigationRef = createNavigationContainerRef<RootNavigationProps>();

function navigate(name: any, params?: any) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

function reset(name: any, params?: any) {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            index: 0,
            routes: [{ name, params }]
        });
    }
}

export function RootNavigator() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen
                    name={NavigatorNames.LOGIN}
                    component={LoginScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name={NavigatorNames.FORGOT_PASSWORD}
                    component={ForgotScreen}
                    options={{
                        title: 'Forgot Password',
                        headerTitleAlign: 'center'
                    }}
                />
                <Stack.Screen
                    name={NavigatorNames.TODO_LIST}
                    component={TodoListScreen}
                    options={{
                        title: 'Todo List',
                        headerTitleAlign: 'center',
                        headerRight: () => {
                            return (
                                <TouchableOpacity onPress={() => navigate(NavigatorNames.TODO_DETAIL)}>
                                    <AntDesign name="pluscircle" size={24} color="#2F4156" />
                                </TouchableOpacity>
                            )
                        },
                        headerLeft: () => {
                            return (
                                <TouchableOpacity
                                    style={[styles.row, styles.center, styles.gap1]}
                                    onPress={() => reset(NavigatorNames.LOGIN)}
                                >
                                    <AntDesign name="logout" size={20} color="#2F4156" />
                                </TouchableOpacity>
                            )
                        }
                    }}
                />
                <Stack.Screen
                    name={NavigatorNames.TODO_DETAIL}
                    component={TodoDetailScreen}
                    options={{
                        title: 'Todo Detail',
                        headerTitleAlign: 'center',
                        headerTintColor: '#2F4156',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    center: {
        alignItems: 'center',
    },
    gap1: {
        gap: 10,
    }
});