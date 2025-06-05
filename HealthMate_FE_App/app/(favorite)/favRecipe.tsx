import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Heart } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function FavoriteRecipe() {
    const router = useRouter();

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

    const favoriteRecipes = [
        {
            title: "Trứng rán mỡ",
            likes: 26,
            image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=200",
        },
        {
            title: "Bắp xào bơ",
            likes: 88,
            image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=200",
        },
    ];

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableOpacity
                onPress={() => router.replace("/(tabs)/profile")}
                style={styles.backIcon}
            >
                <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Công thức yêu thích</Text>

                {favoriteRecipes.map((item, idx) => (
                    <View key={idx} style={styles.fullRecipeCard}>
                        <Image source={{ uri: item.image }} style={styles.fullRecipeImage} />
                        <View style={styles.fullRecipeInfo}>
                            <Text style={styles.fullRecipeTitle}>{item.title}</Text>

                            <View style={styles.tagsContainer}>
                                {["Dinh dưỡng", "Giảm cân"].map((tag, i) => (
                                    <View
                                        key={i}
                                        style={[styles.tag, { backgroundColor: getTagStyle(tag).backgroundColor }]}
                                    >
                                        <Text style={[styles.tagText, { color: getTagStyle(tag).color }]}>
                                            {tag}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.bottomRow}>
                                <View style={styles.likesContainer}>
                                    <Heart size={12} color={Colors.rating} fill={Colors.rating} />
                                    <Text style={styles.likesText}>{item.likes}</Text>
                                </View>
                                <TouchableOpacity onPress={() => router.push(`/(favorite)/recipeFavDetail`)}>
                                    <Text style={styles.detailLink}>Xem chi tiết &gt;</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        padding: 24,
        paddingTop: 65,
        paddingBottom: 120,
    },
    backIcon: {
        position: "absolute",
        top: 30,
        left: 24,
        zIndex: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    fullRecipeCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        marginBottom: 12,
    },
    fullRecipeImage: {
        width: 100,
        height: 80,
        borderRadius: 12,
        marginRight: 12,
    },
    fullRecipeInfo: {
        flex: 1,
    },
    fullRecipeTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.text,
        marginBottom: 4,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
        marginBottom: 6,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    tagText: {
        fontSize: 12,
        fontWeight: "500",
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 6,
    },
    likesContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    likesText: {
        fontSize: 13,
        color: Colors.text,
    },
    detailLink: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
});
