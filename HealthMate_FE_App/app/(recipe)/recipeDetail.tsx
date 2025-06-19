import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Heart } from "lucide-react-native";
import Colors from "@/constants/colors";
import { API_URL } from "@env";

const getTagStyle = (tag: string) => {
    switch (tag.toLowerCase()) {
        case "dinh dưỡng":
            return { backgroundColor: "#f3e8ff", color: "#7e22ce" };
        case "giảm cân":
            return { backgroundColor: "#dcfce7", color: "#16a34a" };
        case "thể dục":
            return { backgroundColor: "#dbeafe", color: "#1d4ed8" };
        case "sức khỏe":
            return { backgroundColor: "#fef9c3", color: "#ca8a04" };
        case "yoga":
            return { backgroundColor: "#fae8ff", color: "#a21caf" };
        case "ăn chay":
            return { backgroundColor: "#bbf7d0", color: "#15803d" };
        case "ăn kiêng":
            return { backgroundColor: "#fee2e2", color: "#b91c1c" };
        case "món chính":
            return { backgroundColor: "#e0f2fe", color: "#0284c7" };
        default:
            return { backgroundColor: "#e5e7eb", color: "#374151" };
    }
};

export default function RecipeDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [recipe, setRecipe] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await fetch(`${API_URL}/Recipe/${id}`);
                const data = await res.json();
                setRecipe(data);
            } catch (error) {
                console.error("Failed to fetch recipe:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!recipe) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Không thể tải công thức.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.heartButton}>
                        <Heart size={24} color="#DE3B40" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.tagsContainer}>
                    {(recipe.categories && recipe.categories.length > 0
                        ? recipe.categories.map((cat: any) => cat.categoryName)
                        : ["Dinh dưỡng"]
                    ).map((tag: string, index: number) => (
                        <View key={index} style={[styles.tag, { backgroundColor: getTagStyle(tag).backgroundColor }]}>
                            <Text style={[styles.tagText, { color: getTagStyle(tag).color }]}>{tag}</Text>
                        </View>
                    ))}
                </View>


                <Text style={styles.title}>{recipe.title}</Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{recipe.difficulty}</Text>
                        <Text style={styles.statLabel}>Cấp độ</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{recipe.cookingTime} phút</Text>
                        <Text style={styles.statLabel}>Thời gian</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{recipe.servings} người</Text>
                        <Text style={styles.statLabel}>Dành cho</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{recipe.calories}</Text>
                        <Text style={styles.statLabel}>Calo</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Giới thiệu món ăn</Text>
                <Text style={styles.description}>{recipe.description}</Text>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Nguyên liệu cần chuẩn bị</Text>
                {recipe.ingredients?.replace(/\\n/g, '\n').split("\n").map((item: string, index: number) => (
                    <Text key={index} style={styles.description}>• {item.replace(/^- /, "")}</Text>
                ))}
                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Hướng dẫn cách làm</Text>
                {recipe.instructions?.replace(/\\n/g, '\n').split("\n").map((step: string, index: number) => (
                    <Text key={index} style={styles.description}>{step}</Text>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: "#fff" },
    imageContainer: { position: "relative" },
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
        padding: 6,
        borderRadius: 20,
        elevation: 3,
    },
    heartButton: {
        backgroundColor: "#fff",
        padding: 6,
        borderRadius: 20,
        elevation: 3,
    },
    infoContainer: { padding: 20 },
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
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
    },
    statItem: {
        alignItems: "center",
    },
    statValue: {
        fontWeight: "600",
        fontSize: 16,
        color: Colors.text,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
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
        marginBottom: 4,
    },
    divider: {
        height: 1,
        backgroundColor: "#e5e7eb",
        marginTop: 25,
        marginBottom: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    errorText: {
        fontSize: 16,
        color: "red",
    },
});
