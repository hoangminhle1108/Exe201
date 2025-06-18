import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "@/constants/colors";

interface CategoryItemProps {
  name: string;
  description?: string;
  onPress: () => void;
}

const CategoryItem = ({ name, description, onPress }: CategoryItemProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{name}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 6,
    minWidth: 120,
    justifyContent: "center",
    alignItems: "flex-start",
    elevation: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  description: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 4,
  },
});

export default CategoryItem;
