import React, { useState, useEffect } from "react";
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
    Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Pencil, ChevronLeft, Mail, User, Calendar } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@/constants/colors";
import { API_URL } from "@env";
import * as ImagePicker from "expo-image-picker";

export default function EditProfileScreen() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [dobDate, setDobDate] = useState<Date | undefined>();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const isOver13 = (dob: Date) => {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
        return dob <= minDate;
    };


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem("email");
                if (!storedEmail) return;

                const response = await fetch(`${API_URL}/User/all_user_by_email/${storedEmail}`);
                const userArray = await response.json();

                if (response.ok && userArray.length > 0) {
                    const user = userArray[0];
                    setEmail(user.email || storedEmail);
                    setName(user.fullName || "");
                    setAvatarUrl(user.avatarUrl || null);
                    if (user.dateOfBirth) {
                        const dobObj = new Date(user.dateOfBirth);
                        setDobDate(dobObj);
                        setDob(dobObj.toLocaleDateString("vi-VN"));
                    }
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDobDate(selectedDate);
            setDob(selectedDate.toLocaleDateString("vi-VN"));
        }
    };

    const handleSave = async () => {
        if (!name || !dobDate) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (!isOver13(dobDate)) {
            Alert.alert("Thông báo", "Bạn phải đủ 13 tuổi trở lên để sử dụng ứng dụng này.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/User/update_by_email/${email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: name,
                    dateOfBirth: dobDate.toISOString().split("T")[0],
                    avatarUrl: avatarUrl,
                    email: email,
                }),
            });

            if (response.ok) {
                Alert.alert("Thành công", "Thông tin đã được cập nhật.");
                router.replace("/(tabs)/profile");
            } else {
                Alert.alert("Lỗi", "Không thể cập nhật thông tin.");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật hồ sơ:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu thông tin.");
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Quyền bị từ chối", "Ứng dụng cần quyền truy cập thư viện ảnh.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: false,
        });

        if (!result.canceled) {
            const selectedImage = result.assets[0];
            setAvatarUrl(selectedImage.uri);
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
                            uri: avatarUrl || "https://cdn-icons-png.flaticon.com/512/847/847969.png",
                        }}
                        style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
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

            <TouchableOpacity style={styles.button} onPress={handleSave}>
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
