import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function DeleteScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Đã xóa tài khoản</Text>
                <Text style={styles.heading}>Cảm ơn bạn đã sử dụng ứng dụng!</Text>

                <Text style={styles.text}>
                    Chúng tôi rất tiếc khi thấy bạn rời đi, nhưng chúng tôi hoàn toàn tôn trọng quyết định cá nhân của bạn. Yêu cầu xóa tài khoản của bạn đã được xử lý thành công và tài khoản của bạn hiện đã bị vô hiệu hóa vĩnh viễn khỏi hệ thống. Tất cả thông tin cá nhân, dữ liệu đã lưu, lịch sử hoạt động và các tương tác trước đó đều đã được xóa bỏ một cách an toàn.
                </Text>

                <Text style={styles.text}>
                    Nếu một ngày nào đó bạn quyết định quay lại, chúng tôi sẽ luôn sẵn sàng chào đón bạn. Ứng dụng sẽ liên tục được cải tiến với những tính năng mới, giao diện thân thiện hơn và trải nghiệm mượt mà hơn để phục vụ bạn tốt hơn nữa.
                </Text>

                <Text style={styles.text}>
                    Một lần nữa, xin cảm ơn bạn vì đã là một phần của cộng đồng chúng tôi. Chúc bạn luôn mạnh khỏe, hạnh phúc và thành công trên hành trình sắp tới.
                </Text>

            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.doneButton} onPress={() => router.replace("/(authentication)/login")}>
                    <Text style={styles.doneButtonText}>Hoàn thành</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 24,
    },
    heading: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 12,
    },
    text: {
        fontSize: 14,
        color: "#444",
        marginBottom: 12,
    },
    buttonContainer: {
        paddingBottom: 24,
    },
    doneButton: {
        backgroundColor: "#72C15F",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    doneButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
