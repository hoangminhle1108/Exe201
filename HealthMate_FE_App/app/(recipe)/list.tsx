import React from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import SearchBar from "../components/SearchBar";
import Colors from "@/constants/colors";
import { Heart, ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function RecipeList() {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.searchHeader}>
                <TouchableOpacity onPress={() => router.replace("/(tabs)/home")} style={styles.backButton}>
                    <ChevronLeft size={24} color={Colors.text} />
                </TouchableOpacity>
                <View style={styles.searchBarContainer}>
                    <SearchBar placeholder="Tìm kiếm công thức theo tên" />
                </View>
            </View>

            <Text style={styles.sectionTitle}>Dành cho bạn</Text>
            <View style={styles.recommendationContainer}>
                {["Dinh dưỡng", "Vận động", "Giảm cân"].map((label, idx) => (
                    <View key={idx} style={styles.recommendationBox}>
                        <Image
                            source={{ uri: "https://via.placeholder.com/60" }}
                            style={styles.recommendationImage}
                        />
                        <Text style={styles.recommendationText}>{label}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.sectionTitle}>Các công thức được yêu thích</Text>
            <View style={styles.recipeList}>
                <View style={styles.recipeCard}>
                    <Image
                        source={{ uri: "https://via.placeholder.com/160x120/FF6F61/fff?text=Táo" }}
                        style={styles.recipeImage}
                    />
                    <View style={styles.recipeTags}>
                        <Text style={styles.tag}>🥗 Dinh dưỡng</Text>
                        <Text style={[styles.tag, { backgroundColor: "#E0F7F1", color: "#30B28C" }]}>🌿 Giảm cân</Text>
                    </View>
                    <Text style={styles.recipeTitle}>Mỹ cay hải sản Hàn Quốc 7 cấp độ</Text>
                    <View style={styles.recipeFooter}>
                        <View style={styles.likeContainer}>
                            <Heart size={14} color="#FF4F4F" fill="#FF4F4F" />
                            <Text style={styles.likeText}>178</Text>
                        </View>
                        <Text style={styles.detailLink}>Xem chi tiết &gt;</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Bộ sưu tập</Text>
            <View style={styles.collectionsContainer}>
                <View style={styles.collectionCard}>
                    <Image
                        source={{ uri: "https://via.placeholder.com/300x150" }}
                        style={styles.collectionImage}
                    />
                    <View style={styles.overlay} />
                    <Text style={styles.collectionText}>Công thức nấu ăn giúp giảm cân cấp tốc</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>10 công thức</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Toàn bộ công thức</Text>
            <View style={styles.fullRecipeList}>
                {[
                    {
                        title: "Avocado with Nuts",
                        time: "1 hr 10 min",
                        cal: "195 Cal",
                        portions: "9/15",
                        likes: 4,
                        views: true,
                        image: "https://via.placeholder.com/100x100.png?text=Avocado",
                    },
                    {
                        title: "Cooker Lo Slow",
                        time: "40 min",
                        cal: "875 Cal",
                        portions: "4/4",
                        likes: 21,
                        views: true,
                        image: "https://via.placeholder.com/100x100.png?text=Slow",
                    },
                    {
                        title: "Boiled Eggs with Pate",
                        time: "35 min",
                        cal: "375 Cal",
                        portions: "3/5",
                        likes: 13,
                        views: true,
                        image: "https://via.placeholder.com/100x100.png?text=Eggs",
                    },
                    {
                        title: "Mussel Dish with Lemon",
                        time: "1 hr 5 min",
                        cal: "325 Cal",
                        portions: "2/7",
                        likes: 7,
                        views: true,
                        image: "https://via.placeholder.com/100x100.png?text=Mussels",
                    },
                ].map((item, idx) => (
                    <View key={idx} style={styles.fullRecipeCard}>
                        <Image source={{ uri: item.image }} style={styles.fullRecipeImage} />
                        <View style={styles.fullRecipeInfo}>
                            <Text style={styles.fullRecipeTitle}>{item.title}</Text>
                            <Text style={styles.fullRecipeSub}>{item.time}   {item.cal}</Text>
                            <View style={styles.fullRecipeStats}>
                                <Text style={styles.statItem}>🧑‍🍳 {item.portions}</Text>
                                <Text style={styles.statItem}>💚 {item.likes}</Text>
                                <Text style={styles.statItem}>👁️</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 32,
        backgroundColor: "#fff",
    },
    searchHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    backButton: {
        marginRight: 8,
        marginBottom: 22,
    },
    searchBarContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 24,
        marginBottom: 12,
        color: Colors.text,
    },
    recommendationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    recommendationBox: {
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: 16,
        padding: 12,
        width: 100,
    },
    recommendationImage: {
        width: 48,
        height: 48,
        marginBottom: 8,
    },
    recommendationText: {
        fontSize: 14,
        color: Colors.text,
    },
    recipeList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
    recipeCard: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        marginBottom: 16,
    },
    recipeImage: {
        width: "100%",
        height: 160,
        borderRadius: 12,
        marginBottom: 8,
    },
    recipeTags: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 6,
    },
    tag: {
        backgroundColor: "#EEE",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        fontSize: 12,
        color: "#555",
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.text,
        marginBottom: 8,
    },
    recipeFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    likeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    likeText: {
        marginLeft: 4,
        fontSize: 14,
        color: "#FF4F4F",
    },
    detailLink: {
        fontSize: 14,
        color: Colors.primary,
    },
    collectionsContainer: {
        marginTop: 12,
    },
    collectionCard: {
        marginBottom: 16,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
    },
    collectionImage: {
        width: "100%",
        height: 180,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    collectionText: {
        position: "absolute",
        bottom: 36,
        left: 16,
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    badge: {
        position: "absolute",
        bottom: 12,
        left: 16,
        backgroundColor: "#E6F6EE",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: "#30B28C",
        fontSize: 12,
        fontWeight: "500",
    },
    fullRecipeList: {
        marginTop: 12,
        gap: 12,
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
    },
    fullRecipeImage: {
        width: 80,
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
    fullRecipeSub: {
        fontSize: 13,
        color: "#999",
        marginBottom: 8,
    },
    fullRecipeStats: {
        flexDirection: "row",
        gap: 12,
    },
    statItem: {
        fontSize: 13,
        color: "#30B28C",
    },

});
