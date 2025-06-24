import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { ChevronLeft } from "lucide-react-native";
import Colors from "@/constants/colors";
import { Banknote, Calendar, Check } from "lucide-react-native";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    const handleProceed = async () => {
        try {
            const email = await AsyncStorage.getItem("email");
            const token = await AsyncStorage.getItem("token");

            if (!email || !token) {
                Alert.alert("Lỗi", "Chưa đăng nhập. Vui lòng đăng nhập lại.");
                return;
            }

            if (!pkg?.packageId) {
                Alert.alert("Lỗi", "Không thể lấy thông tin gói.");
                return;
            }

            const userRes = await fetch(`${API_URL}/User/all_user_by_email/${email}`);
            const userData = await userRes.json();
            if (!userRes.ok || userData.length === 0) {
                Alert.alert("Lỗi", "Không thể lấy thông tin người dùng.");
                return;
            }
            const user = userData[0];

            const response = await fetch(`${API_URL}/Transaction/create_transaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email, packageId: pkg.packageId }),
            });

            const data = await response.json();
            if (response.ok) {
                const transactionId = data.transactionId;
                router.push(`/(premium)/qr?transactionId=${transactionId}&userId=${user.userId}`);
            } else {
                Alert.alert("Lỗi", data.message || "Không thể tạo transaction.");
            }
        } catch (error) {
            console.error("Error:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xử lý thanh toán.");
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.push("/(premium)/list")}>
                    <ChevronLeft size={24} color={Colors.text} />
                </TouchableOpacity>

                <Image
                    source={require("@/assets/logo.png")}
                    style={styles.image}
                    contentFit="contain"
                />

                <Text style={styles.title}>{pkg?.packageName || "Gói trả phí"}</Text>
                <Text style={styles.subtitle}>Tận hưởng các tính năng độc quyền và mới nhất</Text>

                <View style={styles.features}>
                    <View style={styles.featureRow}>
                        <Banknote size={18} color="black" style={styles.icon} />
                        <Text style={styles.featureText}>Giá: {pkg ? `${pkg.price.toLocaleString()} VND` : "49.000 VND"}</Text>
                    </View>
                    <View style={styles.featureRow}>
                        <Calendar size={18} color="black" style={styles.icon} />
                        <Text style={styles.featureText}>Hiệu lực: {pkg ? `${pkg.durationDays} ngày` : "30 ngày"} sau khi thanh toán thành công</Text>
                    </View>
                </View>

                <Text style={styles.includedTitle}>Gói này bao gồm:</Text>
                <View style={styles.benefits}>
                    {["AI được cá nhân hóa phù hợp hơn cho người dùng", pkg?.description].map((benefit, index) => (
                        <View key={index} style={styles.benefitRow}>
                            <Check size={18} color="#72C15F" style={styles.icon} />
                            <Text style={styles.benefitText}>{benefit}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={handleProceed}>
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
