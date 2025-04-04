import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RootNavigationProps } from '../navigation/RootNavigator';
import { Todo } from '../types/todo.types';
import { StorageKeys } from '../common/storage_keys.constants';
import { getJSON } from '../utils/JSONStorage';
import { NavigatorNames } from '../navigation/NavigatorNames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export function TodoListScreen() {
    const navigation = useNavigation<RootNavigationProps>();
    const [todoList, setTodoList] = React.useState<Todo[]>([]);

    const loadTodoList = async () => {
        const todoListData = await getJSON(StorageKeys.TODO_LIST);
        if (todoListData) {
            setTodoList(todoListData);
        }
    }

    React.useEffect(() => {
        // Load todo list from storage
        loadTodoList();
    }, []);

    // Handle on navigation go back
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadTodoList();
        });

        return unsubscribe;
    }, [navigation]);

    const handlePressItem = (id: string) => {
        navigation.navigate(NavigatorNames.TODO_DETAIL, { id });
    }

    const handleToggleStatus = async (id: string) => {
        const newTodoList = todoList.map((todo) => {
            if (todo.id === id) {
                todo.isCompleted = !todo.isCompleted;
            }
            return todo;
        });

        setTodoList(newTodoList);
        await AsyncStorage.setItem(StorageKeys.TODO_LIST, JSON.stringify(newTodoList));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your items</Text>
            <FlatList
                refreshing={false}
                onRefresh={() => {
                    loadTodoList();
                }}
                style={{ width: '100%' }}
                data={todoList}
                keyExtractor={(item) => item.id || Math.random().toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.todoItem} onPress={() => { }}>
                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.col, styles.center]} onPress={() => handleToggleStatus(item.id)}>
                                <View style={[styles.todoItemStatus, item.isCompleted && styles.todoItemStatusCompleted]}>
                                    {item.isCompleted && <FontAwesome name="check" size={20} color="white" />}
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.col, styles.gap1, { flex: 1 }]}>
                                <View>
                                    <View style={styles.row}>
                                        <View style={[styles.col, styles.gap1]}>
                                            <View>
                                                <Text style={styles.todoItemTitle}>{item.title}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.todoItemDescription}>{item.description}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.todoItemStatusText}>{item.isCompleted ? 'Completed' : 'In Progress'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={[styles.col, styles.center, { paddingHorizontal: 10 }]} onPress={() => handlePressItem(item.id)}>
                                <FontAwesome name="chevron-right" size={24} color="#2F4156" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // paddingTop: 20
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        flexDirection: 'column',
    },
    justifyStart: {
        justifyContent: 'flex-start',
    },
    alignStart: {
        alignItems: 'flex-start',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    alignCenter: {
        alignItems: 'center',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gap1: {
        marginHorizontal: 10,
    },
    title: {
        fontSize: 24,
        marginVertical: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2F4156',
        alignSelf: 'center',
        marginTop: 15,
    },
    subtitle: {
        fontSize: 16,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    buttonLogin: {
        backgroundColor: '#000',
        width: '100%',
        textAlign: 'center',
        paddingVertical: 10,
        borderRadius: 5,
    },
    required: {
        color: 'red',
    },

    // Todo

    todoItem: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    todoItemStatus: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        borderColor: 'gray',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    todoItemStatusCompleted: {
        borderColor: 'green',
        backgroundColor: 'green',
    },
    todoItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    todoItemDescription: {
        fontSize: 14,
    },
    todoItemStatusText: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    },

});
