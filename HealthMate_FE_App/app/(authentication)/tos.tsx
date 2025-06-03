import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function TermsOfService() {
    const router = useRouter();

    return (
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.mainTitle}>Điều khoản dịch vụ & Chính sách bảo mật</Text>
                <Text style={styles.subTitle}>(Cập nhật lần cuối 03/06/2025)</Text>

                {sections.map((section, index) => (
                    <View key={index}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <Text style={styles.paragraph}>{section.content}</Text>
                        <View style={styles.divider} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const sections = [
    {
        title: "1. Giới thiệu",
        content:
            "Chào mừng bạn đến với HealthMate – ứng dụng theo dõi sức khỏe. Bằng việc sử dụng ứng dụng, bạn đồng ý với các điều khoản dưới đây.",
    },
    {
        title: "2. Mục đích sử dụng",
        content:
            "HealthMate giúp người dùng theo dõi chỉ số sức khỏe, nhận lời khuyên từ trí tuệ nhân tạo (AI), gợi ý món ăn lành mạnh, truy cập các bài viết về sức khỏe và có thể nâng cao trải nghiệm qua việc sử dụng các gói Premium.",
    },
    {
        title: "3. Đối tượng sử dụng",
        content:
            "Người dùng từ 13 tuổi trở lên được phép sử dụng ứng dụng. Trẻ nhỏ nên có sự giám sát từ người lớn hoặc chuyên gia y tế.",
    },
    {
        title: "4. Trí tuệ nhân tạo (AI)",
        content:
            "HealthMate sử dụng AI để đưa ra lời khuyên về sức khỏe. Tuy nhiên, AI không thay thế chuyên gia y tế. Người dùng nên tham khảo bác sĩ khi có vấn đề sức khỏe nghiêm trọng.",
    },
    {
        title: "5. Tính năng đề xuất món ăn",
        content:
            "Hệ thống có thể gợi ý công thức món ăn lành mạnh dựa trên mục tiêu cá nhân. Người dùng nên cân nhắc dị ứng hoặc chế độ ăn kiêng riêng.",
    },
    {
        title: "6. Gói Premium",
        content:
            "Gói Premium cung cấp AI thông minh hơn, phân tích dữ liệu sâu hơn, và khả năng tương tác cao hơn. Giao dịch thanh toán sẽ được xử lý qua hệ thống bảo mật.",
    },
    {
        title: "7. Bài viết & Công thức nấu ăn",
        content:
            "HealthMate cung cấp bài viết và công thức món ăn miễn phí cho người dùng. Nội dung được kiểm duyệt, tuy nhiên bạn cần tự đánh giá mức độ phù hợp với cá nhân.",
    },
    {
        title: "8. Quyền riêng tư",
        content:
            "HealthMate cam kết bảo mật dữ liệu người dùng. Thông tin cá nhân chỉ được sử dụng nhằm mục đích cải thiện trải nghiệm và sẽ không chia sẻ với bên thứ ba nếu không có sự đồng ý.",
    },
    {
        title: "9. Giới hạn trách nhiệm",
        content:
            "HealthMate không chịu trách nhiệm cho các thiệt hại do sử dụng sai mục đích hoặc vi phạm điều khoản. Mọi thông tin đưa ra chỉ mang tính hỗ trợ.",
    },
    {
        title: "10. Thay đổi điều khoản",
        content:
            "HealthMate có quyền cập nhật điều khoản bất cứ lúc nào. Người dùng sẽ được thông báo khi có thay đổi lớn. Việc tiếp tục sử dụng ứng dụng đồng nghĩa với việc bạn đồng ý với các cập nhật này.",
    },
    {
        title: "11. Liên hệ",
        content:
            "Nếu có thắc mắc về điều khoản, bạn có thể liên hệ chúng tôi qua email: healthmateapp@gmail.com",
    },
];

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    backIcon: {
        marginBottom: 15,
    },
    mainTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 5,
        color: "#000",
    },
    subTitle: {
        fontSize: 14,
        color: "#444",
        alignSelf: "center",
        marginBottom: 35,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
        color: "#222",
    },
    paragraph: {
        fontSize: 14,
        color: "#444",
        marginBottom: 12,
        lineHeight: 20,
    },
    divider: {
        height: 1,
        backgroundColor: "#ddd",
        marginTop: 5,
        marginBottom: 15,
    },
});
