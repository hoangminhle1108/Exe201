
import React from "react";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Crown } from "lucide-react-native";
import { Feather } from '@expo/vector-icons';
import SectionHeader from "../components/SectionHeader";
import FeatureCard from "../components/FeatureCard";
import BlogCard from "../components/BlogCard";
import { destinations } from "@/constants/destinations";
import Colors from "@/constants/colors";
import { Calendar } from "lucide-react-native";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");


const DATA = [
  { type: "header" },
  { type: "date" },
  { type: "features" },
  { type: "post" },
];

const capitalizeWords = (str: string) =>
  str.replace(/\p{L}[\p{L}\p{M}]*/gu, (word) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

const today = dayjs().format("dddd, [Ngày] DD [Tháng] MM [Năm] YYYY");
const formattedDate = capitalizeWords(today);

export default function Home() {
  const router = useRouter();

  const renderItem = ({ item }: any) => {
    switch (item.type) {
      case "header":
        return (
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                <Image
                  source={"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=200"}
                  style={styles.avatar}
                />
              </View>
              <View>
                <Text style={styles.welcomeText}>Chào mừng</Text>
                <Text style={styles.userName}>Nguyen Tran</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.replace("/(premium)/list")} style={styles.notificationButton}>
              <Crown size={24} color={Colors.text} />
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
                <Feather name="sun" size={16} color={Colors.textSecondary} style={{ marginLeft: 6 }} />
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
                value="50+"
                updated="bài viết về sức khỏe"
                color="#8a9eff"
                onPress={() => router.replace("/(blog)/blogList")}
              />
              <FeatureCard
                type="recipe"
                title="Công thức"
                value="100+"
                updated="công thức nấu ăn"
                color="#d15d5d"
                onPress={() => router.replace("/(recipe)/recipeList")}
              />
              <FeatureCard
                type="ai"
                title="Trò chuyện với AI"
                value="7:30 pm"
                updated="lần cuối 10 phút trước"
                color="#72C15F"
                onPress={() => router.push("/(tabs)/chatbot")}
              />
              <FeatureCard
                type="nutrition"
                title="Phân tích dinh dưỡng"
                value="960 calo"
                updated="cập nhật 13 tiếng trước"
                color="#f39c6b"
                onPress={() => router.replace("/(nutrition)/overview")}
              />
            </View>
          </View >
        );
      case "post":
        return (
          <View style={styles.content}>
            <View style={styles.section}>
              <SectionHeader
                title="Bài viết"
                onViewAll={() => router.replace("/(blog)/blogList")}
              />
              <FlatList
                data={destinations.slice(0, 3)}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <BlogCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    location={item.location}
                    rating={item.rating}
                    image={item.image}
                  />
                )}
                contentContainerStyle={styles.horizontalList}
              />
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
    paddingBottom: 24,
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
    paddingBottom: 16,
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
