import React, { useEffect, useState } from "react";
import { API_URL } from "@env";
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
import RecipeCard from "../components/RecipeCard";
import Colors from "@/constants/colors";
import CategoryItem from "../components/CategoryItem";
import { ChevronLeft, Heart } from "lucide-react-native";
import { useRouter } from "expo-router";

type Recipe = {
    recipeId: number;
    title: string;
    imageUrl: string;
    likes: number;
    categories?: Category[] | null;
};

type Category = {
    categoryId: number;
    categoryName: string;
    description: string;
};

export default function RecipeList() {
    const router = useRouter();
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingAll, setLoadingAll] = useState(true);
    const [loadingPopular, setLoadingPopular] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`${API_URL}/Recipe`);
                const data = await response.json();
                setAllRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoadingAll(false);
            }
        };

        const fetchPopularRecipes = async () => {
            try {
                const response = await fetch(`${API_URL}/Recipe/popular`);
                const data = await response.json();
                if (response.ok) {
                    setPopularRecipes(data);
                } else {
                    console.error("Failed to fetch popular recipes");
                }
            } catch (error) {
                console.error("Error fetching popular recipes:", error);
            } finally {
                setLoadingPopular(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/Recipe/categories`);
                const data = await response.json();
                if (response.ok) {
                    setCategories(data);
                } else {
                    console.error("Failed to fetch recipe categories");
                }
            } catch (error) {
                console.error("Error fetching recipe categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchRecipes();
        fetchPopularRecipes();
        fetchCategories();
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
            case "món chính":
                return { backgroundColor: "#e0f2fe", color: "#0284c7" };
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
                        placeholder="Tìm kiếm công thức theo tên"
                        onSubmit={async (text) => {
                            if (text.trim()) {
                                try {
                                    const response = await fetch(`${API_URL}/Recipe/search?title=${encodeURIComponent(text)}`);
                                    if (response.ok) {
                                        const data = await response.json();
                                        router.push({
                                            pathname: "/(recipe)/recipeSearch",
                                            params: { q: text, results: JSON.stringify(data) },
                                        });
                                    } else {
                                        console.error("Search failed");
                                    }
                                } catch (err) {
                                    console.error("Error searching recipes:", err);
                                }
                            }
                        }}
                    />
                </View>
            </View>

            <Text style={styles.sectionTitle}>Danh mục công thức</Text>
            {loadingCategories ? (
                <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.recommendationContainer}
                >
                    {categories.map((category) => (
                        <CategoryItem
                            key={category.categoryId}
                            name={category.categoryName}
                            description={category.description}
                            onPress={() => {
                                router.push({
                                    pathname: "/(recipe)/recipeCategory",
                                    params: {
                                        categoryId: category.categoryId.toString(),
                                        categoryName: category.categoryName,
                                    },
                                });
                            }}
                        />
                    ))}
                </ScrollView>
            )}

            <Text style={styles.sectionTitle}>Công thức được yêu thích</Text>
            {loadingPopular ? (
                <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
                <FlatList
                    data={popularRecipes}
                    keyExtractor={(item) => item.recipeId.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <RecipeCard
                            id={item.recipeId.toString()}
                            name={item.title}
                            rating={item.likes}
                            image={item.imageUrl}
                            tags={(item.categories?.map((cat) => cat.categoryName)) || ["Dinh dưỡng"]}
                        />
                    )}
                    contentContainerStyle={styles.horizontalList}
                />
            )}

            <Text style={styles.sectionTitle}>Toàn bộ công thức</Text>
            {loadingAll ? (
                <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
                <View style={styles.fullRecipeList}>
                    {allRecipes.map((item, idx) => (
                        <View key={idx} style={styles.fullRecipeCard}>
                            <Image source={{ uri: item.imageUrl }} style={styles.fullRecipeImage} />
                            <View style={styles.fullRecipeInfo}>
                                <Text style={styles.fullRecipeTitle}>{item.title}</Text>

                                <View style={styles.tagsContainer}>
                                    {(item.categories?.slice(0, 2) || []).map((tag, i) => {
                                        const style = getTagStyle(tag.categoryName);
                                        return (
                                            <View key={i} style={[styles.tag, { backgroundColor: style.backgroundColor }]}>
                                                <Text style={[styles.tagText, { color: style.color }]}>
                                                    {tag.categoryName}
                                                </Text>
                                            </View>
                                        );
                                    })}
                                </View>

                                <View style={styles.bottomRow}>
                                    <View style={styles.likesContainer}>
                                        <Heart size={12} color={Colors.rating} fill={Colors.rating} />
                                        <Text style={styles.likesText}>{item.likes}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() =>
                                            router.push(`/(recipe)/recipeDetail?id=${item.recipeId}`)
                                        }
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
