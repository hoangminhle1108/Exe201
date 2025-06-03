import React from "react";
import { Stack } from "expo-router";

export default function StackLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="overview"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="dataInput"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
