import React from "react";
import { Stack } from "expo-router";

export default function StackLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="delete"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="confirm"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
