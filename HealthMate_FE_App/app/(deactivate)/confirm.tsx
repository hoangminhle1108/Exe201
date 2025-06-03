import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function ConfirmDeleteScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => router.replace("/(tabs)/profile")}>
                <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Xóa tài khoản</Text>

                <Text style={styles.heading}>Bạn có chắc chắn muốn xóa tài khoản này không?</Text>

                <Text style={styles.text}>
                    Việc xóa tài khoản là hành động vĩnh viễn và không thể khôi phục. Tất cả dữ liệu cá nhân của bạn, bao gồm thông tin hồ sơ, lịch sử hoạt động, các mục đã lưu và những nội dung bạn đã chia sẻ trong ứng dụng, sẽ bị xóa hoàn toàn khỏi hệ thống của chúng tôi.
                </Text>
                <Text style={styles.text}>
                    Chúng tôi hiểu rằng có thể bạn đã suy nghĩ rất kỹ trước khi đưa ra quyết định này. Tuy nhiên, trước khi tiếp tục, hãy cân nhắc rằng việc rời đi đồng nghĩa với việc bạn sẽ không thể truy cập các tính năng, dịch vụ hay các bản cập nhật mới mà chúng tôi đang không ngừng phát triển.
                </Text>
                <Text style={styles.text}>
                    Nếu bạn gặp bất kỳ vấn đề nào với trải nghiệm người dùng, đừng ngần ngại liên hệ với chúng tôi – đội ngũ hỗ trợ luôn sẵn sàng lắng nghe và giúp bạn giải quyết. Chúng tôi thực sự mong muốn mang đến trải nghiệm tốt hơn cho tất cả người dùng.
                </Text>
                <Text style={styles.text}>
                    Nếu bạn vẫn quyết định tiếp tục, một email khảo sát sẽ được gửi đến địa chỉ bạn đã đăng ký. Mọi ý kiến đóng góp của bạn là vô cùng quý giá để giúp chúng tôi cải thiện và phát triển ứng dụng tốt hơn trong tương lai.
                </Text>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={() => router.push("/(deactivate)/delete")}>
                    <Text style={styles.deleteButtonText}>Xác nhận xóa tài khoản</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => router.replace("/(tabs)/profile")}>
                    <Text style={styles.cancelButtonText}>Trở về</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 35,
        paddingHorizontal: 24,
    },
    backIcon: {
        position: "absolute",
        top: 35,
        left: 24,
        zIndex: 1,
    },
    scrollContent: {
        paddingTop: 40,
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
    deleteButton: {
        backgroundColor: "#72C15F",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    deleteButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: "#f5f5f5",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 12,
    },
    cancelButtonText: {
        fontSize: 16,
        color: "#444",
    },
});
