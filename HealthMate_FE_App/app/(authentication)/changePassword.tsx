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
import { ChevronLeft, Eye, EyeOff } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export default function ChangePassword() {
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert("Thông báo", "Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }

        try {
            const email = await AsyncStorage.getItem("email");
            if (!email) {
                Alert.alert("Lỗi", "Không tìm thấy thông tin email.");
                return;
            }

            const response = await fetch(`${API_URL}/User/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    oldPassword,
                    newPassword,
                }),
            });

            if (response.ok) {
                Alert.alert("Thành công", "Mật khẩu đã được thay đổi.", [
                    { text: "OK", onPress: () => router.replace("/(tabs)/profile") }
                ]);
            } else {
                const errData = await response.json();
                if (errData.message === "Mật khẩu cũ không đúng.") {
                    Alert.alert("Thông báo", "Mật khẩu cũ không chính xác.");
                } else {
                    Alert.alert("Lỗi", errData.message || "Không thể đổi mật khẩu.");
                }
            }
        } catch (error) {
            console.error("Lỗi đổi mật khẩu:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi đổi mật khẩu.");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.replace("/(tabs)/profile")} style={styles.backIcon}>
                <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>

            <Image
                source={require("@/assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Đổi mật khẩu</Text>
            <Text style={styles.description}>
                Trong trường hợp quên mật khẩu hiện tại, bạn có thể chọn quên mật khẩu để đặt lại mật khẩu mới
            </Text>

            <View style={{ position: "relative" }}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu hiện tại"
                    secureTextEntry={!showOldPassword}
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <TouchableOpacity
                    onPress={() => setShowOldPassword(!showOldPassword)}
                    style={{ position: "absolute", right: 12, top: 14 }}
                >
                    {showOldPassword ? (
                        <EyeOff size={20} color="#666" />
                    ) : (
                        <Eye size={20} color="#666" />
                    )}
                </TouchableOpacity>
            </View>

            <View style={{ position: "relative" }}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu mới"
                    secureTextEntry={!showNewPassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TouchableOpacity
                    onPress={() => setShowNewPassword(!showNewPassword)}
                    style={{ position: "absolute", right: 12, top: 14 }}
                >
                    {showNewPassword ? (
                        <EyeOff size={20} color="#666" />
                    ) : (
                        <Eye size={20} color="#666" />
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <Text onPress={() => router.push("/(authentication)/forget")}>
                    <Text style={styles.forgot}>Quên mật khẩu?</Text>
                </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
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
        marginBottom: 12,
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
    row: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 16,
    },
    forgot: {
        color: "#72C15F",
    },
});
