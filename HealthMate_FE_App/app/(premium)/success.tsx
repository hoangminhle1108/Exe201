import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function SuccessScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <View style={styles.checkCircle}>
                    <Text style={styles.checkIcon}>✔</Text>
                </View>
                <Text style={styles.successText}>Thanh toán thành công</Text>
            </View>

            <View style={styles.card}>
                <Row label="Khách hàng" value="Elizabeth Taylor" />
                <Row label="Số điện thoại" value="(929) 617-0714" />
                <Row label="Số tiền" value="49.000 VND" />
                <Row label="Số thẻ" value="2412 7512 3412 3456" />
                <Row label="Mã giao dịch" value="34525" />
                <Row label="Thời gian" value="12:30 21/08/2025" />
                <Row label="Gói" value="Gói tháng" />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace("/(tabs)/home")}
            >
                <Text style={styles.buttonText}>Trở về trang chủ</Text>
            </TouchableOpacity>
        </View>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 100,
        justifyContent: "flex-start",
    },
    iconWrapper: {
        alignItems: "center",
        marginBottom: 30,
    },
    checkCircle: {
        backgroundColor: "rgba(34,197,94,0.1)",
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    checkIcon: {
        fontSize: 32,
        color: "#72C15F",
    },
    successText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#72C15F",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    label: {
        fontSize: 16,
        color: "#6B7280",
    },
    value: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111827",
    },
    button: {
        position: "absolute",
        bottom: 24,
        left: 24,
        right: 24,
        backgroundColor: "#72C15F",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
