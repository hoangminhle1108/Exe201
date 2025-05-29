import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
    const router = useRouter();
    const [agree, setAgree] = useState(false);

    const handleRegister = () => {
        router.push("/(authentication)/login");
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("@/assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.tabHeader}>
                <Text style={styles.tab}>Đăng nhập</Text>
                <Text style={[styles.tab, styles.activeTab]}>Đăng ký</Text>
            </View>

            <TextInput style={styles.input} placeholder="Họ và tên" />
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry />

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    onPress={() => setAgree(!agree)}
                    style={[
                        styles.checkbox,
                        { backgroundColor: agree ? "#72C15F" : "transparent", borderColor: agree ? "#72C15F" : "#ccc" },
                    ]}
                >
                    {agree && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>
                    <Text style={{ color: "black" }}>Tôi đồng ý với </Text>
                    <Text style={{ color: "#72C15F", fontWeight: "bold" }}>
                        Điều khoản dịch vụ
                    </Text>
                </Text>
            </View>


            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>

            <Text style={styles.loginLink}>
                <Text style={{ color: "black" }}>Đã có tài khoản? </Text>
                <Text
                    style={{ color: "#72C15F", fontWeight: "bold" }}
                    onPress={() => router.push("/(authentication)/login")}
                >
                    Đăng nhập
                </Text>
            </Text>
            <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>HOẶC</Text>
                <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.googleButton} onPress={() => { /* Handle Google login */ }}>
                <Image
                    source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png" }}
                    style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>Đăng nhập bằng Google</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 20,
    },
    tabHeader: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 24,
        borderBottomWidth: 2,
        borderColor: "#72C15F",
    },
    tab: {
        fontSize: 16,
        marginHorizontal: 20,
        paddingBottom: 8,
        color: "#999",
    },
    activeTab: {
        color: "#72C15F",
        fontWeight: "bold",
        borderColor: "#72C15F",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    checkboxLabel: {
        marginLeft: 8,
        color: "#666",
        flex: 1,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    checkmark: {
        color: "white",
        fontWeight: "bold",
        fontSize: 10,
    },
    button: {
        backgroundColor: "#72C15F",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 16,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginLink: {
        textAlign: "center",
        color: "#72C15F",
        marginBottom: 16,
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 16,
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#ccc",
        marginHorizontal: 10,
    },

    orText: {
        color: "#666",
        fontSize: 14,
    },

    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },

    googleButtonText: {
        fontSize: 16,
        color: "#000",
        fontWeight: "500",
    },
});
