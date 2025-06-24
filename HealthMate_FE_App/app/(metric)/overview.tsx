import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Text,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { useRouter, useFocusEffect } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { PieChart } from "react-native-chart-kit";

interface HealthMetric {
    metricId: number;
    metricDate: string;
    weight: number;
    height: number;
    bodyFat: number;
    note: string;
    createdAt: string;
}

export default function OverviewScreen() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [metrics, setMetrics] = useState<HealthMetric[]>([]);
    const [loading, setLoading] = useState(false);
    const [viewingMonth, setViewingMonth] = useState(new Date());
    const router = useRouter();
    const datesWithData = metrics.map((m) => new Date(m.metricDate));

    const currentMonth = viewingMonth.getMonth() + 1;
    const currentYear = viewingMonth.getFullYear();

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
    }, []);

    const noteCounts = metrics.reduce(
        (acc, m) => {
            const metricDate = new Date(m.metricDate);
            if (
                metricDate.getMonth() + 1 === currentMonth &&
                metricDate.getFullYear() === currentYear
            ) {
                const note = m.note.trim().toLowerCase();
                if (note.includes("thiếu")) acc.thieu++;
                else if (note.includes("bình")) acc.binhthuong++;
                else if (note.includes("thừa")) acc.thua++;
            }
            return acc;
        },
        { thieu: 0, binhthuong: 0, thua: 0 }
    );

    const totalNotes = noteCounts.thieu + noteCounts.binhthuong + noteCounts.thua;
    const pieData = totalNotes > 0 ? [
        {
            name: "% Thiếu cân",
            population: parseFloat(((noteCounts.thieu / totalNotes) * 100).toFixed(1)),
            color: "#a1d0ff",
            legendFontColor: "#000",
            legendFontSize: 14,
        },
        {
            name: "% Bình thường",
            population: parseFloat(((noteCounts.binhthuong / totalNotes) * 100).toFixed(1)),
            color: "#d9a1ff",
            legendFontColor: "#000",
            legendFontSize: 14,
        },
        {
            name: "% Thừa cân",
            population: parseFloat(((noteCounts.thua / totalNotes) * 100).toFixed(1)),
            color: "#ffa1a1",
            legendFontColor: "#000",
            legendFontSize: 14,
        }
    ] : [];


    useFocusEffect(
        useCallback(() => {
            fetchMetrics();
        }, [])
    );

    async function fetchMetrics() {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                console.warn("No auth token found");
                setLoading(false);
                return;
            }
            const res = await fetch(`${API_URL}/HealthMetric`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.warn("Failed to fetch metrics:", res.status);
                setLoading(false);
                return;
            }
            const data: HealthMetric[] = await res.json();
            setMetrics(data);
        } catch (error) {
            console.error("Error fetching metrics:", error);
        }
        setLoading(false);
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const selectedMetric = selectedDate
        ? metrics.find((m) => m.metricDate === selectedDate)
        : null;

    const customDatesStyles = datesWithData.map((date) => ({
        date,
        textStyle: { color: "#72C15F", fontWeight: "bold" },
    }));

    return (
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.backIcon} onPress={() => router.replace("/(tabs)/home")}>
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.mainTitle}>Tổng quan theo dõi sức khỏe</Text>

                <View style={styles.calendarWrapper}>
                    <CalendarPicker
                        months={[
                            "Tháng 1",
                            "Tháng 2",
                            "Tháng 3",
                            "Tháng 4",
                            "Tháng 5",
                            "Tháng 6",
                            "Tháng 7",
                            "Tháng 8",
                            "Tháng 9",
                            "Tháng 10",
                            "Tháng 11",
                            "Tháng 12",
                        ]}
                        previousTitle="     <"
                        nextTitle=">      "
                        weekdays={["T2", "T3", "T4", "T5", "T6", "T7", "CN"]}
                        startFromMonday={true}
                        onDateChange={(date: Date) => {
                            const formattedDate = date.toISOString().split("T")[0];
                            setSelectedDate(formattedDate);
                        }}
                        onMonthChange={(date: Date) => setViewingMonth(date)}
                        selectedDayColor="#72C15F"
                        selectedDayTextColor="#fff"
                        todayBackgroundColor="#e6ffe6"
                        todayTextStyle={{ color: "#333" }}
                        monthTitleStyle={{ color: "#333" }}
                        yearTitleStyle={{ color: "#333" }}
                        customDatesStyles={customDatesStyles}
                    />
                </View>
                {loading && <ActivityIndicator size="large" color="#72C15F" style={{ marginTop: 20 }} />}

                {selectedDate && !loading && (
                    <View style={{ marginTop: 20 }}>
                        <View style={styles.dataCard}>
                            {!selectedMetric ? (
                                <>
                                    <Text style={styles.dataTitle}>Dữ liệu ngày {formatDate(selectedDate)}</Text>
                                    <Text style={styles.noDataText}>Ngày {formatDate(selectedDate)} không có dữ liệu.</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.dataTitle}>Dữ liệu ngày {formatDate(selectedDate)}</Text>
                                    <Text style={styles.dataRow}><Text style={styles.label}>Chiều cao:</Text> {selectedMetric.height} cm</Text>
                                    <Text style={styles.dataRow}><Text style={styles.label}>Cân nặng:</Text> {selectedMetric.weight} kg</Text>
                                    <Text style={styles.dataRow}><Text style={styles.label}>BMI:</Text> {selectedMetric.bodyFat}</Text>
                                    <Text style={styles.dataRow}><Text style={styles.label}>Ghi chú:</Text> {selectedMetric.note || "-"}</Text>
                                </>
                            )}
                        </View>
                    </View>
                )}

                <Text style={styles.sectionTitle}>Biểu đồ tháng {currentMonth} năm {currentYear} </Text>
                {totalNotes > 0 ? (
                    <>
                        <PieChart
                            data={pieData}
                            width={Dimensions.get("window").width - 40}
                            height={220}
                            chartConfig={{ color: () => "#000" }}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            center={[0, 0]}
                            absolute
                            style={{ marginVertical: 8 }}
                        />

                        <View style={styles.breakdown}>
                            <View style={styles.nutritionRow}>
                                <View style={[styles.dot, { backgroundColor: "#a1d0ff" }]} />
                                <Text style={styles.nutritionText}>Thiếu cân</Text>
                                <Text style={styles.value}>{noteCounts.thieu}</Text>
                            </View>
                            <View style={styles.nutritionRow}>
                                <View style={[styles.dot, { backgroundColor: "#d9a1ff" }]} />
                                <Text style={styles.nutritionText}>Bình thường</Text>
                                <Text style={styles.value}>{noteCounts.binhthuong}</Text>
                            </View>
                            <View style={styles.nutritionRow}>
                                <View style={[styles.dot, { backgroundColor: "#ffa1a1" }]} />
                                <Text style={styles.nutritionText}>Thừa cân</Text>
                                <Text style={styles.value}>{noteCounts.thua}</Text>
                            </View>
                        </View>
                    </>
                ) : (
                    <Text style={styles.noDataText}>Tháng {currentMonth} năm {currentYear} không có dữ liệu.</Text>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.inputButton} onPress={() => router.push("/(metric)/dataInput")}>
                <Text style={styles.inputText}>Nhập dữ liệu BMI hôm nay</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: "#fff" },
    container: { flexGrow: 1, padding: 20 },
    backIcon: { marginBottom: 15 },
    mainTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 24, color: "#000" },
    calendarWrapper: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingVertical: 8,
        backgroundColor: "#fafafa",
    },
    noDataText: { marginTop: 10, fontSize: 16, textAlign: "center", color: "#999", fontStyle: "italic" },
    dataCard: {
        backgroundColor: "#fafafa",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    dataTitle: { fontSize: 16, fontWeight: "bold", textAlign: "center", marginBottom: 12, color: "#333" },
    dataRow: { fontSize: 16, color: "#444", paddingVertical: 2 },
    label: { fontWeight: "bold", color: "#222" },
    sectionTitle: { fontSize: 16, fontWeight: "600", marginTop: 30, marginBottom: 8, alignSelf: "center" },
    breakdown: { width: "100%", marginTop: 20 },
    nutritionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        marginBottom: 15,
        height: 50,
    },
    dot: { width: 12, height: 12, borderRadius: 6 },
    nutritionText: { flex: 1, marginLeft: 8, fontSize: 14 },
    value: { fontSize: 14, color: "#555" },
    inputButton: {
        backgroundColor: "#72C15F",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        margin: 20,
    },
    inputText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
