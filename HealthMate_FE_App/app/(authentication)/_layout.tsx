import React from "react";
import { Stack } from "expo-router";

export default function StackLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="login"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="tos"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="forget"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="code"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="newPassword"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="changePassword"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
