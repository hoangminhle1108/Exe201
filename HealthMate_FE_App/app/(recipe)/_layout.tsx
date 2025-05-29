import React from "react";
import { Stack } from "expo-router";

export default function StackLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="recipeList"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="recipeSearch"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="recipeDetail"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
