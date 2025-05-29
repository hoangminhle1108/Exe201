import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import Colors from "@/constants/colors";

const packages = [
    {
        id: "1",
        name: "Gói tháng (Tiêu chuẩn)",
        price: "49.000 VND/tháng",
        description: "Mở khóa các tính năng nâng cao",
        recommended: true,
    },
    {
        id: "2",
        name: "Gói năm (Cao cấp)",
        price: "419.000 VND/năm",
        description: "Có được trải nghiệm tốt nhất với giá thành hợp lý",
    },
    {
        id: "3",
        name: "Gói dùng thử miễn phí (7 ngày)",
        price: "Miễn phí",
        description: "Được sử dụng các tính năng cao tạm thời",
    },
];

export default function List() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState("1");

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.replace("/(tabs)/home")}>
                <ChevronLeft size={24} color={Colors.text} />
            </TouchableOpacity>

            <Image
                source={require("@/assets/logo.png")}
                style={styles.image}
                resizeMode="contain"
            />

            <Text style={styles.title}>Các gói trả phí</Text>
            <Text style={styles.subtitle}>Tận hưởng các tính năng độc quyền và mới nhất</Text>

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {packages.map((item) => {
                    const selected = selectedId === item.id;
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.card,
                                selected && styles.cardSelected,
                            ]}
                            onPress={() => setSelectedId(item.id)}
                        >
                            <View style={{ flex: 1 }}>
                                <Text style={styles.packageName}>{item.name}</Text>
                                <Text style={styles.packagePrice}>{item.price}</Text>
                                <Text style={styles.packageDesc}>{item.description}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailText}>Chi tiết</Text>
                                <ChevronRight size={16} color="gray" />
                            </View>
                            {item.recommended && <Text style={styles.recommended}>Gợi ý</Text>}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/(premium)/detail")}
            >
                <Text style={styles.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    backBtn: { marginBottom: 20 },
    image: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        color: "gray",
        marginBottom: 20,
    },
    card: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        backgroundColor: "#fff",
        position: "relative",
        height: 140
    },
    cardSelected: {
        borderColor: "#72C15F",
        backgroundColor: "#EBFBE6",
    },
    packageName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    packagePrice: {
        fontSize: 14,
        color: "#000",
        marginBottom: 4,
    },
    packageDesc: {
        fontSize: 13,
        color: "gray",
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    detailText: {
        fontSize: 13,
        color: "gray",
        marginRight: 4,
    },
    recommended: {
        position: "absolute",
        right: 16,
        top: 16,
        fontSize: 12,
        backgroundColor: "#72C15F",
        color: "white",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        overflow: "hidden",
    },
    button: {
        backgroundColor: "#72C15F",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
