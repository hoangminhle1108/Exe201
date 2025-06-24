import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

interface Transaction {
    transactionId: number;
    transactionCode: string;
    amount: number;
    status: string;
    purchasedAt: string;
    packageId: number;
    packageName: string;
}

interface PremiumPackage {
    packageId: number;
    durationDays: number;
}

export default function PayHistoryScreen() {
    const router = useRouter();
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        loadTransactions();
    }, []);

    async function loadTransactions() {
        setLoading(true);
        try {
            const email = await AsyncStorage.getItem("email");
            if (!email) throw new Error("Email not found");

            const userRes = await fetch(`${API_URL}/User/all_user_by_email/${email}`);
            if (!userRes.ok) throw new Error("Failed to fetch user");

            const users = await userRes.json();
            const user = users[0];
            if (!user) throw new Error("User not found");

            setUserId(user.userId);

            const txnRes = await fetch(`${API_URL}/Transaction/all_transactions/${user.userId}`);
            if (!txnRes.ok) throw new Error("Failed to fetch transactions");

            const txnData: Transaction[] = await txnRes.json();

            const enrichedTxns = await Promise.all(
                txnData.map(async (txn) => {
                    const pkgRes = await fetch(`${API_URL}/PremiumPackage/${txn.packageId}`);
                    const pkgData: PremiumPackage = await pkgRes.json();

                    const purchasedDate = new Date(txn.purchasedAt);
                    const expiryDate = new Date(purchasedDate);
                    expiryDate.setDate(expiryDate.getDate() + pkgData.durationDays);

                    return {
                        ...txn,
                        expiryDate: expiryDate.toLocaleString("vi-VN"),
                        purchasedAtFormatted: purchasedDate.toLocaleString("vi-VN"),
                        priceDisplay: `${txn.amount.toLocaleString()} VND`,
                    };
                })
            );

            setTransactions(enrichedTxns);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <TouchableOpacity
                    onPress={() => router.replace("/(tabs)/profile")}
                    style={styles.backIcon}
                >
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Lịch sử thanh toán</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#72C15F" />
                ) : transactions.length === 0 ? (
                    <Text style={styles.emptyText}>Hiện tại chưa có giao dịch nào.</Text>
                ) : (
                    transactions.map((txn) => {
                        let statusColor = "#999";
                        if (txn.status === "Unpaid") statusColor = "#FF9800";
                        if (txn.status === "Paid") statusColor = "#72C15F";
                        if (txn.status === "Expired") statusColor = "#FF4D4D";

                        return (
                            <PaymentCard
                                key={txn.transactionId}
                                status={txn.status}
                                statusColor={statusColor}
                                transactionId={txn.transactionCode}
                                purchaseTime={txn.purchasedAtFormatted}
                                expiryTime={txn.expiryDate}
                                packageName={txn.packageName}
                                price={txn.priceDisplay}
                                onDetailPress={() =>
                                    userId && router.push(`/(setting)/payDetail?transactionId=${txn.transactionId}&userId=${userId}`)
                                } />
                        );
                    })
                )}
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
    packageName,
    price,
    onDetailPress,
}: {
    status: string;
    statusColor: string;
    transactionId: string;
    purchaseTime: string;
    expiryTime: string;
    packageName: string;
    price: string;
    onDetailPress?: () => void;
}) {
    return (
        <View style={cardStyles.card}>
            <View style={cardStyles.header}>
                <Text style={cardStyles.packageName}>{packageName}</Text>
                <Text style={cardStyles.price}>{price}</Text>
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

            <TouchableOpacity style={cardStyles.locationContainer} onPress={onDetailPress}>
                <Text style={cardStyles.location}>Xem chi tiết &gt;</Text>
            </TouchableOpacity>
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
        paddingBottom: 32,
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
    emptyText: {
        marginTop: 10,
        fontSize: 16,
        textAlign: "center",
        color: "#999",
        fontStyle: "italic",
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
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 8,
    },
    location: {
        fontSize: 12,
        color: "#888",
    },
});
