import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function DataInputScreen() {
    const router = useRouter();

    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const sections = [
        { title: "Bữa sáng" },
        { title: "Bữa trưa" },
        { title: "Bữa chiều" },
        { title: "Các bữa khác", subtitle: "(Không khuyến khích)" },
    ];

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.mainTitle}>
                        Bữa ăn ngày {formattedDate}
                    </Text>

                    {sections.map((section, idx) => (
                        <View key={idx} style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                {section.title}{" "}
                                {section.subtitle && <Text style={styles.subtitle}>{section.subtitle}</Text>}
                            </Text>
                            <TextInput style={styles.input} placeholder="Món ăn" />
                            <TextInput style={styles.input} placeholder="Thành phần" />
                        </View>
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.confirmButton} onPress={() => router.push("/(nutrition)/overview")}>
                    <Text style={styles.confirmText}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        padding: 20,
    },
    backIcon: { marginBottom: 15 },
    mainTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
        color: "#000",
    },
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
    subtitle: { fontSize: 12, color: "#888" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    confirmButton: {
        backgroundColor: "#72C15F",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    confirmText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },

});
