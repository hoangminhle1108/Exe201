import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image as RNImage,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {
    CreditCard,
    Bookmark,
    Timer,
    Pencil,
    Headset,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { API_URL } from "@env";

export default function ProfileScreen() {
    const router = useRouter();
    const [fullName, setFullName] = useState("Người dùng");
    const [email, setEmail] = useState("example@gmail.com");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem("email");
                if (!storedEmail) return;

                setEmail(storedEmail);

                const response = await fetch(`${API_URL}/User/all_user_by_email/${storedEmail}`);
                const userArray = await response.json();

                if (response.ok && userArray.length > 0) {
                    const user = userArray[0];
                    setFullName(user.fullName || "Người dùng");
                    setAvatarUrl(user.avatarUrl);
                    setEmail(user.email || storedEmail);
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <TouchableOpacity style={styles.editIcon} onPress={() => router.replace("/(setting)/editProfile")}>
                <Pencil size={22} color={Colors.text} />
            </TouchableOpacity>

            <Image
                source={
                    avatarUrl
                        ? avatarUrl
                        : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                style={styles.avatar}
                contentFit="cover"
            />

            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.email}>{email}</Text>

            <View style={styles.cardList}>
                <OptionCard icon={<CreditCard color="#4E7D28" />} text="Lịch sử thanh toán" route="/(setting)/payHistory" />
                <OptionCard icon={<Bookmark color="#4E7D28" />} text="Bài viết yêu thích" route="/(favorite)/favBlog" />
                <OptionCard icon={<Timer color="#4E7D28" />} text="Công thức yêu thích" route="/(favorite)/favRecipe" />
                <OptionCard icon={<Headset color="#4E7D28" />} text="Trung tâm trợ giúp" route="/(setting)/helpList" />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={async () => {
                        const agree = await AsyncStorage.getItem("agree");
                        if (agree !== "true") {
                            await AsyncStorage.removeItem("email");
                            await AsyncStorage.removeItem("password");
                        }
                        router.replace("/(authentication)/login");
                    }}
                >
                    <Text style={styles.footerLink}>Đăng xuất</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace("/(authentication)/changePassword")}>
                    <Text style={styles.footerLink}>Đổi mật khẩu</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace("/(deactivate)/confirm")}>
                    <Text style={styles.deleteLink}>Xoá tài khoản</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


function OptionCard({
    icon,
    text,
    route,
}: {
    icon: React.ReactNode;
    text: string;
    route: string;
}) {
    const router = useRouter();

    return (
        <TouchableOpacity style={styles.card} onPress={() => router.replace(route)}>
            <View style={styles.iconBox}>{icon}</View>
            <Text style={styles.cardText}>{text}</Text>
            <Text style={styles.chevron}>{">"}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    editIcon: {
        position: "absolute",
        top: 25,
        right: 30,
        padding: 6,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },
    email: {
        fontSize: 14,
        color: "#777",
        marginBottom: 24,
    },
    cardList: {
        width: "100%",
        gap: 12,
    },
    card: {
        backgroundColor: "#F6F8F4",
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        height: 70,

    },
    iconBox: {
        width: 24,
        marginRight: 12,
    },
    cardText: {
        flex: 1,
        fontSize: 16,
        color: "#222",
    },
    chevron: {
        fontSize: 18,
        color: "#999",
    },
    footer: {
        marginTop: 40,
        alignItems: "center",
        gap: 8,
    },
    footerLink: {
        fontSize: 14,
        color: "#555",
    },
    deleteLink: {
        fontSize: 14,
        color: "red",
        marginTop: 15,
    },
});
