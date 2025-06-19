import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import SearchBar from "../components/SearchBar";
import { ChevronLeft, Heart } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/colors";
import { API_URL } from "@env";

export default function BlogSearch() {
    const router = useRouter();
    const { q } = useLocalSearchParams();
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
            default:
                return { backgroundColor: "#e5e7eb", color: "#374151" };
        }
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/Article/search?title=${q}`);
                const data = await response.json();
                if (response.ok) {
                    setResults(data);
                } else {
                    console.error("Failed to fetch search results.");
                }
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (q) {
            fetchSearchResults();
        }
    }, [q]);

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.searchHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={24} color={Colors.text} />
                </TouchableOpacity>
                <View style={styles.searchBarContainer}>
                    <SearchBar
                        placeholder="Tìm kiếm bài viết theo tên"
                        onSubmit={(text) => {
                            if (text.trim()) {
                                router.push({
                                    pathname: "/(blog)/blogSearch",
                                    params: { q: text },
                                });
                            }
                        }}
                    />
                </View>
            </View>

            <Text style={styles.resultText}>Tìm được {results.length} bài viết cho "{q}"</Text>

            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
            ) : (
                <View style={styles.fullRecipeList}>
                    {results.map((item, idx) => (
                        <View key={idx} style={styles.fullRecipeCard}>
                            <Image source={{ uri: item.imageUrl }} style={styles.fullRecipeImage} />
                            <View style={styles.fullRecipeInfo}>
                                <Text style={styles.fullRecipeTitle}>{item.title}</Text>

                                <View style={styles.tagsContainer}>
                                    {(item.tags || []).map((tag: any, i: number) => (
                                        <View
                                            key={i}
                                            style={[styles.tag, { backgroundColor: getTagStyle(tag.tagName).backgroundColor }]}
                                        >
                                            <Text style={[styles.tagText, { color: getTagStyle(tag.tagName).color }]}>
                                                {tag.tagName}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                                <View style={styles.bottomRow}>
                                    <View style={styles.likesContainer}>
                                        <Heart size={12} color={Colors.rating} fill={Colors.rating} />
                                        <Text style={styles.likesText}>{item.likesCount}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => router.push(`/(blog)/blogDetail?id=${item.articleId}`)}
                                    >
                                        <Text style={styles.detailLink}>Xem chi tiết &gt;</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 32,
        backgroundColor: "#fff",
        height: "100%",
    },
    searchHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        marginRight: 8,
        marginBottom: 22,
    },
    searchBarContainer: {
        flex: 1,
    },
    resultText: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.text,
        marginBottom: 16,
    },
    fullRecipeList: {
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
