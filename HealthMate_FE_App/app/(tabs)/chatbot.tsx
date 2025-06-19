import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const chatbotHtml = require("../../constants/chatbot.html");
const chatbotProHtml = require("../../constants/chatbotPro.html");

export default function ChatBotScreen() {
    const [isPremium, setIsPremium] = useState<boolean | null>(null);

    useEffect(() => {
        const checkPremiumStatus = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem("email");
                if (!storedEmail) {
                    setIsPremium(false);
                    return;
                }

                const response = await fetch(`${API_URL}/User/all_user_by_email/${storedEmail}`);
                const userArray = await response.json();

                if (response.ok && userArray.length > 0) {
                    const user = userArray[0];
                    setIsPremium(user.premiumExpiry !== null);
                } else {
                    setIsPremium(false);
                }
            } catch (error) {
                console.error("Error checking premium status:", error);
                setIsPremium(false);
            }
        };

        checkPremiumStatus();
    }, []);

    if (isPremium === null) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#72C15F" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={["*"]}
                source={isPremium ? chatbotProHtml : chatbotHtml}
                style={{ flex: 1 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
                mixedContentMode="always"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});
