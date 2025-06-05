import React from "react";
import { Tabs } from "expo-router";
import { Home, MessageCircle, User } from "lucide-react-native";
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
        name="home"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <View style={{ paddingBottom: 8, paddingTop: 3 }}>
              <Home size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: "Trò chuyện",
          tabBarIcon: ({ color }) => (
            <View style={{ paddingBottom: 8, paddingTop: 3 }}>
              <MessageCircle size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Thông tin",
          tabBarIcon: ({ color }) => (
            <View style={{ paddingBottom: 8, paddingTop: 3 }}>
              <User size={22} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
