import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { API_URL } from "@env";

export default function ForgetScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");

    const handleSendCode = async () => {
        try {
            const response = await fetch(`${API_URL}/User/request-reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(email),
            });

            if (response.status === 404) {
                Alert.alert("Thông báo", "Email này chưa đăng ký tài khoản.");
            } else if (response.ok) {
                router.push({
                    pathname: "/(authentication)/code",
                    params: { email },
                });
            } else {
                Alert.alert("Lỗi", "Đã có lỗi xảy ra. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Lỗi", "Không thể kết nối đến máy chủ.");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
                <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>

            <Image source={require("@/assets/logo.png")} style={styles.logo} resizeMode="contain" />

            <Text style={styles.title}>Nhập email đã đăng ký tài khoản</Text>
            <Text style={styles.description}>
                Chúng tôi sẽ gửi mã 6 số qua email để xác nhận đặt lại mật khẩu
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nhập email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                <Text style={styles.buttonText}>Gửi mã</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    backIcon: {
        position: "absolute",
        top: 35,
        left: 24,
        zIndex: 1,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 20,
        marginTop: -100,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        padding: 12,
        marginBottom: 24,
    },
    button: {
        backgroundColor: "#72C15F",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
