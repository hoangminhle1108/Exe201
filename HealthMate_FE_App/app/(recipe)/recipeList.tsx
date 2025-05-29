import React from "react";
import { View, FlatList, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Colors from "@/constants/colors";
import CategoryItem from "../components/CategoryItem";
import { ChevronLeft, Heart } from "lucide-react-native";
import { useRouter } from "expo-router";
import { categories, destinations } from "@/constants/destinations";

export default function RecipeList() {
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

            <Text style={styles.sectionTitle}>Bộ sưu tập</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recommendationContainer}>
                {["Dinh dưỡng", "Vận động", "Giảm cân", "Tăng cân", "Đồ ăn nhanh"].map((label, idx) => (
                    <CategoryItem
                        key={idx}
                        name={label}
                        image="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=200"
                        onPress={() => console.log(`Pressed ${label}`)}
                    />
                ))}
            </ScrollView>


            <Text style={styles.sectionTitle}>Công thức được yêu thích</Text>
            <View style={styles.content}>
                <View>
                    <FlatList
                        data={destinations.slice(0, 3)}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <RecipeCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                location={item.location}
                                rating={item.rating}
                                image={item.image}
                                tags={["Dinh dưỡng", "Giảm cân"]}
                            />
                        )}
                        contentContainerStyle={styles.horizontalList}
                    />
                </View>
            </View>


            <Text style={styles.sectionTitle}>Toàn bộ công thức</Text>
            <View style={styles.fullRecipeList}>
                {[
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
                    {
                        title: "Bơ xào bắp",
                        likes: 131,
                        image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=200",
                    },
                ].map((item, idx) => (
                    <View key={idx} style={styles.fullRecipeCard}>
                        <Image source={{ uri: item.image }} style={styles.fullRecipeImage} />
                        <View style={styles.fullRecipeInfo}>
                            <Text style={styles.fullRecipeTitle}>{item.title}</Text>

                            <View style={styles.tagsContainer}>
                                {["Dinh dưỡng", "Giảm cân"].map((tag, i) => (
                                    <View
                                        key={i}
                                        style={[
                                            styles.tag,
                                            { backgroundColor: getTagStyle(tag).backgroundColor },
                                        ]}
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
                                <Text style={styles.detailLink}>Xem chi tiết &gt;</Text>
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
        marginBottom: 0,
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
        marginTop: 10,
        marginBottom: 12,
        color: Colors.text,
        padding: 10,
    },
    recommendationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    fullRecipeList: {
        marginTop: -5,
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
        backgroundColor: "#eee",
    },

    tagText: {
        fontSize: 12,
        fontWeight: "500",
        color: Colors.text,
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
    content: {
        paddingHorizontal: 5,
        marginBottom: 5,
    },
    horizontalList: {
        paddingRight: 24,
    },
});
