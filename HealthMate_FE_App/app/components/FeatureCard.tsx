import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
    MaterialIcons,
    Ionicons,
    Entypo,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

const iconMap: any = {
    post: <MaterialIcons name="article" size={32} color="white" />,
    recipe: <MaterialCommunityIcons name="food-apple" size={32} color="white" />,
    ai: <Ionicons name="logo-android" size={32} color="white" />,
    nutrition: <Entypo name="bowl" size={32} color="white" />,
};

const FeatureCard = ({ type, title, value, updated, color, onPress }: any) => {
    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
            <View style={styles.icon}>{iconMap[type]}</View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.updated}>{updated}</Text>
        </TouchableOpacity>
    );
};

export default FeatureCard;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        minWidth: "48%",
        height: 135,
        borderRadius: 16,
        padding: 12,
    },
    icon: {
        marginBottom: 6,
    },
    title: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
    value: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    updated: {
        color: "white",
        fontSize: 12,
        marginTop: 4,
    },
});
