import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {
    CreditCard,
    Bookmark,
    Timer,
    Pencil,
    Headset
} from "lucide-react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";

export default function ProfileScreen() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <TouchableOpacity style={styles.editIcon}>
                <Pencil size={24} color={Colors.text} />
            </TouchableOpacity>

            <Image
                source={{
                    uri: "https://randomuser.me/api/portraits/women/44.jpg",
                }}
                style={styles.avatar}
            />

            <Text style={styles.name}>Jennifer Lopez</Text>
            <Text style={styles.email}>taylorslauren@hotmail.com</Text>

            <View style={styles.cardList}>
                <OptionCard icon={<CreditCard color="#4E7D28" />} text="Lịch sử thanh toán" />
                <OptionCard icon={<Bookmark color="#4E7D28" />} text="Bài viết yêu thích" />
                <OptionCard icon={<Timer color="#4E7D28" />} text="Công thức yêu thích" />
                <OptionCard icon={<Headset color="#4E7D28" />} text="Trung tâm trợ giúp" />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.replace("/(authentication)/login")}>
                    <Text style={styles.footerLink}>Đăng xuất</Text>
                </TouchableOpacity>

                <Text style={styles.footerLink}>Đổi mật khẩu</Text>

                <Text style={styles.deleteLink}>Xoá tài khoản</Text>
            </View>

        </ScrollView>
    );
}

function OptionCard({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <TouchableOpacity style={styles.card}>
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
