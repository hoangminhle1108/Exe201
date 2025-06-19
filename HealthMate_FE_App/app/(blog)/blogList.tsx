import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import SearchBar from "../components/SearchBar";
import BlogCard from "../components/BlogCard";
import Colors from "@/constants/colors";
import CategoryItem from "../components/CategoryItem";
import { ChevronLeft, Heart } from "lucide-react-native";
import { useRouter } from "expo-router";
import { API_URL } from "@env";

export default function BlogList() {
    const router = useRouter();
    type Tag = {
        tagId: number;
        tagName: string;
        description: string;
    };

    type Article = {
        articleId: number;
        title: string;
        imageUrl: string;
        tags: Tag[];
        likes: number;
        likesCount: number;
        author: string;
    };

    const [articles, setArticles] = useState<Article[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingPopular, setLoadingPopular] = useState(true);
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [categories, setCategories] = useState<Tag[]>([]);
    const [popularArticles, setPopularArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/Article/categories`);
                const data = await response.json();
                if (response.ok) {
                    setCategories(data);
                } else {
                    console.error("Failed to fetch categories");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        };

        const fetchArticles = async () => {
            try {
                const response = await fetch(`${API_URL}/Article`);
                const data = await response.json();
                if (response.ok) {
                    setArticles(data);
                } else {
                    console.error("Failed to fetch articles.");
                }
            } catch (error) {
                console.error("Lỗi khi tải bài viết:", error);
            } finally {
                setLoadingArticles(false);
            }
        };

        const fetchPopularArticles = async () => {
            try {
                const response = await fetch(`${API_URL}/Article/popular`);
                const data = await response.json();
                if (response.ok) {
                    setPopularArticles(data);
                } else {
                    console.error("Failed to fetch popular articles.");
                }
            } catch (error) {
                console.error("Error fetching popular articles:", error);
            } finally {
                setLoadingPopular(false);
            }
        };

        fetchArticles();
        fetchCategories();
        fetchPopularArticles();
    }, []);


    const getTagStyle = (tagName: string | undefined) => {
        if (typeof tagName !== "string") {
            return { backgroundColor: "#e5e7eb", color: "#374151" };
        }

        switch (tagName.toLowerCase()) {
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

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.searchHeader}>
                <TouchableOpacity onPress={() => router.replace("/(tabs)/home")} style={styles.backButton}>
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

            <Text style={styles.sectionTitle}>Danh mục bài viết</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recommendationContainer}>
                {loadingCategories ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                    categories.map((category) => (
                        <CategoryItem
                            key={category.tagId}
                            name={category.tagName}
                            description={category.description}
                            onPress={() =>
                                router.push({
                                    pathname: "/(blog)/blogCategory",
                                    params: { tagId: category.tagId.toString(), tagName: category.tagName },
                                })
                            }
                        />
                    ))
                )}
            </ScrollView>

            <Text style={styles.sectionTitle}>Bài viết được yêu thích</Text>
            {loadingPopular ? (
                <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
                <FlatList
                    data={popularArticles}
                    keyExtractor={(item) => item.articleId.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <BlogCard
                            key={item.articleId.toString()}
                            id={item.articleId.toString()}
                            name={item.title}
                            location={item.author}
                            rating={item.likesCount}
                            image={item.imageUrl}
                            tags={item.tags.map((tag) => tag.tagName)}
                        />
                    )}
                    contentContainerStyle={styles.horizontalList}
                />
            )}

            <Text style={styles.sectionTitle}>Toàn bộ bài viết</Text>
            <View style={styles.fullRecipeList}>
                {loadingArticles ? (
                    <ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                    articles.map((item, idx) => (
                        <View key={idx} style={styles.fullRecipeCard}>
                            <Image
                                source={{ uri: item?.imageUrl || "https://cdn-icons-png.flaticon.com/512/135/135620.png" }}
                                style={styles.fullRecipeImage}
                            />
                            <View style={styles.fullRecipeInfo}>
                                <Text style={styles.fullRecipeTitle}>{item?.title || "Không có tiêu đề"}</Text>
                                <View style={styles.tagsContainer}>
                                    {(item?.tags?.length > 0
                                        ? item.tags.map((t) => t.tagName)
                                        : ["Dinh dưỡng"]
                                    ).map((tagName: string, i: number) => (
                                        <View
                                            key={i}
                                            style={[
                                                styles.tag,
                                                { backgroundColor: getTagStyle(tagName).backgroundColor },
                                            ]}
                                        >
                                            <Text style={[styles.tagText, { color: getTagStyle(tagName).color }]}>
                                                {tagName}
                                            </Text>
                                        </View>
                                    ))}
                                </View>


                                <View style={styles.bottomRow}>
                                    <View style={styles.likesContainer}>
                                        <Heart size={12} color={Colors.rating} fill={Colors.rating} />
                                        <Text style={styles.likesText}>{item?.likesCount ?? 0}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => router.push(`/(blog)/blogDetail?id=${item?.articleId}`)}
                                    >
                                        <Text style={styles.detailLink}>Xem chi tiết &gt;</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))
                )}
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
        marginLeft: 5
    },
});
