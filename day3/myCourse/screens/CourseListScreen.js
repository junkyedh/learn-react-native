import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

const courses = [
    { id: "1", code: "SE356.P21", name: "Kiến trúc phần mềm", day: "Thứ 2", room: "B5.10" },
    { id: "2", code: "SE346.P21", name: "Lập trình trên thiết bị di động", day: "Thứ 3", room: "B6.04" },
    { id: "3", code: "SE332.P22", name: "Chuyên đề CSDL nâng cao", day: "Thứ 4", room: "B3.12" },
    { id: "4", code: "IE106.P22.CNVN", name: "Thiết kế giao diện người dùng", day: "Thứ 5", room: "B6.04" },
];

const CourseListScreen = ({ navigation, route }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Xin chào, {route.params.username}</Text>
            <View style={styles.detailBox}>
                <Text style={styles.title}>Danh sách khóa học</Text>
                    <FlatList
                        data={courses}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => navigation.navigate("CourseDetail", { course: item })}
                            >
                                <Text style={styles.text}>{item.id}. {item.code}</Text>
                                <Text style={styles.text}>{item.name}</Text>
                                <Text style={styles.courseName}>{item.day} - {item.room}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
        </View>
    );
}

export default CourseListScreen;