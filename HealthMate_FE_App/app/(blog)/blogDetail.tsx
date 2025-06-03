import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Heart } from "lucide-react-native";
import Colors from "@/constants/colors";

const getTagStyle = (tag: string) => {
    switch (tag.toLowerCase()) {
        case "dinh dưỡng":
            return { backgroundColor: "#f3e8ff", color: "#7e22ce" };
        case "giảm cân":
            return { backgroundColor: "#dcfce7", color: "#16a34a" };
        default:
            return { backgroundColor: "#e5e7eb", color: "#374151" };
    }
};

export default function BlogDetail() {
    const router = useRouter();
    const { name = "Cách giảm cân tại nhà cấp tốc" } = useLocalSearchParams();
    const tags = ["Dinh dưỡng", "Giảm cân"];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Image Header */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=200" }}
                    style={styles.image}
                />

                {/* Back & Heart Icons */}
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.heartButton}>
                        <Heart size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoContainer}>
                {/* Tags */}
                <View style={styles.tagsContainer}>
                    {tags.map((tag, index) => (
                        <View key={index} style={[styles.tag, { backgroundColor: getTagStyle(tag).backgroundColor }]}>
                            <Text style={[styles.tagText, { color: getTagStyle(tag).color }]}>{tag}</Text>
                        </View>
                    ))}
                </View>

                {/* Title */}
                <Text style={styles.title}>{name}</Text>

                {/* Article Content */}
                <Text style={styles.sectionTitle}>Giới thiệu</Text>
                <Text style={styles.description}>
                    Giảm cân tại nhà không còn là điều khó khăn nếu bạn có kiến thức đúng và một kế hoạch hợp lý. Bài viết này sẽ
                    chia sẻ với bạn 10 cách đơn giản nhưng hiệu quả để giảm cân ngay tại nhà mà không cần đến phòng tập.
                </Text>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>1. Ăn uống khoa học</Text>
                <Text style={styles.description}>
                    Hạn chế đồ ăn nhanh, thực phẩm nhiều dầu mỡ và thay vào đó là các món hấp, luộc và rau củ. Uống đủ nước và ăn
                    đúng bữa cũng là yếu tố quan trọng.
                </Text>

                <Text style={styles.sectionTitle}>2. Tập thể dục thường xuyên</Text>
                <Text style={styles.description}>
                    Bạn không cần tập nặng, chỉ cần đi bộ 30 phút mỗi ngày, nhảy dây hoặc tập các bài cardio đơn giản ngay trong
                    phòng khách cũng đủ giúp đốt cháy calo hiệu quả.
                </Text>

                <Text style={styles.sectionTitle}>3. Ngủ đủ giấc</Text>
                <Text style={styles.description}>
                    Giấc ngủ ảnh hưởng lớn đến quá trình trao đổi chất. Thiếu ngủ khiến cơ thể mệt mỏi và dễ tăng cân hơn.
                </Text>

                <Text style={styles.sectionTitle}>4. Giảm căng thẳng</Text>
                <Text style={styles.description}>
                    Stress làm tăng hormone cortisol, khiến bạn thèm ăn và tích mỡ bụng. Hãy thử thiền, yoga hoặc đơn giản là dành
                    thời gian cho bản thân.
                </Text>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Kết luận</Text>
                <Text style={styles.description}>
                    Giảm cân tại nhà không quá khó nếu bạn duy trì được thói quen tốt mỗi ngày. Hãy bắt đầu từ những thay đổi nhỏ
                    và kiên trì để đạt được mục tiêu sức khỏe của mình.
                </Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        width: "100%",
        height: 220,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerIcons: {
        position: "absolute",
        top: 21,
        left: 13,
        right: 13,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backButton: {
        backgroundColor: "#fff",
        paddingTop: 5,
        paddingRight: 6,
        paddingBottom: 5,
        paddingLeft: 4,
        borderRadius: 20,
        elevation: 3,
    },
    heartButton: {
        backgroundColor: "#fff",
        paddingTop: 6,
        paddingRight: 5,
        paddingBottom: 4,
        paddingLeft: 5,
        borderRadius: 20,
        elevation: 3,
    },
    infoContainer: {
        padding: 20,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
        marginBottom: 15,
        marginTop: -5,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 6,
        marginBottom: 6,
    },
    tagText: {
        fontSize: 12,
        fontWeight: "500",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
        color: Colors.text,
        alignSelf: "center",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 10,
        color: Colors.text,
    },
    description: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 20,
    },
    divider: {
        height: 1,
        backgroundColor: "#e5e7eb",
        marginTop: 25,
        marginBottom: 5,
    },
    ingredientRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
    },
    ingredientName: {
        fontSize: 14,
        color: Colors.text,
    },
    ingredientQty: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
});
