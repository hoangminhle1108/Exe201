import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react-native";
import { useRouter } from "expo-router";

const QUESTIONS = [
    {
        question: "Làm thế nào để tôi có thể theo dõi dinh dưỡng hằng ngày?",
        answer: "Bạn có thể vào trang chủ và bấm vào mục phân tích dinh dưỡng để nhập các món ăn hôm nay bạn đã ăn để phần mềm có thể phân tích dinh dưỡng mà bạn đã tiêu thụ hôm nay.",
    },
    {
        question: "Tôi có thể quét mã vạch thực phẩm không?",
        answer: "Không, ứng dụng chúng tôi hiện tại không hỗ trợ quét mã vạch, chúng tôi sẽ xem xét phát triển trong tương lai.",
    },
    {
        question: "Biểu đồ dinh dưỡng hoạt động như thế nào?",
        answer: "Biểu đồ hiển thị các chỉ số dinh dưỡng từ thực phẩm bạn đã nhập, bao gồm chất béo, chất đạm, chất xơ, chất đường bột và calo.",
    },
    {
        question: "Tại sao biểu đồ của tôi không hiển thị?",
        answer: "Bạn cần nhập thực phẩm trong ngày để biểu đồ cập nhật dữ liệu dinh dưỡng trong ngày hôm đó.",
    },
    {
        question: "Làm sao để chỉnh sửa thực phẩm đã nhập?",
        answer: "Bạn có thể mở biểu mẫu đã điền thực phẩm đã ăn hôm nay và chỉnh trực tiếp và dữ liệu sẽ được tính toán lại, biểu mẫu được tự động xóa mỗi ngày để bạn có thể nhập vào thức ăn cho ngày khác.",
    },
    {
        question: "Làm thế nào để tìm công thức nấu ăn lành mạnh?",
        answer: "Vào mục công thức trong ứng dụng để xem các món ăn với hướng dẫn chi tiết.",
    },
    {
        question: "Tôi có thể lưu công thức yêu thích không?",
        answer: "Có, bạn chỉ cần nhấn biểu tượng trái tim ngay góc phải ở trên công thức bạn thích để lưu công thức vào danh sách yêu thích.",
    },
    {
        question: "Tôi có thể chia sẻ công thức với bạn bè không?",
        answer: "Không, hiện tại chúng tôi đang phát triển tính năng này để mỗi công thức có nút chia sẻ để bạn gửi qua mạng xã hội hoặc tin nhắn cho bạn bè người thân.",
    },
    {
        question: "Các bài viết trong ứng dụng cung cấp thông tin gì?",
        answer: "Các bài viết chia sẻ kiến thức về dinh dưỡng, lối sống lành mạnh, thói quen tốt và nhiều lời khuyên hữu ích.",
    },
    {
        question: "Làm thế nào để tương tác với chatbot AI?",
        answer: "Chọn mục trò chuyện để đặt câu hỏi về sức khỏe, gợi ý món ăn hoặc cách cải thiện chế độ ăn uống.",
    },
    {
        question: "Chatbot AI trả lời như thế nào?",
        answer: "Chatbot sử dụng trí tuệ nhân tạo để đưa ra phản hồi phù hợp theo dữ liệu sức khỏe cá nhân của bạn.",
    },
    {
        question: "Ứng dụng có theo dõi calo không?",
        answer: "Có, mỗi thực phẩm nhập vào sẽ hiển thị số calo tương ứng trong biểu đồ.",
    },
    {
        question: "Tôi có thể thiết lập mục tiêu dinh dưỡng không?",
        answer: "Không, hiện tại chúng tôi đang phát triển tính năng đặt mục tiêu lượng calo, dinh dưỡng,...",
    },
    {
        question: "Tôi bị dị ứng, ứng dụng có hỗ trợ không?",
        answer: "Bạn có thể nói trước cho AI các loại thực phẩm dị ứng để tránh các gợi ý không phù hợp.",
    },
    {
        question: "Có thể sử dụng ứng dụng khi không có mạng không?",
        answer: "Hiện tại ứng dụng chỉ sử dụng được khi có mạng.",
    },
    {
        question: "Tôi nên sử dụng HealthMate như thế nào để giảm cân?",
        answer: "Ghi lại đầy đủ thực phẩm bạn đã tiêu thụ trong ngày, theo dõi calo, đọc các bài viết về cách giảm cân và nhận tư vấn từ chatbot AI để xây dựng chế độ phù hợp.",
    },
    {
        question: "Có thể thay đổi đơn vị đo lường không?",
        answer: "Không, đơn vị đo lường dinh dưỡng trong ứng dụng chúng tôi là mặc định.",
    },
    {
        question: "Tôi gặp lỗi trong ứng dụng, làm sao để báo cáo?",
        answer: "Hãy liên lạc với chúng tôi qua email healthmate@gmail.com và trình bày chi tiết về lỗi đó, chúng tôi sẽ cố gắng trả lời sớm và khắc phục vấn đề.",
    },
    {
        question: "Khác",
        answer: "Hãy liên lạc với chúng tôi qua email healthmate@gmail.com để được nhận câu trả lời rõ ràng và sớm nhất về các vấn đề bạn đang gặp phải.",
    },
];

export default function HelpList() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => router.replace("/(tabs)/profile")}
                style={styles.backIcon}
            >
                <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Các câu hỏi thường gặp</Text>

                {QUESTIONS.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            style={styles.questionRow}
                            onPress={() => toggleAnswer(index)}
                        >
                            <Text style={styles.questionText}>{item.question}</Text>
                            {activeIndex === index ? (
                                <ChevronUp size={20} color="#999" />
                            ) : (
                                <ChevronDown size={20} color="#999" />
                            )}
                        </TouchableOpacity>
                        {activeIndex === index && (
                            <Text style={styles.answerText}>{item.answer}</Text>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        padding: 24,
        paddingTop: 65,
        paddingBottom: 120,
    },
    backIcon: {
        position: "absolute",
        top: 30,
        left: 24,
        zIndex: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    questionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    questionText: {
        fontSize: 16,
        color: "#111",
        flex: 1,
        paddingRight: 8,
    },
    answerText: {
        fontSize: 15,
        color: "#444",
        paddingVertical: 10,
        paddingLeft: 4,
        lineHeight: 20,
    },
});
