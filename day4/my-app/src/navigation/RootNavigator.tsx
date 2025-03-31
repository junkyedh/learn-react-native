import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { LoginScreen } from '../screens/LoginScreen';
import { NavigatorNames } from './NavigatorNames';
import { EmployeeListScreen } from '../screens/EmployeeListScreen';
import { EmployeeDetailScreen } from '../screens/EmployeeDetailScreen';
import { Text, View, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
    [NavigatorNames.LOGIN]: undefined;
    [NavigatorNames.EMPLOYEE_LIST]: undefined;
    [NavigatorNames.EMPLOYEE_DETAIL]: { employeeId: number } | undefined;
};

export type RootNavigationProps = NativeStackNavigationProp<RootStackParamList>;

const customHeaderEmployeeList = () => {
    const navigation = useNavigation<RootNavigationProps>();

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            width: '100%',
        }}>
            <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'black',
            }}>
                Employee List
            </Text>

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 0,
                    borderRadius: 15,
                    aspectRatio: 1,
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                }}
                onPress={() => {
                    //navigate to employee detail screen with isNew = true
                    navigation.navigate(NavigatorNames.EMPLOYEE_DETAIL);
                }}
            >
                <Text style={{ color: 'white' }}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

export function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={NavigatorNames.LOGIN} component={LoginScreen} />
                <Stack.Screen name={NavigatorNames.EMPLOYEE_LIST} component={EmployeeListScreen}
                    options={{
                        headerTitle: customHeaderEmployeeList,
                    }}
                />
                <Stack.Screen name={NavigatorNames.EMPLOYEE_DETAIL} component={EmployeeDetailScreen}
                    options={{ headerBackTitle: 'Back', title: 'Employee Information' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};