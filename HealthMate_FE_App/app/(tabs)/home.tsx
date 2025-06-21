
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { Crown, Calendar } from "lucide-react-native";
import { Feather } from '@expo/vector-icons';
import SectionHeader from "../components/SectionHeader";
import FeatureCard from "../components/FeatureCard";
import BlogCard from "../components/BlogCard";
import RecipeCard from "../components/RecipeCard";
import Colors from "@/constants/colors";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { API_URL } from "@env";

dayjs.locale("vi");

const DATA = [
  { type: "header" },
  { type: "date" },
  { type: "features" },
  { type: "post" },
  { type: "recipe" },
];

const capitalizeWords = (str: string) =>
  str.replace(/\p{L}[\p{L}\p{M}]*/gu, (word) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

const today = dayjs().format("dddd, [Ngày] DD [Tháng] MM [Năm] YYYY");
const formattedDate = capitalizeWords(today);

type Recipe = {
  recipeId: number;
  title: string;
  imageUrl: string;
  likes: number;
  categories?: {
    categoryId: number;
    categoryName: string;
  }[] | null;
};

const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);

export default function Home() {
  const router = useRouter();
  const [fullName, setFullName] = useState("Người dùng");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [premiumExpiry, setPremiumExpiry] = useState<string | null>(null);
  const [popularArticles, setPopularArticles] = useState<any[]>([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
  const [loadingPopularRecipe, setLoadingPopularRecipe] = useState(true);

  useEffect(() => {
    const fetchUserFullName = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        if (!email) return;

        const response = await fetch(`${API_URL}/User/all_user_by_email/${email}`);
        const userArray = await response.json();

        if (response.ok && userArray.length > 0) {
          setFullName(userArray[0].fullName || "Người dùng");
          setAvatarUrl(userArray[0].avatarUrl);
          setPremiumExpiry(userArray[0].premiumExpiry);

        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
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

    const fetchPopularRecipes = async () => {
      try {
        const response = await fetch(`${API_URL}/Recipe/popular`);
        const data = await response.json();
        if (response.ok) {
          setPopularRecipes(data);
        } else {
          console.error("Failed to fetch popular recipes.");
        }
      } catch (error) {
        console.error("Error fetching popular recipes:", error);
      } finally {
        setLoadingPopularRecipe(false);
      }
    };

    fetchPopularRecipes();
    fetchPopularArticles();
    fetchUserFullName();
  }, []);

  const renderItem = ({ item }: any) => {
    switch (item.type) {
      case "header":
        return (
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                <Image
                  source={
                    avatarUrl
                      ? avatarUrl
                      : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  style={styles.avatar}
                  contentFit="cover"
                />
              </View>
              <View>
                <Text style={styles.welcomeText}>Chào mừng</Text>
                <Text style={styles.userName}>{fullName}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => router.replace("/(premium)/list")}
              style={styles.notificationButton}
            >
              <Crown
                size={24}
                color={premiumExpiry ? Colors.secondary : Colors.text}
              />
            </TouchableOpacity>
          </View>
        );
      case "date":
        return (
          <View style={[styles.dateSection, { paddingTop: 10 }]}>
            <Calendar size={30} color={Colors.textSecondary} style={styles.dateIcon} />
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.dateLabel}>Hôm nay</Text>
                <Feather name="sun" size={16} color={Colors.secondary} style={{ marginLeft: 6 }} />
              </View>
              <Text style={styles.dateText}>{formattedDate}</Text>
            </View>
          </View>
        );

      case "features":
        return (
          <View style={[styles.content, { paddingTop: 10 }]}>
            <SectionHeader title="Tính năng" />

            <View style={[styles.featuresGrid, { paddingTop: 10 }]}>
              <FeatureCard
                type="post"
                title="Bài viết"
                value="20+"
                updated="bài viết về sức khỏe"
                color="#8a9eff"
                onPress={() => router.replace("/(blog)/blogList")}
              />
              <FeatureCard
                type="recipe"
                title="Công thức"
                value="30+"
                updated="công thức nấu ăn"
                color="#d15d5d"
                onPress={() => router.replace("/(recipe)/recipeList")}
              />
              <FeatureCard
                type="ai"
                title="Trò chuyện với AI"
                value="24/7"
                updated="tìm các lời khuyên bổ ích"
                color="#72C15F"
                onPress={() => router.push("/(tabs)/chatbot")}
              />
              <FeatureCard
                type="nutrition"
                title="Phân tích dinh dưỡng"
                value="mỗi ngày"
                updated="theo dõi sức khỏe"
                color="#f39c6b"
                onPress={() => router.replace("/(nutrition)/overview")}
              />
            </View>
          </View >
        );
      case "post":
        return (
          <View style={styles.postContent}>
            <View style={styles.section}>
              <SectionHeader
                title="Bài viết"
                onViewAll={() => router.replace("/(blog)/blogList")}
              />
              {loadingPopular ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <FlatList
                  data={popularArticles.slice(0, 5)}
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
                      tags={item.tags.map((tag: any) => tag.tagName)}
                    />
                  )}
                  contentContainerStyle={styles.horizontalList}
                />
              )}
            </View>
          </View>
        );
      case "recipe":
        return (
          <View style={styles.recipeContent}>
            <View style={styles.section}>
              <SectionHeader
                title="Công thức"
                onViewAll={() => router.replace("/(recipe)/recipeList")}
              />
              {loadingPopularRecipe ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <FlatList
                  data={popularRecipes.slice(0, 5)}
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
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: Colors.backgroundAlt,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  postContent: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  recipeContent: {
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 32
  },
  content: {
    paddingHorizontal: 24,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 24,
  },
  categoriesContainer: {
    marginBottom: 32,
  },
  categoriesList: {
    paddingRight: 16,
  },
  section: {},
  horizontalList: {
    paddingRight: 24,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 16,
  },
  largeImageContainer: {
    height: 80,
    width: 80,
    borderRadius: 12,
    marginRight: 12,
    overflow: "hidden",
    backgroundColor: Colors.backgroundAlt,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 12,
    resizeMode: "cover",
    marginRight: 12,
  },
  ratingContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  infoContainer: {
    padding: 12,
    backgroundColor: Colors.card,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  arrowContainer: {
    paddingRight: 16,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginTop: -12,
    marginBottom: 12,
  },
  dateSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 14,
    paddingTop: 0,
  },
  dateIcon: {
    marginRight: 12,
  },
  dateLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

});
