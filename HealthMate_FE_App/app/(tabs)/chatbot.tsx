import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Bot, Camera, SendHorizonal } from "lucide-react-native";

export default function ChatBotScreen() {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Bot style={styles.headerIcon} size={24} color="#72C15F" />
                <Text style={styles.headerText}> AI</Text>
                <View style={{ width: 20 }} />
            </View>

            {/* Chat content */}
            <ScrollView contentContainerStyle={styles.chatContainer}>
                <View style={styles.dateContainer}>
                    <View style={styles.line} />
                    <Text style={styles.date}>28/05/2025</Text>
                    <View style={styles.line} />
                </View>

                <View style={styles.botMessage}>
                    <Text style={styles.botText}>Qui voluptate laboris ut do excepteur elit eu</Text>
                </View>
                <Text style={styles.bottimestamp}>6:01</Text>

                <View style={styles.userMessage}>
                    <Text style={styles.userText}>
                        Qui voluptate laboris ut do excepteur elit eu
                    </Text>
                </View>
                <Text style={styles.usertimestamp}>6:01</Text>

                <View style={styles.dateContainer}>
                    <View style={styles.line} />
                    <Text style={styles.date}>Hôm nay</Text>
                    <View style={styles.line} />
                </View>

                <View style={styles.userMessage}>
                    <Text style={styles.userText}>
                        Hôm nay tôi muốn ăn sáng món gì dễ làm, nhanh, giúp giảm cân.
                        Nhà tôi có các đồ sẵn như cơm nguội, trứng, xà lách, cà chua
                    </Text>
                </View>
                <Text style={styles.usertimestamp}>6:01</Text>

                <View style={styles.botMessage}>
                    <Text style={styles.botText}>Tôi đã hiểu!</Text>
                </View>

                <View style={styles.botMessage}>
                    <Text style={styles.botText}>
                        Cơm chiên trứng sẽ là món ăn phù hợp cho bạn, dưới đây là cách làm.
                    </Text>
                </View>

                <View style={styles.recipeCard}>
                    <Text style={styles.recipeTitle}>Cơm chiên trứng</Text>
                    <Text style={styles.recipeLink}>Xem chi tiết ›</Text>
                </View>

                <View style={styles.botMessage}>
                    <Text style={styles.botText}>Qui voluptate laboris ut do excepteur elit eu</Text>
                </View>
                <Text style={styles.bottimestamp}>6:03</Text>

                <View style={styles.userMessage}>
                    <Text style={styles.userText}>
                        Qui voluptate laboris ut do excepteur elit eu
                    </Text>
                </View>
                <Text style={styles.usertimestamp}>6:05</Text>
            </ScrollView>

            {/* Input */}
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.iconCamera}>
                    <Camera size={20} color="#4CAF50" />
                </TouchableOpacity>
                <TextInput
                    placeholder="Aa"
                    style={styles.input}
                    placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.iconSend}>
                    <SendHorizonal size={20} color="#4CAF50" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    },
    headerIcon: {
        marginBottom: 3,
    },
    chatContainer: {
        padding: 16,
    },
    botMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#EBFBE6",
        padding: 12,
        borderRadius: 12,
        marginBottom: 8,
        maxWidth: "80%",
    },
    botText: {
        fontSize: 14,
        color: "#000",
    },
    userMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#F0F0F0",
        padding: 12,
        borderRadius: 12,
        marginBottom: 8,
        maxWidth: "80%",
    },
    userText: {
        fontSize: 14,
        color: "#000",
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 10,
        justifyContent: "center",
    },
    date: {
        fontSize: 12,
        color: "#999",
        marginHorizontal: 8,
        marginVertical: 8,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#ddd",
    },
    bottimestamp: {
        alignSelf: "flex-start",
        fontSize: 12,
        color: "#999",
        marginVertical: 2,
        marginLeft: 8,
    },
    usertimestamp: {
        alignSelf: "flex-end",
        fontSize: 12,
        color: "#999",
        marginVertical: 4,
        marginRight: 8,
    },
    recipeCard: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 12,
        padding: 16,
        marginTop: 3,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2,
    },
    recipeTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
    },
    recipeLink: {
        fontSize: 13,
        color: "#888",
    },
    inputContainer: {
        flexDirection: "row",
        borderTopColor: "#eee",
        borderTopWidth: 1,
        padding: 12,
        alignItems: "center",
    },
    iconCamera: {
        marginRight: 15,
    },
    iconSend: {
        marginLeft: 5,
    },
    input: {
        flex: 1,
        backgroundColor: "#F0F0F0",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 14,
        marginRight: 8,
    },
    sendBtn: {
        fontSize: 20,
        color: "#4CAF50",
        paddingHorizontal: 8,
    },
});
