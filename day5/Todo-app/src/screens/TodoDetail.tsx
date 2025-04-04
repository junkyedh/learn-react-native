import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import { RootNavigationProps } from '../navigation/RootNavigator';
import { CheckBox } from '../components/Checkbox';
import { getJSON, setJSON } from '../utils/JSONStorage';
import { StorageKeys } from '../common/storage_keys.constants';
import { Todo } from '../types/todo.types';
import { generateRandomString } from '../utils/string';

export function TodoDetailScreen() {
    const navigation = useNavigation<RootNavigationProps>();
    const todoId = navigation.getState().routes[navigation.getState().index].params?.id;
    const isNew = !todoId || todoId === undefined || todoId === null;

    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [completed, setCompleted] = React.useState<boolean>(false);

    const handleUpdate = async (data: Todo) => {
        const currentData: Todo[] = await getJSON(StorageKeys.TODO_LIST) || [];
        const newData = currentData.map((item) => {
            if (item.id === data.id) {
                return data;
            }
            return item;
        });
        await setJSON<Todo[]>(StorageKeys.TODO_LIST, newData);
        Alert.alert('Success', 'Todo item updated successfully!', [
            {
                text: 'OK',
                onPress: () => navigation.goBack(),
            },
        ]);
    }

    const handleSave = async () => {
        const data: Todo = {
            id: isNew ? generateRandomString(16) : (todoId || generateRandomString(16)),
            title,
            description,
            isCompleted: completed,
        };

        if (!isNew) {
            handleUpdate(data);
            return;
        }

        const currentData: Todo[] = await getJSON(StorageKeys.TODO_LIST) || [];
        const newData = [...currentData, data];
        await setJSON<Todo[]>(StorageKeys.TODO_LIST, newData);
        Alert.alert('Success', 'Todo item created successfully!', [
            {
                text: 'OK',
                onPress: () => navigation.goBack(),
            },
        ]);
    }

    const handleDelete = async (id: string) => {
        const currentData: Todo[] = await getJSON(StorageKeys.TODO_LIST) || [];
        const newData = currentData.filter((item) => item.id !== id);
        await setJSON<Todo[]>(StorageKeys.TODO_LIST, newData);
        Alert.alert('Success', 'Todo item deleted successfully!', [
            {
                text: 'OK',
                onPress: () => navigation.goBack(),
            },
        ]);
    }


    useEffect(() => {
        if (!isNew) {
            const loadTodo = async () => {
                const todoListData: Todo[] = await getJSON(StorageKeys.TODO_LIST);
                if (todoListData) {
                    const todo = todoListData.find((item) => item.id === todoId);
                    if (todo) {
                        setTitle(todo.title);
                        setDescription(todo.description || '');
                        setCompleted(todo.isCompleted);
                    }
                }
            }
            loadTodo();
        }
    }, [isNew]);

    return (
        <View style={styles.container}>
            <View
                style={[{ height: 10 }]}
            />

            <View
                style={[styles.inputContainer]}
            >
                <Text style={[styles.title]}>
                    Detail
                </Text>
                <Text style={[styles.subtitle]}>Here are some detail about your to-do item.</Text>
            </View>

            <View
                style={[{ height: 10 }]}
            />

            <View
                style={[styles.inputContainer]}
            >
                <Text style={[styles.inputLabel]}>
                    Title <Text style={[styles.required]}>*</Text>
                </Text>
                <TextInput
                    editable={isNew}
                    style={[styles.input, !isNew && { backgroundColor: '#f0f0f0' }]}
                    placeholder='Title of the todo item...'
                    value={title}
                    onChangeText={setTitle}
                />
            </View>

            <View
                style={[styles.inputContainer]}
            >
                <Text style={[styles.inputLabel]}>
                    Description
                </Text>
                <TextInput
                    editable={isNew}
                    style={[styles.input, {
                        height: 150,
                    }, !isNew && { backgroundColor: '#f0f0f0' }]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder='The full description of the todo item...'
                    numberOfLines={4}
                    multiline
                />
            </View>

            <View
                style={[styles.inputContainer]}
            >
                <CheckBox
                    checked={completed}
                    label={
                        <Text style={[styles.inputLabel, { marginRight: 10, marginBottom: 0 }]}>
                            Is Completed?
                        </Text>
                    }
                    onToggle={() => setCompleted(!completed)}
                />
            </View>

            <View
                style={[styles.inputContainer]}
            >
                <TouchableOpacity
                    style={[styles.buttonLogin]}
                    onPress={handleSave}
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                        {isNew ? 'Create' : 'Save'}
                    </Text>
                </TouchableOpacity>

                {
                    !isNew && (
                        <TouchableOpacity
                            style={[styles.buttonLogin, {
                                backgroundColor: 'red',
                                marginTop: 10,
                            }]}
                            onPress={() => handleDelete(todoId)}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2F4156',
        alignSelf: 'center',
        marginTop: 15,

    },
    subtitle: {
        fontSize: 16,
        color: '#2F4156',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#2F4156',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    buttonLogin: {
        backgroundColor: '#2F4156',
        width: '100%',
        textAlign: 'center',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    required: {
        color: 'red',
    }
});
