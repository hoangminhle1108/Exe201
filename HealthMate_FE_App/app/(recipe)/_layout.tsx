import React from "react";
import { Stack } from "expo-router";

export default function StackLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="list"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="search"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="detail"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
