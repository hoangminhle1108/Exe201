import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function ChangePassword() {
    const router = useRouter();

    const handleChangePassword = () => {
        router.push("/(authentication)/login");
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

            <TextInput style={styles.input} placeholder="Mật khẩu hiện tại" secureTextEntry />
            <TextInput style={styles.input} placeholder="Mật khẩu mới" secureTextEntry />

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
