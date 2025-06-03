import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function OverviewScreen() {
    const router = useRouter();

    const fat = 80;
    const protein = 160;
    const carbs = 230;
    const caloriesConsumed = 1960;

    const nutritionData = [
        { name: "Chất béo", population: fat, color: "#D9C2FF", legendFontColor: "#000", legendFontSize: 14 },
        { name: "Protein", population: protein, color: "#FFD4C2", legendFontColor: "#000", legendFontSize: 14 },
        { name: "Carbohydrate", population: carbs, color: "#FFC2C2", legendFontColor: "#000", legendFontSize: 14 },
    ];

    // Get screen width for chart sizing
    const screenWidth = Dimensions.get("window").width - 40; // 20 padding each side

    return (
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.backIcon} onPress={() => router.replace("/(tabs)/home")}>
                    <ChevronLeft size={24} color="#1A1A1A" />
                </TouchableOpacity>

                <Text style={styles.mainText}>
                    Bạn đã nạp vào tổng <Text style={{ color: "#72C15F" }}>{caloriesConsumed} calo</Text> hôm qua
                </Text>

                {/*  CHART */}

                {/* Custom legend */}
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

            {/* Fixed bottom button */}
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
        marginBottom: 12,
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
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        marginBottom: 8,
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
