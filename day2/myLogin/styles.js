import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        alignSelf: "flex-start",
        marginBottom: 5,
        marginLeft: 40,
        fontSize: 16,
        fontWeight: "bold",
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
    button: {
        width: "80%",
        height: 50,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default styles;