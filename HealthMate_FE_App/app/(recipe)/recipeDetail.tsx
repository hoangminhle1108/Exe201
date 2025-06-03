import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Heart } from "lucide-react-native";
import Colors from "@/constants/colors";

const getTagStyle = (tag: string) => {
    switch (tag.toLowerCase()) {
        case "dinh dưỡng":
            return { backgroundColor: "#f3e8ff", color: "#7e22ce" };
        case "giảm cân":
            return { backgroundColor: "#dcfce7", color: "#16a34a" };
        default:
            return { backgroundColor: "#e5e7eb", color: "#374151" };
    }
};

export default function RecipeDetail() {
    const router = useRouter();
    const { name = "Quinoa Salad" } = useLocalSearchParams();
    const tags = ["Dinh dưỡng", "Giảm cân"];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Image Header */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=200" }}
                    style={styles.image}
                />

                {/* Back & Heart Icons */}
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.heartButton}>
                        <Heart size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Recipe Info */}
            <View style={styles.infoContainer}>
                {/* Tags */}
                <View style={styles.tagsContainer}>
                    {tags.map((tag, index) => (
                        <View key={index} style={[styles.tag, { backgroundColor: getTagStyle(tag).backgroundColor }]}>
                            <Text style={[styles.tagText, { color: getTagStyle(tag).color }]}>{tag}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.title}>{name}</Text>

                {/* Description */}
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>
                    Quinoa salad is a healthy mix of cooked quinoa, fresh veggies, and a zesty lemon dressing...
                </Text>
                <View style={styles.divider} />

                {/* Ingredients */}
                <Text style={styles.sectionTitle}>Ingredients</Text>
                {[
                    ["Quinoa (cooked)", "1 cup"],
                    ["Cucumber (diced)", "1 piece"],
                    ["Tomato (chopped)", "1 piece"],
                    ["Bell pepper (chopped)", "1 piece"],
                    ["Red onion (finely chopped)", "1/4 cup"],
                    ["Feta Cheese (crumbled)", "1/4 cup"],
                    ["Olive oil (extra virgin)", "2 tbsp"],
                ].map(([ingredient, quantity], idx) => (
                    <View key={idx} style={styles.ingredientRow}>
                        <Text style={styles.ingredientName}>{ingredient}</Text>
                        <Text style={styles.ingredientQty}>{quantity}</Text>
                    </View>
                ))}
                <View style={styles.divider} />

                {/* Instructions */}
                <Text style={styles.sectionTitle}>Instructions</Text>
                <Text style={styles.description}>
                    Cook the quinoa: Rinse 1 cup of quinoa under cold water, then cook according to package instructions. Let it cool...
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        width: "100%",
        height: 220,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerIcons: {
        position: "absolute",
        top: 21,
        left: 13,
        right: 13,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backButton: {
        backgroundColor: "#fff",
        paddingTop: 5,
        paddingRight: 6,
        paddingBottom: 5,
        paddingLeft: 4,
        borderRadius: 20,
        elevation: 3,
    },
    heartButton: {
        backgroundColor: "#fff",
        paddingTop: 6,
        paddingRight: 5,
        paddingBottom: 4,
        paddingLeft: 5,
        borderRadius: 20,
        elevation: 3,
    },
    infoContainer: {
        padding: 20,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
        marginBottom: 15,
        marginTop: -5,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 6,
        marginBottom: 6,
    },
    tagText: {
        fontSize: 12,
        fontWeight: "500",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
        color: Colors.text,
        alignSelf: "center",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 10,
        color: Colors.text,
    },
    description: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 20,
    },
    divider: {
        height: 1,
        backgroundColor: "#e5e7eb",
        marginTop: 25,
        marginBottom: 5,
    },
    ingredientRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
    },
    ingredientName: {
        fontSize: 14,
        color: Colors.text,
    },
    ingredientQty: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
});
