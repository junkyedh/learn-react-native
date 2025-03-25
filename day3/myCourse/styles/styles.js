import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F8F9FA",
    },
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F8F9FA",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#2F4156",
    },

    tableContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        overflow: "hidden",
      },
      tableHeader: {
        flexDirection: "row",
        backgroundColor: "#2F4156",
        paddingVertical: 10,
      },
      tableHeaderText: {
        flex: 1,
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
      },
      detailBox: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
      },

    detailItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
      },
      detailLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
      },
      detailText: {
        fontSize: 16,
        color: "#555",
        textAlign: "right",
      },
    label: {
        alignSelf: "flex-start",
        marginBottom: 5,
        marginLeft: 40,
        fontSize: 16,
        fontWeight: "bold",
        color: "#2F4156",
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
    errorText: {
        color: "red",
        marginBottom: 10,
    },
    button: {
        width: "80%",
        height: 50,
        backgroundColor: "#2F4156",
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
        marginBottom: 10,
        color: "#2F4156",
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    text : {
        fontSize: 16,
        fontWeight: "bold",
    },
    subText: {
        color: "gray",
        fontSize: 14,
    },
    detail: {
        fontSize: 18,
        marginBottom: 5,
    },
    courseName: {
        fontSize: 15,
        color: "#333",
    },
});

export default styles;