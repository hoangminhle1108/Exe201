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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { Image } from "expo-image";

export default function QrScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [packageName, setPackageName] = useState("");
    const [price, setPrice] = useState("");

    const orderId = "#WKBT28556822732";
    const bankName = "Sacombank - Ngân hàng thương mại cổ phần Sài Gòn Thương Tín";
    const accountName = "NGUYEN HOANG BAO TRAN";
    const accountNumber = "050124800983";
    const transferContent = "WKBT28556822732";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = await AsyncStorage.getItem("email");
                if (!email) return;

                const userRes = await fetch(`${API_URL}/User/all_user_by_email/${email}`);
                const userData = await userRes.json();
                if (userRes.ok && userData.length > 0) {
                    const user = userData[0];
                    setCustomerName(`${user.fullName} (${user.email})`);
                    setCustomerEmail(user.email);
                }

                if (id) {
                    const pkgRes = await fetch(`${API_URL}/PremiumPackage/${id}`);
                    const pkgData = await pkgRes.json();
                    if (pkgRes.ok) {
                        setPackageName(pkgData.packageName);
                        setPrice(`${pkgData.price.toLocaleString()} VND`);
                    }
                }

                const now = new Date();
                const dateStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} ${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}`;
                setCreatedAt(dateStr);

            } catch (error) {
                console.error("Lỗi khi fetch data:", error);
            }
        };

        fetchData();
    }, [id]);

    const copyToClipboard = (text: string) => {
        Clipboard.setStringAsync(text);
        Alert.alert("Thông báo", "Đã sao chép: " + text);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity onPress={() => router.replace("/(tabs)/home")} style={styles.backButton}>
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Thanh toán đơn hàng</Text>

                <View style={styles.box}>
                    <Text style={styles.orderId}>Đơn hàng {orderId}</Text>
                    <Text style={styles.label}>Thông tin khách hàng:</Text>
                    <Text>{customerName}</Text>
                    <Text style={styles.label}>Tạo lúc:</Text>
                    <Text>{createdAt}</Text>
                    <Text style={styles.label}>Số tiền:</Text>
                    <Text style={styles.amount}>{price}</Text>
                </View>

                <View style={styles.noticeBox}>
                    <Text style={styles.notice}>
                        Có thể chụp lại màn hình trang này để thanh toán sau vì khi thoát sẽ chỉ có thể tạo đơn hàng mới.
                    </Text>
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
                    <View style={styles.copyRow}>
                        <Text>Ngân hàng: {bankName}</Text>
                    </View>
                    <View style={styles.copyRow}>
                        <Text>Chủ tài khoản: {accountName}</Text>
                    </View>
                    <View style={styles.copyRow}>
                        <Text style={styles.copyText}>Số tài khoản: {accountNumber}</Text>
                        <TouchableOpacity onPress={() => copyToClipboard(accountNumber)}>
                            <Copy size={18} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.copyRow}>
                        <Text style={styles.copyText}>Nội dung: {transferContent}</Text>
                        <TouchableOpacity onPress={() => copyToClipboard(transferContent)}>
                            <Copy size={18} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.copyRow}>
                        <Text>Số tiền: {price}</Text>
                    </View>

                    <Image
                        source={require("@/assets/qr.jpg")}
                        style={styles.qr}
                    />
                    <Text style={styles.qrNote}>
                        Quét mã QRCode từ các app Ngân Hàng và Momo
                    </Text>
                </View>

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
        paddingHorizontal: 20,
        padding: 20,
    },
    backButton: {
        marginBottom: 20,
    },
    scrollContent: {
        paddingBottom: 50,
    },
    title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
    box: { backgroundColor: "#f9f9f9", padding: 16, borderRadius: 8, marginBottom: 16 },
    orderId: { fontWeight: "bold", color: "#72C15F" },
    label: { fontWeight: "bold", marginTop: 8 },
    amount: { color: "red", fontWeight: "bold", fontSize: 16 },
    noticeBox: { backgroundColor: "#fff0f0", padding: 12, borderRadius: 8, marginBottom: 16 },
    notice: { color: "red", marginBottom: 4 },
    qr: { width: 200, height: 200, alignSelf: "center", marginVertical: 16 },
    qrNote: { textAlign: "center", fontSize: 12, color: "#666" },
    orderDetail: { padding: 12, backgroundColor: "#f9f9f9", borderRadius: 8, marginBottom: 16 },
    orderRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
    total: { fontWeight: "bold", textAlign: "right", marginTop: 8 },
    copyRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 },
    copyText: { flex: 1, marginRight: 8 },
});
