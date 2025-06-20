import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Heart } from "lucide-react-native";
import Colors from "@/constants/colors";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getTagStyle = (tag: string) => {
    switch (tag.toLowerCase()) {
        case "dinh dưỡng":
            return { backgroundColor: "#f3e8ff", color: "#7e22ce" };
        case "giảm cân":
            return { backgroundColor: "#fef3c7", color: "#f97316" };
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

type Tag = { tagId: number; tagName: string };
type Article = {
    articleId: number;
    title: string;
    content: string;
    imageUrl: string;
    author: string;
    publishedAt: string;
    tags: Tag[];
};

export default function BlogDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`${API_URL}/Article/${id}`);
                const data = await response.json();
                if (response.ok) setArticle(data);
                else console.error("Failed to fetch article.");
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };

        const checkFavorite = async () => {
            const stored = await AsyncStorage.getItem("favoriteBlogs");
            const favorites = stored ? JSON.parse(stored) : [];
            const exists = favorites.some((fav: Article) => fav.articleId === Number(id));
            setIsFavorite(exists);
        };

        if (id) {
            fetchArticle();
            checkFavorite();
        }
    }, [id]);

    const handleToggleFavorite = async () => {
        if (!article) return;

        const stored = await AsyncStorage.getItem("favoriteBlogs");
        const favorites: Article[] = stored ? JSON.parse(stored) : [];

        if (isFavorite) {
            try {
                await fetch(`${API_URL}/Article/${id}/unlike`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
                const updated = favorites.filter(fav => fav.articleId !== article.articleId);
                await AsyncStorage.setItem("favoriteBlogs", JSON.stringify(updated));
                setIsFavorite(false);
            } catch (error) {
                console.error("Error unliking article:", error);
            }
        } else {
            try {
                await fetch(`${API_URL}/Article/${id}/like`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
                const exists = favorites.some(fav => fav.articleId === article.articleId);
                if (!exists) {
                    const updated = [...favorites, article];
                    await AsyncStorage.setItem("favoriteBlogs", JSON.stringify(updated));
                }
                setIsFavorite(true);
            } catch (error) {
                console.error("Error liking article:", error);
            }
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 100 }} />;
    }

    if (!article) {
        return (
            <View style={{ padding: 20 }}>
                <Text style={{ color: "red" }}>Không tìm thấy bài viết.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: article.imageUrl || "https://cdn-icons-png.flaticon.com/512/135/135620.png" }}
                    style={styles.image}
                />
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.heartButton} onPress={handleToggleFavorite}>
                        <Heart size={24} color="#DE3B40" fill={isFavorite ? "#DE3B40" : "none"} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.tagsContainer}>
                    {article.tags.map((tag, index) => (
                        <View key={index} style={[styles.tag, { backgroundColor: getTagStyle(tag.tagName).backgroundColor }]}>
                            <Text style={[styles.tagText, { color: getTagStyle(tag.tagName).color }]}>{tag.tagName}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.title}>{article.title}</Text>

                <View style={styles.metaRow}>
                    <Text style={styles.meta}>Tác giả: {article.author}</Text>
                    <Text style={styles.meta}>Ngày đăng: {new Date(article.publishedAt).toLocaleDateString("vi-VN")}</Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.description}>{article.content}</Text>
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
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    meta: {
        fontSize: 13,
        color: "#6b7280",
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
        marginTop: 10,
        marginBottom: 15,
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
