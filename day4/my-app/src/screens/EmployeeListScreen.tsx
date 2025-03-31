import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    FlatList, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import { RootNavigationProps } from '../navigation/RootNavigator';
import { Employee } from '../types/employee.types';
import { employeeApis } from '../services/apis/employeeApis';
import { NavigatorNames } from '../navigation/NavigatorNames';

export function EmployeeListScreen() {
    const navigation = useNavigation<RootNavigationProps>();
    const [employees, setEmployees] = React.useState<Employee[]>([]);
    const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

    const fetchEmployees = async () => {
        setIsRefreshing(true);
        const res = await employeeApis.getEmployeeList();
        if (res) {
            setEmployees(res);
        }

        // Fake loading for 1 second
        // This is just for demo purpose, remove this in production code
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
        return;
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handlePressEmployee = (id: number) => {
        navigation.navigate(NavigatorNames.EMPLOYEE_DETAIL, { employeeId: id });
        fetchEmployees();
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={employees}
                refreshing={isRefreshing}
                onRefresh={fetchEmployees}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => handlePressEmployee(item.id)} style={[styles.row, styles.gap3, styles.card]}>
                        <Text style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: '#2F4156',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: 'white',
                            lineHeight: 40,
                            fontSize: 13,
                            fontWeight: 'bold',
                        }}>
                            {index + 1}
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2F4156' }}>{item.employee_name}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text> No employees found</Text >}
                contentContainerStyle={{ marginTop: 20, marginHorizontal: 30 }}
                showsVerticalScrollIndicator={false}
                style={{ width: '100%' }}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8F9FA",
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
    }
});
