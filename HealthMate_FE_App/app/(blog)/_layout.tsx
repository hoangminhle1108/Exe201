import React from "react";
import { Stack } from "expo-router";

export default function StackLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="blogList"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="blogSearch"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="blogDetail"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
