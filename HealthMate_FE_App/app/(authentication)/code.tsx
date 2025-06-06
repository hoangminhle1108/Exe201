import React, { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function CodeScreen() {
    const router = useRouter();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
        if (text.length <= 1) {
            const newCode = [...code];
            newCode[index] = text;
            setCode(newCode);
            if (text && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleResend = () => {
        // TODO: handle resend logic
    };

    const handleConfirmCode = () => {
        router.push("/(authentication)/newPassword");
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

            <Text style={styles.title}>Nhập vào 6 mã số</Text>
            <Text style={styles.description}>
                Nhập vào 6 mã số đã được gửi đến email của bạn để xác nhận đặt lại mật khẩu
            </Text>

            <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref!)}
                        style={[
                            styles.codeInput,
                            digit ? styles.filledCode : null,
                        ]}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        autoFocus={index === 0}
                    />
                ))}
            </View>

            {/* <Text style={styles.timerText}>Mã hết hạn trong vòng 10:50</Text> */}
            <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>Gửi lại mã</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleConfirmCode}>
                <Text style={styles.buttonText}>Xác nhận mã</Text>
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
    codeContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
        marginBottom: 16,
    },
    codeInput: {
        width: 44,
        height: 50,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: "#ccc",
        textAlign: "center",
        fontSize: 18,
    },
    filledCode: {
        borderColor: "#72C15F",
    },
    dashSpacing: {
        marginRight: 12,
    },
    timerText: {
        textAlign: "center",
        color: "#999",
        marginBottom: 6,
    },
    resendText: {
        textAlign: "center",
        color: "#72C15F",
        fontWeight: "500",
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
