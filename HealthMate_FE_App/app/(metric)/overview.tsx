import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Text,
    ActivityIndicator,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { useRouter, useFocusEffect } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

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
    const router = useRouter();
    const datesWithData = metrics.map((m) => new Date(m.metricDate));

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
        // style: { backgroundColor: "#72C15F" },
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
                        {!selectedMetric ? (
                            <Text style={[styles.noDataText]}>Ngày {formatDate(selectedDate)} không có dữ liệu.</Text>
                        ) : (
                            <View style={styles.dataCard}>
                                <Text style={styles.dataTitle}>Dữ liệu ngày {formatDate(selectedDate)}</Text>

                                <Text style={styles.dataRow}><Text style={styles.label}>Chiều cao:</Text> {selectedMetric.height} cm</Text>
                                <Text style={styles.dataRow}><Text style={styles.label}>Cân nặng:</Text> {selectedMetric.weight} kg</Text>
                                <Text style={styles.dataRow}><Text style={styles.label}>BMI:</Text> {selectedMetric.bodyFat}</Text>
                                <Text style={styles.dataRow}><Text style={styles.label}>Ghi chú:</Text> {selectedMetric.note || "-"}</Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.inputButton} onPress={() => router.push("/(metric)/dataInput")}>
                <Text style={styles.inputText}>Nhập dữ liệu BMI hôm nay</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flexGrow: 1,
        padding: 20,
    },
    backIcon: { marginBottom: 15 },
    calendarWrapper: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: "#fafafa",
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        textAlign: "center",
    },
    noDataText: {
        marginTop: 10,
        fontSize: 16,
        textAlign: "center",
        color: "#999",
        fontStyle: "italic",
    },
    dataCard: {
        backgroundColor: "#f9f9f9",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dataTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12,
        color: "#333",
    },
    dataRow: {
        fontSize: 16,
        color: "#444",
        paddingVertical: 2,
    },
    label: {
        fontWeight: "bold",
        color: "#222",
    },

    inputButton: {
        backgroundColor: "#72C15F",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        margin: 20,
    },
    inputText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    mainTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 24, color: "#000" },
});
