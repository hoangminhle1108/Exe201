import React from "react";
import { Tabs } from "expo-router";
import { LogIn, UserPlus } from "lucide-react-native";
import { View } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#72C15F",
                tabBarInactiveTintColor: "#999",
                tabBarStyle: {
                    backgroundColor: "white",
                    borderTopWidth: 1,
                    borderTopColor: "#ccc",
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 3,
                },
                tabBarLabelStyle: {
                    fontWeight: "bold",
                    fontSize: 13,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="login"
                options={{
                    title: "Đăng nhập",
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                paddingBottom: 8,
                                paddingTop: 3,
                            }}
                        >
                            <LogIn size={22} color={color} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="register"
                options={{
                    title: "Đăng ký",
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                paddingBottom: 8,
                                paddingTop: 3,
                            }}
                        >
                            <UserPlus size={22} color={color} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
