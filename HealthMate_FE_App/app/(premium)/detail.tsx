import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { ChevronLeft } from "lucide-react-native";
import Colors from "@/constants/colors";
import { Laptop2, Banknote, Calendar, Check } from "lucide-react-native";
import { API_URL } from "@env";

type PremiumPackage = {
    packageId: number;
    packageName: string;
    description: string;
    price: number;
    durationDays: number;
    activeSubscribers: number;
};

export default function Detail() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [pkg, setPkg] = useState<PremiumPackage | null>(null);

    useEffect(() => {
        const fetchPackageDetail = async () => {
            try {
                const response = await fetch(`${API_URL}/PremiumPackage/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setPkg(data);
                } else {
                    console.error("Không thể lấy chi tiết gói:", data);
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        if (id) {
            fetchPackageDetail();
        }
    }, [id]);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.push("/(premium)/list")}>
                    <ChevronLeft size={24} color={Colors.text} />
                </TouchableOpacity>

                <Image
                    source={require("@/assets/logo.png")}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.title}>{pkg?.packageName || "Gói trả phí"}</Text>
                <Text style={styles.subtitle}>Tận hưởng các tính năng độc quyền và mới nhất</Text>

                <View style={styles.features}>
                    <View style={styles.featureRow}>
                        <Banknote size={18} color="black" style={styles.icon} />
                        <Text style={styles.featureText}>
                            Giá: {pkg ? `${pkg.price.toLocaleString()} VND` : "49.000 VND"}
                        </Text>
                    </View>
                    <View style={styles.featureRow}>
                        <Calendar size={18} color="black" style={styles.icon} />
                        <Text style={styles.featureText}>
                            Hiệu lực: {pkg ? `${pkg.durationDays} ngày` : "30 ngày"} sau khi thanh toán thành công
                        </Text>
                    </View>
                </View>

                <Text style={styles.includedTitle}>Gói này bao gồm:</Text>

                <View style={styles.benefits}>
                    {[
                        "AI thông minh hơn",
                        "AI được cá nhân hóa phù hợp hơn cho người dùng",
                        pkg?.description,
                    ].map((benefit, index) => (
                        <View key={index} style={styles.benefitRow}>
                            <Check size={18} color="#72C15F" style={styles.icon} />
                            <Text style={styles.benefitText}>{benefit}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/(premium)/success")}>
                <Text style={styles.buttonText}>Tiến hành thanh toán</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        padding: 20,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    backBtn: {
        marginBottom: 20,
    },
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
    features: {
        marginBottom: 20,
    },
    featureRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    featureText: {
        fontSize: 14,
    },
    includedTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    benefits: {
        marginBottom: 30,
    },
    benefitRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    benefitText: {
        fontSize: 14,
    },
    button: {
        backgroundColor: "#72C15F",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        position: "absolute",
        left: 20,
        right: 20,
        bottom: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
