import React from "react";
import { Stack } from "expo-router";

export default function StackLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="editProfile"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="payHistory"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="helpList"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
