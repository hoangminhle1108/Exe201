import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Copy } from "lucide-react-native";
import * as Clipboard from "expo-clipboard";
import { API_URL } from "@env";
import { Image } from "expo-image";

export default function PayDetailScreen() {
    const router = useRouter();
    const { transactionId, userId } = useLocalSearchParams<{ transactionId: string; userId: string }>();

    const [orderId, setOrderId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [packageName, setPackageName] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");
    const [transferContent, setTransferContent] = useState("");

    const bankName = "Sacombank - Ngân hàng thương mại cổ phần Sài Gòn Thương Tín";
    const accountName = "NGUYEN HOANG BAO TRAN";
    const accountNumber = "050124800983";

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!transactionId || !userId) return;

                const txnRes = await fetch(`${API_URL}/Transaction/transaction/${transactionId}/${userId}`);
                if (txnRes.ok) {
                    const data = await txnRes.json();

                    setOrderId(data.transactionCode || "");
                    setCustomerName(`${data.fullName} (${data.email})`);

                    if (data.createdDate) {
                        const date = new Date(data.createdDate);
                        const hours = date.getHours().toString().padStart(2, "0");
                        const minutes = date.getMinutes().toString().padStart(2, "0");
                        const day = date.getDate().toString().padStart(2, "0");
                        const month = (date.getMonth() + 1).toString().padStart(2, "0");
                        const year = date.getFullYear();
                        setCreatedAt(`${hours}:${minutes} ${day}/${month}/${year}`);
                    }

                    setPackageName(data.packageName || "");
                    setPrice(data.amount ? `${data.amount.toLocaleString()} VND` : "");
                    setStatus(data.status || "");
                    setTransferContent(data.transactionCode || "");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [transactionId, userId]);


    let statusColor = "#999";
    let statusLabel = status;

    if (status === "Unpaid") {
        statusColor = "#FF9800";
        statusLabel = "Chưa thanh toán";
    } else if (status === "Paid") {
        statusColor = "#72C15F";
        statusLabel = "Đã thanh toán";
    } else if (status === "Expired") {
        statusColor = "#FF4D4D";
        statusLabel = "Hết hạn thanh toán";
    }

    const copyToClipboard = (text: string) => {
        Clipboard.setStringAsync(text);
        Alert.alert("Thông báo", "Đã sao chép: " + text);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity
                    onPress={() => router.replace("/(setting)/payHistory")}
                    style={styles.backButton}
                >
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Thanh toán đơn hàng</Text>

                <View style={styles.box}>
                    {orderId ? <Text style={styles.orderId}>Đơn hàng #{orderId}</Text> : null}
                    {customerName ? (
                        <>
                            <Text style={styles.label}>Thông tin khách hàng:</Text>
                            <Text>{customerName}</Text>
                        </>
                    ) : null}
                    {createdAt ? (
                        <>
                            <Text style={styles.label}>Tạo lúc:</Text>
                            <Text>{createdAt}</Text>
                        </>
                    ) : null}
                    {price ? (
                        <>
                            <Text style={styles.label}>Số tiền:</Text>
                            <Text style={styles.amount}>{price}</Text>
                        </>
                    ) : null}
                    {status ? (
                        <>
                            <Text style={styles.label}>Trạng thái:</Text>
                            <View style={[styles.statusButton, { borderColor: statusColor }]}>
                                <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
                            </View>
                        </>
                    ) : null}
                </View>

                <View style={styles.noticeBox}>
                    <Text style={styles.notice}>Đơn hàng chưa thanh toán sẽ hết hạn trong vòng 24 giờ kể từ lúc tạo đơn.</Text>
                    <Text style={styles.notice}>
                        Chúng tôi không chịu trách nhiệm với những đơn hàng đã hết hạn mà vẫn tiếp tục thanh toán                    </Text>
                    <Text style={styles.notice}>
                        Để hoàn tất đơn hàng, vui lòng chuyển khoản đúng số tiền cần
                        thanh toán theo thông tin phía dưới.
                    </Text>
                    <Text style={styles.notice}>
                        Ghi số tài khoản, số tiền và nội dung chính xác như thông tin phía dưới để được hỗ trợ sớm nhất khi có vấn đề xảy ra.
                    </Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.label}>THÔNG TIN CHUYỂN KHOẢN</Text>
                    <Text style={styles.copyRow}>Ngân hàng: {bankName}</Text>
                    <Text style={styles.copyRow}>Chủ tài khoản: {accountName}</Text>
                    <View style={styles.copyRow}>
                        <Text>Số tài khoản: {accountNumber}</Text>
                        <TouchableOpacity onPress={() => copyToClipboard(accountNumber)}>
                            <Copy size={18} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.copyRow}>
                        <Text>Nội dung: {transferContent}</Text>
                        <TouchableOpacity onPress={() => copyToClipboard(transferContent)}>
                            <Copy size={18} color="#000" />
                        </TouchableOpacity>
                    </View>
                    {price ? <Text style={styles.copyRow}>Số tiền: {price}</Text> : null}
                    <Image source={require("@/assets/qr.jpg")} style={styles.qr} />
                    <Text style={styles.qrNote}>Quét mã QRCode từ các app Ngân Hàng và Momo</Text>
                </View>

                {packageName ? (
                    <View style={styles.orderDetail}>
                        <Text style={styles.label}>Chi tiết đơn hàng</Text>
                        <View style={styles.orderRow}>
                            <Text>1</Text>
                            <Text>{packageName}</Text>
                            <Text>1</Text>
                            <Text>{price}</Text>
                        </View>
                        <Text style={styles.total}>TỔNG: 1 gói</Text>
                    </View>
                ) : null}


                <View style={styles.noticeBox}>
                    <Text style={styles.notice}>
                        Chúng tôi không chịu trách nhiệm với những đơn hàng chuyển không đủ tiền.
                    </Text>
                    <Text style={styles.notice}>
                        Chúng tôi không chịu trách nhiệm với những giao dịch chuyển sai số tài khoản.
                    </Text>
                    <Text style={styles.notice}>
                        Sau khi nhận được thông báo từ ngân hàng, chúng tôi sẽ thông báo thanh toán thành công qua email đã đăng ký tài khoản.
                    </Text>
                    <Text style={styles.notice}>
                        Trong trường hợp điền sai thông tin hoặc có bất kỳ sự cố gì, vui lòng liên hệ qua email healthmate@gmail.com để được hỗ trợ sớm nhất.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    backButton: {
        position: "absolute",
        top: 30,
        left: 24,
        zIndex: 10,
    },
    scrollContent: {
        padding: 24,
        paddingTop: 65,
        paddingBottom: 32,
    },
    title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
    box: {
        backgroundColor: "#fafafa",
        borderWidth: 1,
        borderColor: "#ddd", padding: 16, borderRadius: 8, marginBottom: 16
    },
    orderId: { fontWeight: "bold", color: "#72C15F" },
    label: { fontWeight: "bold", marginTop: 8 },
    amount: { color: "red", fontWeight: "bold", fontSize: 16 },
    noticeBox: { backgroundColor: "#fff0f0", padding: 12, borderRadius: 8, marginBottom: 16 },
    notice: { color: "red", marginBottom: 4 },
    qr: { width: 200, height: 200, alignSelf: "center", marginVertical: 16 },
    qrNote: { textAlign: "center", fontSize: 12, color: "#666" },
    orderDetail: {
        backgroundColor: "#fafafa",
        borderWidth: 1,
        borderColor: "#ddd", padding: 12, borderRadius: 8, marginBottom: 16
    },
    orderRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
    total: { fontWeight: "bold", textAlign: "right", marginTop: 8 },
    copyRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
    copyText: { flex: 1, marginRight: 8 },
    statusButton: {
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: "center",
        width: "100%",
        marginTop: 4,
    },
    statusText: {
        fontSize: 14,
        textAlign: "center",
    },
});
