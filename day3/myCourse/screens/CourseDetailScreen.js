import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";

const CourseDetailScreen = ({ route }) => {
    const { course } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.detailContainer}>
                <Text style={styles.title}>Chi tiết môn học</Text>
                <View style={styles.detailBox}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Mã môn học:</Text>
                        <Text style={styles.detailText}>{course.code}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Tên môn học:</Text>
                        <Text style={styles.detailText}>{course.name}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Ngày học:</Text>
                        <Text style={styles.detailText}>{course.day}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Phòng học:</Text>
                        <Text style={styles.detailText}>{course.room}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default CourseDetailScreen;