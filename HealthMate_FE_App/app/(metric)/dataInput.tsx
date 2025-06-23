import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export default function DataInputScreen() {
    const router = useRouter();

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    const [metricId, setMetricId] = useState<number | null>(null);
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (!token) return;

                const response = await fetch(`${API_URL}/HealthMetric`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    const todayData = data.find((m: any) => m.metricDate === formattedDate);
                    if (todayData) {
                        setMetricId(todayData.metricId);
                        setWeight(todayData.weight?.toString() || "");
                        setHeight(todayData.height?.toString() || "");
                        setBmi(todayData.bodyFat?.toString() || "");
                        setNote(todayData.note || "");
                    }
                } else {
                    console.warn("Could not fetch health metrics list.");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (weight && height) {
            const w = parseFloat(weight);
            const h = parseFloat(height) / 100;
            if (w > 0 && h > 0) {
                const calculatedBmi = w / (h * h);
                setBmi(calculatedBmi.toFixed(1));
                if (calculatedBmi < 18.5) setNote("Thiếu cân");
                else if (calculatedBmi < 23) setNote("Bình thường");
                else if (calculatedBmi < 25) setNote("Thừa cân");
                else setNote("Béo phì");
            } else {
                setBmi("");
                setNote("");
            }
        } else {
            setBmi("");
            setNote("");
        }
    }, [weight, height]);

    const handleSubmit = async () => {
        if (!weight || !height) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ chiều cao và cân nặng.");
            return;
        }

        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Thông báo", "Không tìm thấy token, vui lòng đăng nhập lại.");
                return;
            }

            const payload = {
                metricDate: formattedDate,
                weight: parseFloat(weight),
                height: parseFloat(height),
                bodyFat: bmi ? parseFloat(bmi) : 0,
                note: note || null,
            };
            const apiUrl = metricId
                ? `${API_URL}/HealthMetric/${metricId}`
                : `${API_URL}/HealthMetric`;
            const method = metricId ? "PUT" : "POST";

            const response = await fetch(apiUrl, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                Alert.alert(
                    "Thông báo",
                    "Đã nhập dữ liệu thành công.",
                    [{ text: "OK", onPress: () => router.push("/(metric)/overview") }]
                );
            } else {
                const errText = await response.text();
                Alert.alert("Lỗi", `Không thể lưu dữ liệu: ${errText}`);
            }
        } catch (error) {
            Alert.alert("Lỗi", "Đã xảy ra lỗi, vui lòng thử lại sau.");
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.mainTitle}>Nhập dữ liệu ngày {today.toLocaleDateString("vi-VN")}</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Chiều cao (cm)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Nhập chiều cao"
                            value={height}
                            onChangeText={setHeight}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Cân nặng (kg)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Nhập cân nặng"
                            value={weight}
                            onChangeText={setWeight}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>BMI (tự động tính)</Text>
                        <TextInput style={styles.input} value={bmi} editable={false} placeholder="BMI" />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Ghi chú (tự động tính)</Text>
                        <TextInput style={styles.input} value={note} editable={false} placeholder="Ghi chú" />
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
                    <Text style={styles.confirmText}>Xác nhận dữ liệu</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: "#fff" },
    container: { flex: 1, padding: 20 },
    backIcon: { marginBottom: 15 },
    mainTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 24, color: "#000" },
    inputGroup: { marginBottom: 16 },
    label: { fontSize: 14, fontWeight: "500", marginBottom: 4 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 12, padding: 12 },
    confirmButton: { backgroundColor: "#72C15F", paddingVertical: 16, borderRadius: 12, alignItems: "center", marginTop: 10 },
    confirmText: { color: "white", fontSize: 16, fontWeight: "bold" },
});


// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
// import { useRouter } from "expo-router";
// import { ChevronLeft } from "lucide-react-native";
// import { PieChart } from "react-native-chart-kit";

// export default function OverviewScreen() {
//     const router = useRouter();
//     const today = new Date();
//     const day = String(today.getDate()).padStart(2, "0");
//     const month = String(today.getMonth() + 1).padStart(2, "0");
//     const year = today.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;

//     const fat = 80;
//     const protein = 160;
//     const carbs = 230;
//     const fiber = 40;
//     const calo = 1060;

//     const total = fat + protein + carbs + fiber + calo;

//     const nutritionData = [
//         { name: "Chất béo", value: fat, color: "#d9a1ff" },
//         { name: "Chất đạm", value: protein, color: "#ffa1a1" },
//         { name: "Chất xơ", value: fiber, color: "#a1ffca" },
//         { name: "Đường bột", value: carbs, color: "#ffc3a1" },
//         { name: "Calo", value: calo, color: "#a1d0ff" },
//     ].map(item => ({
//         ...item,
//         population: item.value,
//         percentage: ((item.value / total) * 100).toFixed(1),
//         legendFontColor: "#000",
//         legendFontSize: 16,
//     }));


//     return (
//         <View style={styles.wrapper}>
//             <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
//                 <TouchableOpacity style={styles.backIcon} onPress={() => router.replace("/(tabs)/home")}>
//                     <ChevronLeft size={24} color="#1A1A1A" />
//                 </TouchableOpacity>

//                 <Text style={styles.mainText}>
//                     Tổng quan ngày {formattedDate}
//                 </Text>

//                 {/*  CHART */}
//                 <PieChart
//                     data={nutritionData.map(item => ({
//                         name: `% ${item.name}`,
//                         population: parseFloat(((item.value / total) * 100).toFixed(1)),
//                         color: item.color,
//                         legendFontColor: "#000",
//                         legendFontSize: 14,
//                     }))}
//                     width={Dimensions.get("window").width - 40}
//                     height={220}
//                     chartConfig={{
//                         color: () => `#000`,
//                     }}
//                     accessor="population"
//                     backgroundColor="transparent"
//                     paddingLeft="15"
//                     center={[0, 0]}
//                     absolute={true}
//                     style={{ marginVertical: 8 }}
//                 />


//                 <View style={styles.breakdown}>
//                     {nutritionData.map((item, idx) => (
//                         <View key={idx} style={styles.nutritionRow}>
//                             <View style={[styles.dot, { backgroundColor: item.color }]} />
//                             <Text style={styles.nutritionText}>{item.name}</Text>
//                             <Text style={styles.value}>{item.population}g</Text>
//                         </View>
//                     ))}
//                 </View>
//             </ScrollView>

//             <TouchableOpacity style={styles.inputButton} onPress={() => router.push("/(metric)/dataInput")}>
//                 <Text style={styles.inputText}>Nhập chỉ số khối cơ thể (BMI) hôm nay</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     wrapper: {
//         flex: 1,
//         backgroundColor: "#fff",
//     },
//     container: {
//         flexGrow: 1,
//         padding: 20,
//         alignItems: "center",
//     },
//     backIcon: {
//         alignSelf: "flex-start",
//         marginBottom: 15,
//     },
//     mainText: {
//         fontSize: 18,
//         fontWeight: "bold",
//         textAlign: "center",
//         marginBottom: 16,
//         color: "#000",
//     },
//     breakdown: {
//         width: "100%",
//         marginTop: 16,
//     },
//     nutritionRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingVertical: 10,
//         paddingHorizontal: 8,
//         borderWidth: 1,
//         borderColor: "#e5e7eb",
//         borderRadius: 10,
//         marginBottom: 15,
//         height: 50,
//     },
//     dot: {
//         width: 12,
//         height: 12,
//         borderRadius: 6,
//     },
//     nutritionText: {
//         flex: 1,
//         marginLeft: 8,
//         fontSize: 14,
//     },
//     value: {
//         fontSize: 14,
//         color: "#555",
//     },
//     inputButton: {
//         backgroundColor: "#72C15F",
//         paddingVertical: 16,
//         borderRadius: 12,
//         alignItems: "center",
//         margin: 20,
//     },
//     inputText: {
//         color: "white",
//         fontSize: 16,
//         fontWeight: "bold",
//     },
// });

