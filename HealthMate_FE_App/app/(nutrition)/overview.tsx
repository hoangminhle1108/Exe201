import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { PieChart } from "react-native-chart-kit";

export default function OverviewScreen() {
    const router = useRouter();
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const fat = 80;
    const protein = 160;
    const carbs = 230;
    const fiber = 40;
    const calo = 1060;

    const total = fat + protein + carbs + fiber + calo;

    const nutritionData = [
        { name: "Chất béo", value: fat, color: "#d9a1ff" },
        { name: "Chất đạm", value: protein, color: "#ffa1a1" },
        { name: "Chất xơ", value: fiber, color: "#a1ffca" },
        { name: "Đường bột", value: carbs, color: "#ffc3a1" },
        { name: "Calo", value: calo, color: "#a1d0ff" },
    ].map(item => ({
        ...item,
        population: item.value,
        percentage: ((item.value / total) * 100).toFixed(1),
        legendFontColor: "#000",
        legendFontSize: 16,
    }));


    return (
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.backIcon} onPress={() => router.replace("/(tabs)/home")}>
                    <ChevronLeft size={24} color="#1A1A1A" />
                </TouchableOpacity>

                <Text style={styles.mainText}>
                    Tổng quan ngày {formattedDate}
                </Text>

                {/*  CHART */}
                <PieChart
                    data={nutritionData.map(item => ({
                        name: `% ${item.name}`,
                        population: parseFloat(((item.value / total) * 100).toFixed(1)),
                        color: item.color,
                        legendFontColor: "#000",
                        legendFontSize: 14,
                    }))}
                    width={Dimensions.get("window").width - 40}
                    height={220}
                    chartConfig={{
                        color: () => `#000`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    center={[0, 0]}
                    absolute={true}
                    style={{ marginVertical: 8 }}
                />


                <View style={styles.breakdown}>
                    {nutritionData.map((item, idx) => (
                        <View key={idx} style={styles.nutritionRow}>
                            <View style={[styles.dot, { backgroundColor: item.color }]} />
                            <Text style={styles.nutritionText}>{item.name}</Text>
                            <Text style={styles.value}>{item.population}g</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.inputButton} onPress={() => router.push("/(nutrition)/dataInput")}>
                <Text style={styles.inputText}>Nhập bữa ăn hôm nay</Text>
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
        alignItems: "center",
    },
    backIcon: {
        alignSelf: "flex-start",
        marginBottom: 15,
    },
    mainText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
        color: "#000",
    },
    breakdown: {
        width: "100%",
        marginTop: 16,
    },
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
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    nutritionText: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
    },
    value: {
        fontSize: 14,
        color: "#555",
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
});
