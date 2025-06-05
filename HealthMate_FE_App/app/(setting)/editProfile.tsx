import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Pencil, ChevronLeft, Mail, User, Calendar } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function EditProfileScreen() {
    const router = useRouter();

    const [email] = useState("taylorslauren@hotmail.com");
    const [name, setName] = useState("Jennifer Lopez");
    const [dob, setDob] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dobDate, setDobDate] = useState<Date | undefined>(undefined);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDobDate(selectedDate);
            const formatted = selectedDate.toLocaleDateString("vi-VN");
            setDob(formatted);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableOpacity
                onPress={() => router.replace("/(tabs)/profile")}
                style={styles.backIcon}
            >
                <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>

                <View style={styles.avatarContainer}>
                    <Image
                        source={{
                            uri: "https://randomuser.me/api/portraits/women/44.jpg",
                        }}
                        style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.editIcon}>
                        <Pencil size={24} color={Colors.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <TextInput
                        style={[styles.input, styles.disabledInput]}
                        placeholder="Email"
                        value={email}
                        editable={false}
                        selectTextOnFocus={false}
                    />
                    <Mail size={18} color="#999" style={styles.iconEnd} />
                </View>

                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="Họ và tên"
                        value={name}
                        onChangeText={setName}
                    />
                    <User size={18} color="#999" style={styles.iconEnd} />
                </View>

                <Pressable style={styles.inputGroup} onPress={() => setShowDatePicker(true)}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ngày tháng năm sinh"
                        value={dob}
                        editable={false}
                        pointerEvents="none"
                    />
                    <Calendar size={18} color="#999" style={styles.iconEnd} />
                </Pressable>
                {showDatePicker && (
                    <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={dobDate || new Date()}
                        onChange={handleDateChange}
                    />
                )}
            </ScrollView>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Lưu thông tin</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        padding: 24,
        paddingTop: 65,
        paddingBottom: 120,
    },
    backIcon: {
        position: "absolute",
        top: 30,
        left: 24,
        zIndex: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: '35%',
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 4,
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 48,
    },
    disabledInput: {
        color: "#999",
    },
    iconEnd: {
        marginLeft: 8,
    },
    button: {
        position: "absolute",
        bottom: 24,
        left: 24,
        right: 24,
        backgroundColor: "#72C15F",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
