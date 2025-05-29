
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
import { Heart, ChevronRight } from "lucide-react-native";
import { Link } from "expo-router";
import Colors from "@/constants/colors";

interface RecipeCardProps {
    id: string;
    name: string;
    location: string;
    rating: number;
    image: string;
    tags: string[];
    isLarge?: boolean;
}

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


const RecipeCard = ({
    id,
    name,
    location,
    rating,
    image,
    tags,
    isLarge = false,
}: RecipeCardProps) => {
    const CardContent = () => (
        <>
            <View
                style={styles.imageContainer}
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
                <View style={styles.tagsContainer}>
                    {tags?.map((tag, index) => (
                        <View key={index} style={[styles.tag, { backgroundColor: getTagStyle(tag).backgroundColor }]}>
                            <Text style={[styles.tagText, { color: getTagStyle(tag).color }]}>{tag}</Text>
                        </View>
                    ))}
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
    largeContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },
    imageContainer: {
        width: "100%",
        position: "relative",
        backgroundColor: "#fff",
        marginRight: 5,
        marginLeft: 5,
    },
    image: {
        width: 200,
        height: 150,
        borderRadius: 12,
        resizeMode: "cover",
        marginRight: 7,
        marginLeft: 7,
    },
    ratingContainer: {
        position: "absolute",
        top: 12,
        right: 10,
        marginRight: 20,
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

export default RecipeCard;
