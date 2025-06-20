import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { Heart, ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";

interface BlogCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  isLarge?: boolean;
  tags: string[];
}

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
    default:
      return { backgroundColor: "#e5e7eb", color: "#374151" };
  }
};

const BlogCard = ({
  id,
  name,
  location,
  rating,
  tags,
  image,
  isLarge = false,
}: BlogCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(blog)/blogDetail?id=${id}`);
  };

  return (
    <TouchableOpacity
      style={[styles.container, isLarge && styles.largeContainer]}
      onPress={handlePress}
    >
      <View
        style={[
          styles.imageContainer,
          isLarge && styles.largeImageContainer,
        ]}
      >
        <Image
          source={{ uri: image }}
          style={isLarge ? styles.largeImage : styles.image}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.ratingContainer}>
          <Heart size={12} color={Colors.rating} fill={Colors.rating} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.tagsContainer}>
          {tags?.slice(0, 2).map((tag, index) => {
            const tagStyle = getTagStyle(tag);
            return (
              <View
                key={index}
                style={[
                  styles.tag,
                  { backgroundColor: tagStyle.backgroundColor },
                ]}
              >
                <Text
                  style={[styles.tagText, { color: tagStyle.color }]}
                >
                  {tag}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <View style={styles.locationContainer}>
          <Text style={styles.location} numberOfLines={1}>
            Xem chi tiết &gt;
          </Text>
        </View>
      </View>

      {isLarge && (
        <View style={styles.arrowContainer}>
          <ChevronRight size={20} color={Colors.primary} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    width: Dimensions.get("window").width * 0.6,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    display: "flex",
  },
  largeContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 0,
  },
  imageContainer: {
    width: "100%",
    position: "relative",
    backgroundColor: "#fff",
  },
  largeImageContainer: {
    height: 80,
    width: "100%",
    borderRadius: 12,
    marginRight: 12,
    overflow: "hidden",
    backgroundColor: Colors.backgroundAlt,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 12,
  },
  largeImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  ratingContainer: {
    position: "absolute",
    top: 10,
    right: 10,
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
    flex: 1,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
    marginLeft: -3,
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
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
    flexShrink: 1,
    maxWidth: 200,
    lineHeight: 20,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  location: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  arrowContainer: {
    paddingRight: 16,
  },
});

export default BlogCard;
