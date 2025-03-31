import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image } from 'expo-image';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { RootNavigationProps } from '../navigation/RootNavigator';
import { Employee } from '../types/employee.types';
import { employeeApis, EmployeeDataRequest } from '../services/apis/employeeApis';
import { NavigatorNames } from '../navigation/NavigatorNames';

export function EmployeeDetailScreen() {
    const navigation = useNavigation<RootNavigationProps>();
    const employeeId = navigation.getState().routes[navigation.getState().index].params?.employeeId;
    const isNew = employeeId === undefined || employeeId === null;
    const [employee, setEmployee] = React.useState<Employee | null>(null);
    const [name, setName] = React.useState<string>('');
    const [age, setAge] = React.useState<string>('');
    const [salary, setSalary] = React.useState<string>('');

    const fetchEmployee = async () => {
        if (!employeeId) {
            return;
        }

        const res = await employeeApis.getEmployeeById(employeeId);
        if (res) {
            setEmployee(res);
        }
    }

    useEffect(() => {
        fetchEmployee();
    }, []);

    useEffect(() => {
        if (employee) {
            setName(employee.employee_name);
            setAge(employee.employee_age.toString());
            setSalary(employee.employee_salary.toString());
        }
    }, [employee]);

    const handleCreate = async (data: EmployeeDataRequest) => {
        const res = await employeeApis.createEmployee(data);
        if (res) {
            setEmployee(res);
            Alert.alert('Success', 'Employee created successfully!');
            navigation.replace(NavigatorNames.EMPLOYEE_DETAIL, { employeeId: res.id });
            return;
        }
        Alert.alert('Error', 'Failed to create employee!');
    }

    const handleSave = async () => {
        const data = {
            employee_name: name,
            employee_age: parseInt(age),
            employee_salary: parseInt(salary),
            profile_image: employee?.profile_image || 'https://i.pinimg.com/736x/3d/cd/4a/3dcd4af5bc9e06d36305984730ab7888.jpg',
        }

        if (isNew) {
            await handleCreate(data);
            return;
        }

        if (!employeeId) {
            return;
        }

        const res = await employeeApis.updateEmployee(employeeId, data);
        if (res) {
            setEmployee(res);
            Alert.alert('Success', 'Employee updated successfully!');
        }
    }

    const handleDelete = async () => {
        if (!employeeId) {
            return;
        }

        const res = await employeeApis.deleteEmployee(employeeId);
        if (res) {
            Alert.alert('Success', 'Employee deleted successfully!');
            navigation.replace(NavigatorNames.EMPLOYEE_LIST);
            return;
        }
        Alert.alert('Error', 'Failed to delete employee!');
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2F4156' }}>
                {isNew ? 'Add new employee' : 'Employee Detail'}</Text>
            {
                !isNew && <Image
                    source={employee?.profile_image}
                    style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20, borderWidth: .3 }}
                />
            }

            <View style={[styles.row, styles.inputGroup, styles.justifyContent]}>
                <Text style={[styles.inputLabel, { flex: 1 }]}>Name</Text>
                <TextInput
                    style={[styles.input, { flex: 3 }]}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    editable={true}
                />
            </View>

            <View style={[styles.row, styles.inputGroup, styles.justifyContent]}>
                <Text style={[styles.inputLabel, { flex: 1 }]}>Age</Text>
                <TextInput
                    style={[styles.input, { flex: 3 }]}
                    value={age}
                    keyboardType='numeric'
                    onChangeText={(text) => setAge(text)}
                    editable={true}
                />
            </View>


            <View style={[styles.row, styles.inputGroup, styles.justifyContent]}>
                <Text style={[styles.inputLabel, { flex: 1 }]}>Salary</Text>
                <TextInput
                    style={[styles.input, { flex: 3 }]}
                    keyboardType='numeric'
                    value={salary}
                    onChangeText={(text) => setSalary(text)}
                    editable={true}
                />
            </View>

            <View style={[styles.col, styles.inputGroup, { marginTop: 20 }]}>
                <TouchableOpacity
                    style={[styles.card, styles.center, { width: '100%', padding: 10, backgroundColor: '#2F4156' }]}
                    onPress={handleSave}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
                        {isNew ? 'Create' : 'Save'}</Text>
                </TouchableOpacity>

                {
                    !isNew && <TouchableOpacity
                        style={[styles.card, styles.center, { width: '100%', padding: 10, backgroundColor: 'red' }]}
                        onPress={handleDelete}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Delete</Text>
                    </TouchableOpacity>
                }
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    flex: {
        flex: 1,
    },
    col: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    justifyContent: {
        justifyContent: 'space-between',
    },
    alignItems: {
        alignItems: 'center',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gap1: {
        gap: 5,
    },
    gap3: {
        gap: 10,
    },
    card: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 20,
    },
    inputGroup: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '2F4156',
        padding: 5,
        paddingVertical: 10,
    },
});
