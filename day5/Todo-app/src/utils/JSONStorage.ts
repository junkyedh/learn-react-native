import AsyncStorage from "@react-native-async-storage/async-storage";

export const getJSON = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        return null;
    }
}

export const setJSON = async <T>(key: string, value: T) => {
    const jsonValue = JSON.stringify(value);
    try {
        await AsyncStorage.setItem(key, jsonValue);
        return true;
    } catch (error) {
        return false;
    }
}