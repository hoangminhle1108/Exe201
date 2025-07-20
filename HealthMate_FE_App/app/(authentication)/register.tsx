import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { API_URL } from "@env";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarDays } from "lucide-react-native";
import { Eye, EyeOff } from "lucide-react-native";

export default function RegisterScreen() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [agree, setAgree] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isOver13 = (dob: Date) => {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
        return dob <= minDate;
    };


    const handleRegister = async () => {
        if (!fullName || !email || !password) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Thông báo", "Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }

        if (!isOver13(dateOfBirth)) {
            Alert.alert("Thông báo", "Bạn phải đủ 13 tuổi trở lên để sử dụng ứng dụng này.");
            return;
        }

        if (!agree) {
            Alert.alert("Thông báo", "Bạn phải đồng ý với điều khoản dịch vụ để sử dụng ứng dụng này.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/Auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                    dateOfBirth: dateOfBirth.toISOString().split("T")[0],
                    acceptTerms: agree,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.message?.includes("already exists")) {
                    Alert.alert("Thông báo", "Email đã đăng ký tài khoản, hãy đăng nhập bằng email này hoặc dùng email khác để đăng ký.");
                } else {
                    Alert.alert("Thông báo", data.message || "Có lỗi xảy ra.");
                }
                return;
            }

            Alert.alert("Thông báo", "Đăng ký tài khoản thành công!");
            router.push("/(authentication)/login");
        } catch (error) {
            Alert.alert("Lỗi", "Không thể kết nối đến máy chủ.");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("@/assets/logo.png")} style={styles.logo} resizeMode="contain" />

            <View style={styles.tabHeader}>
                <Text style={styles.tab}>Đăng nhập</Text>
                <Text style={[styles.tab, styles.activeTab]}>Đăng ký</Text>
            </View>

            <TextInput style={styles.input} placeholder="Họ và tên" value={fullName} onChangeText={setFullName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />

            <View style={{ position: "relative" }}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: 12, top: 14 }}
                >
                    {showPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
                </TouchableOpacity>
            </View>

            <View style={{ position: "relative" }}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.input, { justifyContent: "space-between", flexDirection: "row", alignItems: "center" }]}>
                    <Text style={{ color: "#000" }}>
                        {`${dateOfBirth.getDate().toString().padStart(2, "0")}/${(dateOfBirth.getMonth() + 1).toString().padStart(2, "0")}/${dateOfBirth.getFullYear()}`}
                    </Text>
                    <CalendarDays color="#666" size={20} />
                </TouchableOpacity>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    value={dateOfBirth}
                    mode="date"
                    display="spinner"
                    maximumDate={new Date()}
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                            setDateOfBirth(selectedDate);
                        }
                    }}
                />
            )}

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    onPress={() => setAgree(!agree)}
                    style={[
                        styles.checkbox,
                        { backgroundColor: agree ? "#72C15F" : "transparent", borderColor: agree ? "#72C15F" : "#ccc" },
                    ]}
                >
                    {agree && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>
                    <Text style={{ color: "black" }}>Tôi đồng ý với </Text>
                    <Text style={{ color: "#72C15F", fontWeight: "bold" }} onPress={() => router.push("/tos")}>
                        Điều khoản dịch vụ
                    </Text>
                </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>

            <Text style={styles.loginLink}>
                <Text style={{ color: "black" }}>Đã có tài khoản? </Text>
                <Text style={{ color: "#72C15F", fontWeight: "bold" }} onPress={() => router.push("/(authentication)/login")}>
                    Đăng nhập
                </Text>
            </Text>

            {/* <View style={styles.orContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>HOẶC</Text>
                <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.googleButton} onPress={() => { }}>
                <Image
                    source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png",
                    }}
                    style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>Đăng nhập bằng Google</Text>
            </TouchableOpacity> */}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 20,
        marginTop: -50,
    },
    tabHeader: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 24,
        borderBottomWidth: 2,
        borderColor: "#72C15F",
    },
    tab: {
        fontSize: 16,
        marginHorizontal: 20,
        paddingBottom: 8,
        color: "#999",
    },
    activeTab: {
        color: "#72C15F",
        fontWeight: "bold",
        borderColor: "#72C15F",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    checkboxLabel: {
        marginLeft: 8,
        color: "#666",
        flex: 1,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    checkmark: {
        color: "white",
        fontWeight: "bold",
        fontSize: 10,
    },
    button: {
        backgroundColor: "#72C15F",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 16,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginLink: {
        textAlign: "center",
        color: "#72C15F",
        marginBottom: 16,
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 16,
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#ccc",
        marginHorizontal: 10,
    },

    orText: {
        color: "#666",
        fontSize: 14,
    },

    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },

    googleButtonText: {
        fontSize: 16,
        color: "#000",
        fontWeight: "500",
    },
});
