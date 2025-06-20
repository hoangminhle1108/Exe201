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
import { useRouter, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Eye, EyeOff } from "lucide-react-native";
import { API_URL } from "@env";

export default function NewPassword() {
    const router = useRouter();
    const { email } = useLocalSearchParams();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleNewPassword = async () => {
        if (password.length < 6) {
            Alert.alert("Thông báo", "Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/User/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    newPassword: password,
                }),
            });

            if (response.ok) {
                Alert.alert("Thành công", "Mật khẩu đã được cập nhật.");
                router.push("/(authentication)/login");
            } else {
                Alert.alert("Lỗi", "Không thể cập nhật mật khẩu. Vui lòng thử lại.");
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

            <Image
                source={require("@/assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Nhập mật khẩu mới</Text>
            <Text style={styles.description}>
                Nên sử dụng mật khẩu mạnh gồm 6 ký tự gồm chữ và số
            </Text>

            <View style={{ position: "relative" }}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: 12, top: 14 }}
                >
                    {showPassword ? (
                        <EyeOff size={20} color="#666" />
                    ) : (
                        <Eye size={20} color="#666" />
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleNewPassword}>
                <Text style={styles.buttonText}>Xác nhận mật khẩu mới</Text>
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
