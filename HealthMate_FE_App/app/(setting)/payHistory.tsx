import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function PayHistoryScreen() {
    const router = useRouter();

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableOpacity
                onPress={() => router.replace("/(tabs)/profile")}
                style={styles.backIcon}
            >
                <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Lịch sử thanh toán</Text>

                <PaymentCard
                    status="Gói đã hết thời hạn"
                    statusColor="#FF4D4D"
                    transactionId="1234567789"
                    purchaseTime="10:00 PM 20/11/2025"
                    expiryTime="10:00 PM 20/12/2025"
                />

                <PaymentCard
                    status="Gói đang sử dụng"
                    statusColor="#4CAF50"
                    transactionId="1234567789"
                    purchaseTime="10:00 PM 20/11/2025"
                    expiryTime="10:00 PM 20/12/2025"
                />

                <PaymentCard
                    status="Gói đã hết thời hạn"
                    statusColor="#FF4D4D"
                    transactionId="1234567789"
                    purchaseTime="11:00 PM 20/11/2025"
                    expiryTime="11:00 PM 20/12/2025"
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

function PaymentCard({
    status,
    statusColor,
    transactionId,
    purchaseTime,
    expiryTime,
}: {
    status: string;
    statusColor: string;
    transactionId: string;
    purchaseTime: string;
    expiryTime: string;
}) {
    return (
        <View style={cardStyles.card}>
            <View style={cardStyles.header}>
                <Text style={cardStyles.packageName}>Gói tháng</Text>
                <Text style={cardStyles.price}>49.000 VND</Text>
            </View>

            <View style={cardStyles.row}>
                <Text style={cardStyles.label}>Trạng thái:</Text>
                <Text style={[cardStyles.statusBadge, { color: statusColor, borderColor: statusColor }]}>
                    {status}
                </Text>
            </View>

            <View style={cardStyles.row}>
                <Text style={cardStyles.label}>Mã giao dịch:</Text>
                <Text style={cardStyles.value}>{transactionId}</Text>
            </View>

            <View style={cardStyles.row}>
                <Text style={cardStyles.label}>Thời gian mua:</Text>
                <Text style={cardStyles.value}>{purchaseTime}</Text>
            </View>

            <View style={cardStyles.row}>
                <Text style={cardStyles.label}>Ngày hết hạn:</Text>
                <Text style={cardStyles.value}>{expiryTime}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        padding: 24,
        paddingTop: 65,
        paddingBottom: 120,
    },
    backIcon: {
        position: "absolute",
        top: 30,
        left: 24,
        zIndex: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
});

const cardStyles = StyleSheet.create({
    card: {
        backgroundColor: "#F6F8F4",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#eee",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    packageName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    price: {
        fontSize: 14,
        backgroundColor: "#72C15F",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        color: "white",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    label: {
        fontSize: 14,
        color: "#333",
    },
    value: {
        fontSize: 14,
        color: "#000",
    },
    statusBadge: {
        fontSize: 13,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
    },
});
