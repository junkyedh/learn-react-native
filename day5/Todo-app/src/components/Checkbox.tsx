import React, { ReactNode } from "react";
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export type CheckBoxProps = {
    label: string | ReactNode;
    checked: boolean;
    style?: ViewStyle | ViewStyle[];
    onToggle: () => void;
}

export const CheckBox = ({ label, checked, onToggle, style }: CheckBoxProps) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            {
                typeof label === 'string' ? <Text>{label}</Text> : label
            }
            <TouchableOpacity
                onPress={onToggle}
                style={[styles.checkbox, checked && styles.checked]}
            >
                {checked && <FontAwesome name="check-circle" size={30} color="green" />}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 30,
        height: 30,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#2F4156',
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        borderWidth: 0
    },
});