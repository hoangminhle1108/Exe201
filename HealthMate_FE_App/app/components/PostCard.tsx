
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { Heart, MapPin, ChevronRight } from "lucide-react-native";
import { Link } from "expo-router";
import Colors from "@/constants/colors";

interface PostCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  isLarge?: boolean;
}

const PostCard = ({
  id,
  name,
  location,
  rating,
  image,
  isLarge = false,
}: PostCardProps) => {
  const CardContent = () => (
    <>
      <View
        style={[styles.imageContainer, isLarge && styles.largeImageContainer]}
      >
        <Image
          source={{ uri: image }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.ratingContainer}>
          <Heart size={12} color={Colors.rating} fill={Colors.rating} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
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
    </>
  );

  if (Platform.OS === "web") {
    return (
      <Link
        href={`/destinations/${id}`}
        style={[styles.container, isLarge && styles.largeContainer]}
      >
        <CardContent />
      </Link>
    );
  }

  return (
    <Link href={`/destinations/${id}`} asChild>
      <TouchableOpacity
        style={[styles.container, isLarge && styles.largeContainer]}
      >
        <CardContent />
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    width: Dimensions.get("window").width * 0.7,
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
    marginRight: 5,
    marginLeft: 5,
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
    marginRight: 7,
    marginLeft: 7,
  },
  ratingContainer: {
    position: "absolute",
    top: 12,
    right: 25,
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

export default PostCard;
